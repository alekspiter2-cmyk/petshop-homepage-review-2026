import Link from "next/link";

export default function MobilePreview() {
  return (
    <main className="preview-page preview-page-mobile">
      <header className="mobile-review-head">
        <div>
          <img src="/prototype/assets/petshop-logo.svg" alt="Petshop.ru" />
          <span>iPhone 17 Pro · 402 × 874</span>
        </div>
        <nav className="preview-switcher preview-switcher-mobile" aria-label="Выбор версии">
          <Link href="/desktop">Десктоп</Link>
          <Link className="is-active" href="/mobile">Мобильная</Link>
        </nav>
      </header>
      <div className="phone-shell">
        <div className="phone-speaker" />
        <iframe
          className="prototype-frame mobile-frame"
          src="/prototype/index.html?v=21"
          title="Мобильный прототип Petshop.ru для iPhone 17 Pro"
        />
      </div>
    </main>
  );
}
