import Link from "next/link";

export default function DesktopPreview() {
  return (
    <main className="preview-page preview-page-desktop">
      <nav className="preview-switcher" aria-label="Выбор версии">
        <Link className="is-active" href="/desktop">Десктоп</Link>
        <Link href="/mobile">Мобильная</Link>
      </nav>
      <iframe
        className="prototype-frame desktop-frame"
        src="/prototype/index.html?v=4"
        title="Десктопный прототип Petshop.ru"
      />
    </main>
  );
}
