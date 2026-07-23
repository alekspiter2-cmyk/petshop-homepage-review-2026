import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Petshop prototype entry page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Petshop\.ru — прототип новой главной<\/title>/i);
  assert.match(html, /Выберите формат просмотра/);
  assert.match(html, /href="\/desktop"/);
  assert.match(html, /href="\/mobile"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps cart recommendations, pet sections and version metadata in the published prototype", async () => {
  const [cart, catalog, version, versions] = await Promise.all([
    readFile(new URL("../public/prototype/cart.html", import.meta.url), "utf8"),
    readFile(new URL("../public/prototype/catalog.js", import.meta.url), "utf8"),
    readFile(new URL("../public/prototype/version.json", import.meta.url), "utf8"),
    readFile(new URL("../VERSIONS.md", import.meta.url), "utf8"),
  ]);

  assert.match(cart, /Дополнить покупку/);
  assert.match(cart, /С этим покупают/);
  assert.match(cart, /data-context-tab="food"/);
  assert.match(cart, /data-context-tab="litter"/);
  assert.match(cart, /data-context-tab="toys"/);
  assert.match(catalog, /catalog\.html\?page=other-pets/);
  assert.match(catalog, /catalog\.html\?page=fish/);
  assert.match(catalog, /catalog\.html\?page=birds/);

  const release = JSON.parse(version);
  assert.equal(release.version, "2026.07.23.3");
  assert.match(versions, /2026\.07\.23\.3/);
});
