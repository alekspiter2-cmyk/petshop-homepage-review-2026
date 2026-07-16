import Link from "next/link";

export default function Home() {
  return (
    <main className="share-home">
      <section className="share-card">
        <img src="/prototype/assets/petshop-logo.svg" alt="Petshop.ru" />
        <p className="share-kicker">Прототип новой главной</p>
        <h1>Выберите формат просмотра</h1>
        <p className="share-copy">
          Облегчённая концепция в логике маркетплейса, но с фирменной
          стилистикой Petshop.
        </p>
        <div className="share-actions">
          <Link className="share-link share-link-primary" href="/desktop">
            Десктопная версия
          </Link>
          <Link className="share-link" href="/mobile">
            Мобильная версия
          </Link>
        </div>
        <span className="share-note">Mobile: iPhone 17 Pro · 402 × 874</span>
      </section>
    </main>
  );
}
