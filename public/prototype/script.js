const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const toast = $('[data-toast-box]');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function changeCart(delta) {
  $$('[data-cart-count]').forEach((counter) => {
    counter.textContent = Math.max(0, (Number(counter.textContent) || 0) + delta);
  });
}

const products = [
  { id: 'royal-canin-sterilised', image: 'gallery-royal-01.jpg', galleryKey: 'royal', badge: 'Выбор Petshop', badgeClass: 'orange', price: '5 268 ₽', oldPrice: '5 690 ₽', title: 'Royal Canin Sterilised 37 для стерилизованных кошек, 4 кг', rating: '5,0', reviews: '557 отзывов', delivery: 'Сегодня', description: 'Полнорационный сухой корм для взрослых стерилизованных кошек и кастрированных котов от 1 до 7 лет.' },
  { image: 'product-rabbit.jpg', badge: 'Хит', badgeClass: 'pink', price: '519 ₽', oldPrice: '590 ₽', title: 'Savita Sterilised корм с кроликом и овощами', rating: '4,8', reviews: '291 отзыв', delivery: 'Сегодня' },
  { image: 'product-litter.png', badge: 'Новинка', badgeClass: 'purple', price: '579 ₽', oldPrice: '644 ₽', title: 'Van Cat комкующийся наполнитель без пыли', rating: '4,9', reviews: '1 230 отзывов', delivery: 'Завтра' },
  { image: 'product-salmon.png', badge: 'Цена дня', badgeClass: 'green', price: '3 959 ₽', oldPrice: '4 399 ₽', title: 'Корм для стерилизованных кошек с лососем', rating: '5,0', reviews: '536 отзывов', delivery: 'Сегодня' },
  { image: 'product-turkey.png', badge: '−10%', badgeClass: 'orange', price: '2 924 ₽', oldPrice: '3 249 ₽', title: 'Беззерновой корм со свежей индейкой', rating: '4,9', reviews: '702 отзыва', delivery: 'Завтра' },
  { image: 'product-dog.png', badge: 'Только у нас', badgeClass: 'blue', price: '1 749 ₽', oldPrice: '1 990 ₽', title: 'Полнорационный корм для взрослых собак', rating: '4,8', reviews: '418 отзывов', delivery: 'Сегодня' },
  { image: 'product-rabbit.jpg', badge: '−18%', badgeClass: 'orange', price: '459 ₽', oldPrice: '559 ₽', title: 'Влажный корм для кошек с нежным кроликом', rating: '4,9', reviews: '615 отзывов', delivery: 'Сегодня' },
  { image: 'product-litter.png', badge: 'Выбор хозяев', badgeClass: 'pink', price: '899 ₽', oldPrice: '1 050 ₽', title: 'Наполнитель комкующийся с ароматом свежести', rating: '4,8', reviews: '934 отзыва', delivery: 'Завтра' },
  { image: 'product-dog.png', badge: '−15%', badgeClass: 'green', price: '1 469 ₽', oldPrice: '1 729 ₽', title: 'Сухой корм для собак средних пород', rating: '4,7', reviews: '382 отзыва', delivery: 'Сегодня' },
  { image: 'product-salmon.png', badge: 'Хит', badgeClass: 'pink', price: '3 499 ₽', oldPrice: '3 990 ₽', title: 'Рацион для кошек с лососем и полезными травами', rating: '5,0', reviews: '1 102 отзыва', delivery: 'Сегодня' },
  { image: 'product-turkey.png', badge: 'Petshop рекомендует', badgeClass: 'blue', price: '2 699 ₽', oldPrice: '2 999 ₽', title: 'Корм со свежей индейкой для чувствительного пищеварения', rating: '4,9', reviews: '528 отзывов', delivery: 'Завтра' },
  { image: 'product-renal.png', badge: 'Ветаптека', badgeClass: 'purple', price: '1 249 ₽', oldPrice: '1 399 ₽', title: 'Диетический рацион для поддержания здоровья', rating: '4,8', reviews: '246 отзывов', delivery: 'Сегодня' },
  { image: 'product-dog.png', badge: '−20%', badgeClass: 'orange', price: '1 399 ₽', oldPrice: '1 749 ₽', title: 'Сбалансированный корм для активных собак', rating: '4,9', reviews: '744 отзыва', delivery: 'Сегодня' },
  { image: 'product-rabbit.jpg', badge: 'Новинка', badgeClass: 'purple', price: '639 ₽', oldPrice: '710 ₽', title: 'Мясное меню для стерилизованных кошек', rating: '4,7', reviews: '189 отзывов', delivery: 'Завтра' },
  { image: 'product-litter.png', badge: '−11%', badgeClass: 'orange', price: '729 ₽', oldPrice: '819 ₽', title: 'Натуральный наполнитель с контролем запаха', rating: '4,9', reviews: '815 отзывов', delivery: 'Сегодня' },
  { image: 'product-salmon.png', badge: 'Цена дня', badgeClass: 'green', price: '3 749 ₽', oldPrice: '4 249 ₽', title: 'Корм с лососем для красивой шерсти', rating: '5,0', reviews: '623 отзыва', delivery: 'Сегодня' },
  { image: 'product-turkey.png', badge: 'Хит', badgeClass: 'pink', price: '2 849 ₽', oldPrice: '3 199 ₽', title: 'Беззерновой рацион с индейкой и овощами', rating: '4,9', reviews: '911 отзывов', delivery: 'Завтра' },
  { image: 'product-renal.png', badge: 'Только у нас', badgeClass: 'blue', price: '1 159 ₽', oldPrice: '1 299 ₽', title: 'Специализированный корм Savita Care', rating: '4,8', reviews: '307 отзывов', delivery: 'Сегодня' }
];

products.forEach((product, index) => { product.id ||= `product-${index + 1}`; });

const promos = [
  { tone: 'purple', icon: '↻', eyebrow: 'Автозаказ Petshop', title: 'До −30% на любимые товары', text: 'Настройте один раз — доставим по расписанию', image: 'product-turkey.png', action: 'Настроить', toast: 'Настройка автозаказа открыта' },
  { tone: 'orange', icon: '%', eyebrow: 'Только до воскресенья', title: '−20% на влажный корм', text: 'Выгодные наборы для кошек и собак', image: 'product-rabbit.jpg', action: 'Выбрать', toast: 'Открыли товары со скидкой' },
  { tone: 'blue', icon: '⚡', eyebrow: 'Petshop экспресс', title: 'Доставка сегодня', text: 'Выберите удобный интервал при оформлении', image: 'product-dog.png', action: 'Подробнее', toast: 'Условия быстрой доставки открыты' },
  { tone: 'green', icon: '✚', eyebrow: 'Забота каждый день', title: 'Ветаптека до −15%', text: 'Здоровье и уход с быстрой доставкой', image: 'product-renal.png', action: 'Смотреть', toast: 'Открыли подборку ветаптеки' }
];

function productCard(product) {
  const galleryImages = window.PetshopGallery?.imagesFor(product) || [`assets/${product.image}`];
  const previewImages = galleryImages.slice(0, 3);
  const hasPreview = previewImages.length > 1;
  return `
    <article class="product-card" tabindex="0" aria-label="Открыть товар ${product.title}" data-product-card data-product-id="${product.id}">
      <div class="product-card__visual" data-card-preview>
        <span class="badge badge--${product.badgeClass}">${product.badge}</span>
        <button class="favorite" type="button" aria-label="Добавить в избранное" aria-pressed="false" data-favorite><svg><use href="#i-heart"/></svg></button>
        <div class="preview-images">
          ${previewImages.map((source, index) => `<img class="preview-image${index === 0 ? ' is-active' : ''}" src="${source}" alt="${index === 0 ? product.title : ''}" data-preview-image="${index}"${index > 0 ? ' loading="lazy"' : ''}>`).join('')}
        </div>
        ${hasPreview ? `<div class="preview-zones" aria-hidden="true">${previewImages.map((_, index) => `<span class="preview-zone" data-preview-zone="${index}"></span>`).join('')}</div>` : ''}
        ${hasPreview ? `<div class="preview-dots" aria-hidden="true">${previewImages.map((_, index) => `<i class="${index === 0 ? 'is-active' : ''}" data-preview-dot="${index}"></i>`).join('')}</div>` : ''}
        ${galleryImages.length > 1 ? `<button class="gallery-count" type="button" aria-label="Открыть все фотографии товара: ${galleryImages.length}" data-gallery-open>${galleryImages.length} фото</button>` : ''}
      </div>
      <div class="price-row"><strong>${product.price}</strong><del>${product.oldPrice}</del></div>
      <h3>${product.title}</h3>
      <div class="rating" aria-label="Рейтинг ${product.rating}, ${product.reviews}">
        <span class="rating__star">★</span><b>${product.rating}</b><span>· ${product.reviews}</span>
      </div>
      <div class="delivery"><i></i>${product.delivery}</div>
      <button class="add-cart" type="button" aria-label="Добавить товар в корзину" aria-pressed="false" data-add-cart><svg><use href="#i-cart"/></svg><span>В корзину</span></button>
    </article>
  `;
}

function productRow(offset) {
  return Array.from({ length: 6 }, (_, index) => products[(offset + index) % products.length])
    .map(productCard)
    .join('');
}

function promoStrip(promo, isFirst) {
  return `
    <aside class="promo-strip promo-strip--${promo.tone}"${isFirst ? ' id="auto"' : ''}>
      <span class="promo-strip__icon">${promo.icon}</span>
      <div class="promo-strip__copy">
        <span class="promo-strip__eyebrow">${promo.eyebrow}</span>
        <h3>${promo.title}</h3>
        <p>${promo.text}</p>
      </div>
      <button type="button" data-toast="${promo.toast}">${promo.action}</button>
      <img src="assets/${promo.image}" alt="">
    </aside>
  `;
}

function feedBatch(index) {
  const start = index * 12;
  const promo = promos[index % promos.length];
  return `
    <section class="feed-batch" aria-label="Подборка товаров">
      <div class="product-grid">${productRow(start)}</div>
      ${promoStrip(promo, index === 0)}
      <div class="product-grid">${productRow(start + 6)}</div>
    </section>
  `;
}

const feed = $('[data-product-feed]');
const feedSentinel = $('[data-feed-sentinel]');
let batchIndex = 0;
let feedLoading = false;

function appendFeedBatch() {
  if (!feed) return;
  feed.insertAdjacentHTML('beforeend', feedBatch(batchIndex));
  batchIndex += 1;
}

appendFeedBatch();
appendFeedBatch();

if (feed && feedSentinel && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting) || feedLoading) return;
    feedLoading = true;
    feedSentinel.lastChild.textContent = ' Загружаем продолжение';
    setTimeout(() => {
      appendFeedBatch();
      feedLoading = false;
      feedSentinel.lastChild.textContent = ' Подбираем ещё товары';
    }, 260);
  }, { rootMargin: '700px 0px' });
  observer.observe(feedSentinel);
}

$$('[data-search-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = $('input', form)?.value.trim();
    showToast(query ? `Ищем «${query}»` : 'Напишите, что нужно найти');
  });
});

document.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add-cart]');
  if (addButton) {
    const added = addButton.classList.toggle('is-added');
    addButton.setAttribute('aria-pressed', String(added));
    changeCart(added ? 1 : -1);
    showToast(added ? 'Товар добавлен в корзину' : 'Товар убран из корзины');
    return;
  }

  const favoriteButton = event.target.closest('[data-favorite]');
  if (favoriteButton) {
    const active = favoriteButton.classList.toggle('is-active');
    favoriteButton.setAttribute('aria-pressed', String(active));
    showToast(active ? 'Добавили в избранное' : 'Убрали из избранного');
    return;
  }

  const repeatButton = event.target.closest('[data-repeat-order]');
  if (repeatButton) {
    changeCart(3);
    showToast('Прошлый заказ добавлен в корзину');
    return;
  }

  const toastElement = event.target.closest('[data-toast]');
  if (toastElement) {
    showToast(toastElement.dataset.toast);
    return;
  }

  const productCardElement = event.target.closest('[data-product-card]');
  if (productCardElement) openProduct(productCardElement);
});

function openProduct(card) {
  const product = products.find((item) => item.id === card?.dataset.productId);
  if (!product) return;
  window.PetshopGallery?.open(product, {
    onAdd: () => {
      changeCart(1);
      showToast('Товар добавлен в корзину');
    }
  });
}

function setCardPreview(visual, index) {
  if (!visual) return;
  $$('[data-preview-image]', visual).forEach((image) => {
    image.classList.toggle('is-active', Number(image.dataset.previewImage) === index);
  });
  $$('[data-preview-dot]', visual).forEach((dot) => {
    dot.classList.toggle('is-active', Number(dot.dataset.previewDot) === index);
  });
}

document.addEventListener('pointerover', (event) => {
  const zone = event.target.closest('[data-preview-zone]');
  if (zone) setCardPreview(zone.closest('[data-card-preview]'), Number(zone.dataset.previewZone));
});

document.addEventListener('pointerout', (event) => {
  const visual = event.target.closest('[data-card-preview]');
  if (event.pointerType === 'mouse' && visual && !visual.contains(event.relatedTarget)) setCardPreview(visual, 0);
});

$('[data-scroll-catalog]')?.addEventListener('click', () => {
  $('#catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

$$('.discovery-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.discovery-tabs button').forEach((item) => item.classList.toggle('is-active', item === button));
  });
});

const drawer = $('[data-mobile-drawer]');
const menuButton = $('[data-menu-open]');

function setDrawer(open) {
  drawer?.classList.toggle('is-open', open);
  drawer?.setAttribute('aria-hidden', String(!open));
  menuButton?.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('drawer-open', open);
}

menuButton?.addEventListener('click', () => setDrawer(true));
$('[data-menu-close]')?.addEventListener('click', () => setDrawer(false));
drawer?.addEventListener('click', (event) => {
  if (event.target === drawer) setDrawer(false);
});
document.addEventListener('keydown', (event) => {
  const card = event.target.closest?.('[data-product-card]');
  if (card && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    openProduct(card);
    return;
  }
  if (event.key === 'Escape') setDrawer(false);
});
$$('.mobile-drawer a').forEach((link) => link.addEventListener('click', () => setDrawer(false)));
