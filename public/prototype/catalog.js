const catalogData = {
  cats: {
    eyebrow: 'Каталог для питомца',
    title: 'Всё для кошек',
    description: 'Еда, забота, здоровье и уют — всё нужное собрано в понятных разделах.',
    emoji: '🐈',
    tone: 'cats',
    popular: ['Сухой корм', 'Влажный корм', 'Наполнители', 'Когтеточки', 'Ветаптека'],
    groups: [
      { title: 'Лови скидку', icon: '🔥', tone: 'orange', items: ['Миска с выгодой', 'Дефект упаковки'] },
      { title: 'Еда', icon: '🥣', tone: 'peach', items: ['Холистики', 'Сухие корма', 'Консервы и паучи', 'Ветеринарные корма', 'Здоровое питание', 'Натуральная еда'] },
      { title: 'Лакомства и витамины', icon: '🐟', tone: 'yellow', items: ['Колбаски', 'Вяленое и сушёное мясо', 'Витамины', 'Подушечки и сердечки', 'Кремы и паштеты', 'Трава и мята'] },
      { title: 'Гигиена и уход', icon: '✨', tone: 'blue', items: ['Наполнители', 'Пелёнки и подгузники', 'Шампуни и мыло', 'Для глаз и ушей', 'От пятен и запахов', 'Чистка зубов'] },
      { title: 'Аптека', icon: '✚', tone: 'green', id: 'vet', items: ['Лекарственные препараты', 'Витамины и добавки', 'От глистов', 'От блох и клещей', 'Контрацептивы', 'Ветпаспорта'] },
      { title: 'Предметы обихода', icon: '🏠', tone: 'lilac', items: ['Когтеточки', 'Лотки', 'Миски', 'Переноски', 'Лежаки и домики', 'Контейнеры для еды'] },
      { title: 'Игрушки', icon: '🧶', tone: 'rose', items: ['Игрушки до 199 ₽', 'Дразнилки', 'Мячики', 'Для лакомств', 'Развивающие игрушки', 'Туннели'] },
      { title: 'Аксессуары', icon: '🎀', tone: 'purple', items: ['Ошейники и шлейки', 'Антицарапки', 'Одежда', 'Сумочки для лакомств', 'Заколки и бантики', 'Рулетки'] },
      { title: 'Груминг и косметика', icon: '🪮', tone: 'mint', items: ['Колтунорезы', 'Ножницы', 'Спреи', 'Фурминаторы', 'Щётки и расчёски', 'Когтерезы'] },
      { title: 'Умные товары', icon: '⚡', tone: 'sky', items: ['Автокормушки', 'Смарт-игрушки', 'GPS-ошейники', 'Автопоилки', 'Автоматические туалеты', 'Комплектующие'] },
      { title: 'Подарочные сертификаты', icon: '🎁', tone: 'coral', items: ['Электронные сертификаты', 'Подарок владельцу питомца'] }
    ]
  },
  dogs: {
    eyebrow: 'Каталог для питомца',
    title: 'Всё для собак',
    description: 'Рационы, прогулки, тренировки и ежедневная забота — быстро найти, легко заказать.',
    emoji: '🐕',
    tone: 'dogs',
    popular: ['Сухой корм', 'Лакомства', 'Игрушки', 'Амуниция', 'От блох и клещей'],
    groups: [
      { title: 'Лови скидку', icon: '🔥', tone: 'orange', items: ['Миска с выгодой', 'Дефект упаковки'] },
      { title: 'Еда', icon: '🥣', tone: 'blue', items: ['Холистики', 'Сухие корма', 'Консервы и паучи', 'Ветеринарные корма', 'Здоровое питание', 'Натуральная еда'] },
      { title: 'Лакомства и витамины', icon: '🦴', tone: 'yellow', items: ['Сушёное мясо', 'Вяленое мясо', 'Колбаски', 'Долго жевать', 'Для чистки зубов', 'Для тренировок'] },
      { title: 'Аптека', icon: '✚', tone: 'green', id: 'vet', items: ['Лекарственные препараты', 'Витамины и добавки', 'От глистов', 'От блох и клещей', 'Контрацептивы', 'Ветпаспорта'] },
      { title: 'Гигиена и уход', icon: '✨', tone: 'sky', items: ['Пелёнки и подгузники', 'От пятен и запахов', 'Для глаз и ушей', 'Гигиенические пакеты', 'Уход за лапами', 'Чистка зубов'] },
      { title: 'Игрушки', icon: '🎾', tone: 'rose', items: ['Игрушки до 199 ₽', 'Звери, птицы и еда', 'Апортировочные игрушки', 'Верёвки и канаты', 'Для лакомств', 'Кольца и косточки'] },
      { title: 'Предметы обихода', icon: '🏠', tone: 'lilac', items: ['Миски', 'Лежаки', 'Переноски', 'Контейнеры для еды', 'Загоны и клетки', 'Коврики под миски'] },
      { title: 'Аксессуары', icon: '🦮', tone: 'purple', items: ['Ошейники и шлейки', 'Для прогулок', 'Одежда', 'Адресные таблички', 'Заколки и бантики', 'Рулетки'] },
      { title: 'Груминг и косметика', icon: '🪮', tone: 'mint', items: ['Колтунорезы', 'Ножницы', 'Спреи', 'Фурминаторы', 'Щётки и расчёски', 'Когтерезы'] },
      { title: 'Умные товары', icon: '⚡', tone: 'coral', items: ['Автокормушки', 'GPS-ошейники', 'Автопоилки', 'Светодиодные ошейники', 'Комплектующие', 'Другие устройства'] },
      { title: 'Для дрессировки', icon: '🏅', tone: 'peach', items: ['Корректировка поведения', 'Кликеры', 'Ринговки', 'Сумки для лакомств'] },
      { title: 'Подарочные сертификаты', icon: '🎁', tone: 'orange', items: ['Электронные сертификаты', 'Подарок владельцу питомца'] }
    ]
  },
  'other-pets': {
    eyebrow: 'Каталог для питомца',
    title: 'Всё для грызунов и хорьков',
    description: 'Рационы, клетки, наполнители, игрушки и ежедневный уход.',
    emoji: '🐹',
    tone: 'cats',
    popular: ['Корма', 'Клетки', 'Наполнители', 'Сено', 'Игрушки'],
    groups: [
      { title: 'Корма и лакомства', icon: '🥕', tone: 'peach', items: ['Для хомяков', 'Для морских свинок', 'Для кроликов', 'Для крыс и мышей', 'Для хорьков', 'Лакомства'] },
      { title: 'Клетки и переноски', icon: '🏠', tone: 'lilac', items: ['Клетки', 'Переноски', 'Вольеры', 'Домики', 'Лесенки', 'Полки'] },
      { title: 'Гигиена и уход', icon: '✨', tone: 'blue', items: ['Наполнители', 'Песок для купания', 'Уход за шерстью', 'Средства от запаха', 'Когтерезы', 'Туалеты'] },
      { title: 'Игрушки и аксессуары', icon: '🎡', tone: 'rose', items: ['Колёса', 'Тоннели', 'Гамаки', 'Миски', 'Поилки', 'Шлейки'] }
    ]
  },
  fish: {
    eyebrow: 'Каталог для питомца',
    title: 'Всё для рыб',
    description: 'Корма, аквариумы, оборудование и уход за водой.',
    emoji: '🐠',
    tone: 'dogs',
    popular: ['Корма', 'Аквариумы', 'Фильтры', 'Уход за водой', 'Декор'],
    groups: [
      { title: 'Корма', icon: '🥣', tone: 'yellow', items: ['Хлопья', 'Гранулы', 'Таблетки', 'Для мальков', 'Для донных рыб', 'Лакомства'] },
      { title: 'Аквариумы', icon: '🐟', tone: 'sky', items: ['Аквариумы', 'Тумбы', 'Крышки', 'Отсадники', 'Террариумы', 'Комплектующие'] },
      { title: 'Оборудование', icon: '⚙', tone: 'blue', items: ['Фильтры', 'Компрессоры', 'Нагреватели', 'Освещение', 'Термометры', 'Кормушки'] },
      { title: 'Уход и оформление', icon: '🌿', tone: 'green', items: ['Уход за водой', 'Грунты', 'Растения', 'Декорации', 'Сачки', 'Сифоны'] }
    ]
  },
  birds: {
    eyebrow: 'Каталог для питомца',
    title: 'Всё для птиц',
    description: 'Корма, клетки, игрушки, витамины и забота каждый день.',
    emoji: '🦜',
    tone: 'cats',
    popular: ['Корма', 'Клетки', 'Лакомства', 'Игрушки', 'Витамины'],
    groups: [
      { title: 'Корма и лакомства', icon: '🌾', tone: 'yellow', items: ['Для волнистых попугаев', 'Для средних попугаев', 'Для крупных попугаев', 'Для канареек', 'Лакомства', 'Минеральные смеси'] },
      { title: 'Клетки и переноски', icon: '🏠', tone: 'green', items: ['Клетки', 'Переноски', 'Вольеры', 'Жёрдочки', 'Поддоны', 'Комплектующие'] },
      { title: 'Игрушки и аксессуары', icon: '🪶', tone: 'rose', items: ['Качели', 'Лесенки', 'Зеркала', 'Колокольчики', 'Купалки', 'Кормушки'] },
      { title: 'Здоровье и уход', icon: '✚', tone: 'mint', items: ['Витамины', 'Уход за клювом', 'Уход за оперением', 'Песок', 'Средства от паразитов', 'Гигиена клетки'] }
    ]
  }
};

const catalogEntries = [
  { title: 'Кошки', description: 'Еда, наполнители, уход и игрушки', emoji: '🐈', tone: 'peach', href: 'catalog.html?page=cats', label: 'Открыть раздел' },
  { title: 'Собаки', description: 'Корм, лакомства, прогулки и груминг', emoji: '🐕', tone: 'blue', href: 'catalog.html?page=dogs', label: 'Открыть раздел' },
  { title: 'Котята и щенки', description: 'Всё для здорового старта и роста', emoji: '🐾', tone: 'yellow', id: 'young' },
  { title: 'Грызуны и хорьки', description: 'Корма, клетки, наполнители и уход', emoji: '🐹', tone: 'lilac', id: 'other-pets', href: 'catalog.html?page=other-pets' },
  { title: 'Рыбки', description: 'Аквариумы, корма и оборудование', emoji: '🐠', tone: 'sky', id: 'fish', href: 'catalog.html?page=fish' },
  { title: 'Птицы', description: 'Корма, клетки, игрушки и витамины', emoji: '🦜', tone: 'green', id: 'birds', href: 'catalog.html?page=birds' },
  { title: 'Ветаптека', description: 'Здоровье, профилактика и восстановление', emoji: '✚', tone: 'mint', id: 'vet' },
  { title: 'Акции', description: 'Лучшие цены и выгодные наборы', emoji: '%', tone: 'orange' },
  { title: 'Умные товары', description: 'Автокормушки, поилки и GPS-трекеры', emoji: '⚡', tone: 'purple' },
  { title: 'Мерч Petshop', description: 'Полезные вещи для любителей питомцев', emoji: '🧡', tone: 'coral' }
];

const root = document.querySelector('[data-catalog-root]');
const requestedPage = new URLSearchParams(window.location.search).get('page');
const currentPage = catalogData[requestedPage] ? requestedPage : 'catalog';

function pageTabs(active) {
  return `
    <nav class="catalog-tabs" aria-label="Выбор каталога">
      <a class="${active === 'catalog' ? 'is-active' : ''}" href="catalog.html">Весь каталог</a>
      <a class="${active === 'cats' ? 'is-active' : ''}" href="catalog.html?page=cats">Кошки</a>
      <a class="${active === 'dogs' ? 'is-active' : ''}" href="catalog.html?page=dogs">Собаки</a>
      <a class="${active === 'other-pets' ? 'is-active' : ''}" href="catalog.html?page=other-pets">Грызуны</a>
      <a class="${active === 'fish' ? 'is-active' : ''}" href="catalog.html?page=fish">Рыбки</a>
      <a class="${active === 'birds' ? 'is-active' : ''}" href="catalog.html?page=birds">Птицы</a>
    </nav>
  `;
}

function breadcrumb(title) {
  return `<nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span>›</span>${title === 'Каталог' ? '<b>Каталог</b>' : `<a href="catalog.html">Каталог</a><span>›</span><b>${title}</b>`}</nav>`;
}

function renderCatalog() {
  document.title = 'Каталог — Petshop';
  return `
    <section class="shell catalog-intro catalog-intro--all">
      ${breadcrumb('Каталог')}
      <div class="catalog-intro__copy">
        <span class="catalog-intro__eyebrow">Всё для ваших питомцев</span>
        <h1>Каталог</h1>
        <p>Выберите питомца или нужный раздел. Всё важное — на одном экране.</p>
      </div>
      <div class="catalog-intro__pets" aria-hidden="true"><span>🐈</span><span>🐕</span><i>🐾</i></div>
    </section>
    <section class="shell catalog-content">
      ${pageTabs('catalog')}
      <div class="catalog-heading"><div><h2>Для кого выбираем?</h2><p>Основные разделы каталога Petshop</p></div><span>${catalogEntries.length} разделов</span></div>
      <div class="catalog-entry-grid">
        ${catalogEntries.map((entry) => `
          <a class="catalog-entry catalog-entry--${entry.tone}" ${entry.id ? `id="${entry.id}"` : ''} href="${entry.href || '#'}" ${entry.href ? '' : `data-toast="Открываем раздел «${entry.title}»"`}>
            <span class="catalog-entry__icon">${entry.emoji}</span>
            <span class="catalog-entry__copy"><b>${entry.title}</b><small>${entry.description}</small></span>
            <span class="catalog-entry__arrow"><svg><use href="#i-chevron"/></svg></span>
          </a>
        `).join('')}
      </div>
      <aside class="catalog-promo">
        <span class="catalog-promo__icon">↻</span>
        <div><small>Автозаказ Petshop</small><h2>Любимые товары сами приезжают вовремя</h2><p>Экономьте до 30% и меняйте расписание в любой момент.</p></div>
        <a href="index.html#auto">Настроить</a>
      </aside>
    </section>
  `;
}

function groupCard(group) {
  return `
    <article class="category-group" ${group.id ? `id="${group.id}"` : ''}>
      <div class="category-group__head">
        <span class="category-group__icon category-group__icon--${group.tone}">${group.icon}</span>
        <h2>${group.title}</h2>
      </div>
      <nav aria-label="${group.title}">
        ${group.items.map((item) => `<a href="#" data-toast="Открываем «${item}»"><span>${item}</span><svg><use href="#i-chevron"/></svg></a>`).join('')}
      </nav>
      <a class="category-group__all" href="#" data-toast="Открываем все товары раздела «${group.title}»">Смотреть всё <svg><use href="#i-chevron"/></svg></a>
    </article>
  `;
}

function renderPetPage(pageKey) {
  const page = catalogData[pageKey];
  const petNames = {
    cats: 'кошек',
    dogs: 'собак',
    'other-pets': 'грызунов и хорьков',
    fish: 'рыб',
    birds: 'птиц'
  };
  document.title = `${page.title} — Petshop`;
  return `
    <section class="shell catalog-intro catalog-intro--${page.tone}">
      ${breadcrumb(page.title)}
      <div class="catalog-intro__copy">
        <span class="catalog-intro__eyebrow">${page.eyebrow}</span>
        <h1>${page.title}</h1>
        <p>${page.description}</p>
      </div>
      <div class="catalog-intro__animal" aria-hidden="true"><span>${page.emoji}</span><i>🐾</i></div>
    </section>
    <section class="shell catalog-content">
      ${pageTabs(pageKey)}
      <div class="popular-row" aria-label="Популярные категории">
        <b>Популярное</b>
        <div>${page.popular.map((item) => `<a href="#" data-toast="Открываем «${item}»">${item}</a>`).join('')}</div>
      </div>
      <div class="catalog-heading"><div><h2>Выберите раздел</h2><p>Все категории для ${petNames[pageKey]}</p></div><span>${page.groups.length} разделов</span></div>
      <div class="category-group-grid">${page.groups.map(groupCard).join('')}</div>
    </section>
  `;
}

if (root) {
  root.innerHTML = currentPage === 'catalog' ? renderCatalog() : renderPetPage(currentPage);
  document.querySelectorAll(`[data-page-link="${currentPage}"]`).forEach((link) => link.classList.add('is-active'));

  if (window.location.hash) {
    requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView({ block: 'center' }));
  }
}
