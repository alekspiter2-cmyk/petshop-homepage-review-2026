const cartState = {
  promoApplied: false,
  autoOrder: false,
  recommendations: new Map(),
  activeContext: 'food'
};

const contextRecommendations = {
  food: {
    reason: 'Потому что в корзине сухой корм',
    products: [
      { id: 'ceramic-bowl', emoji: '🥣', tone: 'peach', title: 'Керамическая миска с нескользящим дном', price: 459, oldPrice: 529, rating: '4,9', reviews: '642 отзыва', delivery: 'Сегодня' },
      { id: 'feeding-mat', emoji: '🐾', tone: 'sand', title: 'Коврик под миски с защитой от воды', price: 329, oldPrice: 399, rating: '4,8', reviews: '381 отзыв', delivery: 'Сегодня' },
      { id: 'wet-food', emoji: '🥫', tone: 'blue', title: 'Влажный корм с лососем, пауч 85 г', price: 89, oldPrice: 105, rating: '5,0', reviews: '1 102 отзыва', delivery: 'Сегодня' },
      { id: 'food-toy', emoji: '🧶', tone: 'lilac', title: 'Мячик с кошачьей мятой для активной игры', price: 299, oldPrice: 349, rating: '4,9', reviews: '740 отзывов', delivery: 'Сегодня' }
    ]
  },
  litter: {
    reason: 'Потому что в корзине наполнитель',
    products: [
      { id: 'cat-tray', emoji: '🧺', tone: 'green', title: 'Высокий лоток с защитным бортиком', price: 899, oldPrice: 1099, rating: '4,9', reviews: '865 отзывов', delivery: 'Сегодня' },
      { id: 'litter-scoop', emoji: '🥄', tone: 'sky', title: 'Совок для наполнителя с крупной сеткой', price: 189, oldPrice: 229, rating: '4,8', reviews: '512 отзывов', delivery: 'Сегодня' },
      { id: 'litter-mat', emoji: '🐾', tone: 'sand', title: 'Двухслойный коврик под кошачий лоток', price: 459, oldPrice: 574, rating: '4,9', reviews: '692 отзыва', delivery: 'Сегодня' },
      { id: 'odor-spray', emoji: '✨', tone: 'coral', title: 'Спрей для удаления пятен и запахов', price: 349, oldPrice: 410, rating: '4,8', reviews: '306 отзывов', delivery: 'Завтра' }
    ]
  },
  toys: {
    reason: 'Чтобы питомцу было интересно и не скучно',
    products: [
      { id: 'toy-ball', emoji: '🎾', tone: 'green', title: 'Мячик с погремушкой для кошек', price: 199, oldPrice: 249, rating: '4,9', reviews: '436 отзывов', delivery: 'Сегодня' },
      { id: 'toy-teaser', emoji: '🪶', tone: 'rose', title: 'Дразнилка с перьями и колокольчиком', price: 279, oldPrice: 329, rating: '4,8', reviews: '518 отзывов', delivery: 'Сегодня' },
      { id: 'toy-tunnel', emoji: '🌀', tone: 'blue', title: 'Складной игровой тоннель для кошек', price: 899, oldPrice: 1090, rating: '4,9', reviews: '284 отзыва', delivery: 'Завтра' },
      { id: 'toy-puzzle', emoji: '🧩', tone: 'lilac', title: 'Развивающая игрушка-головоломка', price: 749, oldPrice: 890, rating: '4,8', reviews: '197 отзывов', delivery: 'Завтра' }
    ]
  }
};

const cartRoot = document.querySelector('[data-cart-items]');
const selectAll = document.querySelector('[data-select-all]');
const deliveryBlock = document.querySelector('[data-free-delivery]');
const deliveryHead = document.querySelector('.cart-delivery-head');
const autoOrderCard = document.querySelector('.auto-order-card');
const emptyState = document.querySelector('[data-cart-empty]');
const contextSection = document.querySelector('[data-context-recommendations]');
const contextProducts = document.querySelector('[data-context-products]');
const quickView = document.querySelector('[data-product-quickview]');
let quickViewProduct = null;

function formatRub(value) {
  return `${new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.round(value)))} ₽`;
}

function pluralProducts(value) {
  const lastTwo = value % 100;
  const last = value % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${value} товаров`;
  if (last === 1) return `${value} товар`;
  if (last >= 2 && last <= 4) return `${value} товара`;
  return `${value} товаров`;
}

function contextProductCard(product) {
  const recommendationKey = `context:${product.id}`;
  const isAdded = cartState.recommendations.has(recommendationKey);
  return `
    <article class="context-product" data-context-product="${product.id}">
      <div class="context-product__visual context-product__visual--${product.tone}" aria-hidden="true">${product.emoji}</div>
      <div class="context-product__copy">
        <span>${product.delivery}</span>
        <h3>${product.title}</h3>
        <div class="context-product__rating"><b>★ ${product.rating}</b> · ${product.reviews}</div>
        <div class="context-product__price"><strong>${formatRub(product.price)}</strong><del>${formatRub(product.oldPrice)}</del></div>
      </div>
      <button class="${isAdded ? 'is-added' : ''}" type="button" aria-label="${isAdded ? 'Убрать из корзины' : 'Добавить в корзину'}" aria-pressed="${isAdded}" data-context-add="${product.id}"><svg><use href="#i-cart"/></svg></button>
    </article>
  `;
}

function availableContexts() {
  const detected = new Set(activeItems().map((item) => item.dataset.context).filter(Boolean));
  if (detected.size) detected.add('toys');
  return [...detected];
}

function renderContextRecommendations() {
  if (!contextSection || !contextProducts) return;
  const available = availableContexts();
  contextSection.hidden = available.length === 0;
  if (!available.length) return;
  if (!available.includes(cartState.activeContext)) cartState.activeContext = available[0];

  document.querySelectorAll('[data-context-tab]').forEach((button) => {
    const isAvailable = available.includes(button.dataset.contextTab);
    const isActive = button.dataset.contextTab === cartState.activeContext;
    button.hidden = !isAvailable;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  const context = contextRecommendations[cartState.activeContext];
  const reason = document.querySelector('[data-context-reason]');
  if (reason) reason.textContent = context.reason;
  contextProducts.innerHTML = context.products.map(contextProductCard).join('');
}

function productDataFromCard(card) {
  if (card.matches('[data-cart-item]')) {
    return {
      kind: 'cart',
      item: card,
      key: card,
      title: card.querySelector('.cart-item__info h2')?.textContent.trim(),
      rating: card.querySelector('.cart-item__meta span')?.textContent.trim(),
      price: Number(card.dataset.price),
      oldPrice: Number(card.dataset.oldPrice),
      image: card.querySelector('.cart-item__image img')?.getAttribute('src'),
      alt: card.querySelector('.cart-item__image img')?.getAttribute('alt') || ''
    };
  }

  if (card.matches('.context-product')) {
    const id = card.dataset.contextProduct;
    const product = Object.values(contextRecommendations).flatMap((context) => context.products).find((item) => item.id === id);
    return {
      kind: 'recommendation',
      key: `context:${id}`,
      title: product.title,
      rating: `★ ${product.rating} · ${product.reviews}`,
      price: product.price,
      oldPrice: product.oldPrice,
      emoji: product.emoji
    };
  }

  const title = card.querySelector('h3')?.textContent.trim() || 'Товар Petshop';
  const slug = title.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-');
  return {
    kind: 'recommendation',
    key: `generic:${slug}`,
    title,
    rating: card.querySelector('p')?.textContent.trim(),
    price: Number(card.querySelector(':scope > strong')?.textContent.replace(/\D/g, '')) || 0,
    oldPrice: Number(card.querySelector(':scope > del')?.textContent.replace(/\D/g, '')) || 0,
    image: card.querySelector('img')?.getAttribute('src'),
    alt: card.querySelector('img')?.getAttribute('alt') || ''
  };
}

function openQuickView(card) {
  if (!quickView || !card) return;
  quickViewProduct = productDataFromCard(card);
  const visual = quickView.querySelector('[data-quickview-visual]');
  visual.innerHTML = quickViewProduct.image
    ? `<img src="${quickViewProduct.image}" alt="${quickViewProduct.alt}">`
    : `<span aria-hidden="true">${quickViewProduct.emoji || '🐾'}</span>`;
  quickView.querySelector('[data-quickview-title]').textContent = quickViewProduct.title;
  quickView.querySelector('[data-quickview-rating]').textContent = quickViewProduct.rating || '★ 4,9 · проверенный товар';
  quickView.querySelector('[data-quickview-price]').textContent = formatRub(quickViewProduct.price);
  quickView.querySelector('[data-quickview-old]').textContent = formatRub(quickViewProduct.oldPrice || quickViewProduct.price);
  const addButton = quickView.querySelector('[data-quickview-add]');
  const alreadyAdded = quickViewProduct.kind === 'recommendation' && cartState.recommendations.has(quickViewProduct.key);
  addButton.disabled = alreadyAdded;
  addButton.textContent = alreadyAdded ? 'Уже в корзине' : quickViewProduct.kind === 'cart' ? 'Добавить ещё' : 'Добавить в корзину';
  quickView.classList.add('is-open');
  quickView.setAttribute('aria-hidden', 'false');
  document.body.classList.add('quickview-open');
  quickView.querySelector('[data-quickview-close]')?.focus();
}

function closeQuickView() {
  if (!quickView) return;
  quickView.classList.remove('is-open');
  quickView.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('quickview-open');
}

function activeItems() {
  return [...document.querySelectorAll('[data-cart-item]')];
}

function updateLine(item) {
  const quantity = Number(item.dataset.quantity);
  const price = Number(item.dataset.price) * quantity;
  const oldPrice = Number(item.dataset.oldPrice) * quantity;
  item.querySelectorAll('[data-line-price]').forEach((node) => { node.textContent = formatRub(price); });
  item.querySelectorAll('[data-line-old]').forEach((node) => { node.textContent = formatRub(oldPrice); });
  const quantityValue = item.querySelector('[data-quantity-value]');
  if (quantityValue) quantityValue.textContent = quantity;
}

function updateCart() {
  const items = activeItems();
  const selected = items.filter((item) => item.querySelector('[data-item-check]')?.checked);
  const recommendationEntries = [...cartState.recommendations.values()];

  const itemQuantity = selected.reduce((sum, item) => sum + Number(item.dataset.quantity), 0);
  const itemCurrent = selected.reduce((sum, item) => sum + Number(item.dataset.price) * Number(item.dataset.quantity), 0);
  const itemOld = selected.reduce((sum, item) => sum + Number(item.dataset.oldPrice) * Number(item.dataset.quantity), 0);
  const recommendationCurrent = recommendationEntries.reduce((sum, entry) => sum + entry.price, 0);
  const recommendationOld = recommendationEntries.reduce((sum, entry) => sum + entry.oldPrice, 0);

  const quantity = itemQuantity + recommendationEntries.length;
  const current = itemCurrent + recommendationCurrent;
  const old = itemOld + recommendationOld;
  const baseDiscount = Math.max(0, old - current);
  const promoDiscount = cartState.promoApplied ? Math.round(current * .1) : 0;
  const autoDiscount = cartState.autoOrder ? Math.round(current * .1) : 0;
  const totalDiscount = baseDiscount + promoDiscount + autoDiscount;
  const total = Math.max(0, current - promoDiscount - autoDiscount);
  const uniqueCount = items.length + recommendationEntries.length;

  document.querySelectorAll('[data-cart-count]').forEach((node) => { node.textContent = uniqueCount; });
  const titleCount = document.querySelector('[data-cart-title-count]');
  if (titleCount) titleCount.textContent = pluralProducts(uniqueCount);
  const summaryCount = document.querySelector('[data-summary-count]');
  if (summaryCount) summaryCount.textContent = pluralProducts(quantity);
  const summaryOld = document.querySelector('[data-summary-old]');
  if (summaryOld) summaryOld.textContent = formatRub(old);
  const summaryDiscount = document.querySelector('[data-summary-discount]');
  if (summaryDiscount) summaryDiscount.textContent = `−${formatRub(totalDiscount)}`;
  const summaryTotal = document.querySelector('[data-summary-total]');
  if (summaryTotal) summaryTotal.textContent = formatRub(total);
  const mobileTotal = document.querySelector('[data-mobile-total]');
  if (mobileTotal) mobileTotal.textContent = formatRub(total);
  const bonus = document.querySelector('[data-bonus-value]');
  if (bonus) bonus.textContent = `+${Math.floor(total * .03)} бонусов`;

  const threshold = 549;
  const progress = Math.min(100, total / threshold * 100);
  const progressBar = document.querySelector('[data-delivery-progress]');
  if (progressBar) progressBar.style.width = `${progress}%`;
  const deliveryMessage = document.querySelector('[data-delivery-message]');
  const deliveryReady = total >= threshold;
  deliveryBlock?.classList.toggle('is-pending', !deliveryReady);
  if (deliveryMessage) deliveryMessage.textContent = deliveryReady ? 'Бесплатная доставка доступна' : `До бесплатной доставки ${formatRub(threshold - total)}`;

  const hasItems = uniqueCount > 0;
  emptyState?.toggleAttribute('hidden', hasItems);
  deliveryHead?.toggleAttribute('hidden', items.length === 0);
  autoOrderCard?.toggleAttribute('hidden', items.length === 0);
  document.querySelectorAll('[data-checkout]').forEach((button) => { button.disabled = total === 0; });

  if (selectAll) {
    selectAll.checked = items.length > 0 && selected.length === items.length;
    selectAll.indeterminate = selected.length > 0 && selected.length < items.length;
  }
  renderContextRecommendations();
}

activeItems().forEach(updateLine);
updateCart();

document.addEventListener('change', (event) => {
  if (event.target.matches('[data-select-all]')) {
    activeItems().forEach((item) => {
      const checkbox = item.querySelector('[data-item-check]');
      if (checkbox) checkbox.checked = event.target.checked;
      item.classList.toggle('is-unselected', !event.target.checked);
    });
    updateCart();
    return;
  }

  if (event.target.matches('[data-item-check]')) {
    event.target.closest('[data-cart-item]')?.classList.toggle('is-unselected', !event.target.checked);
    updateCart();
    return;
  }

  if (event.target.matches('[data-auto-order]')) {
    cartState.autoOrder = event.target.checked;
    showToast?.(cartState.autoOrder ? 'Скидка автозаказа применена' : 'Автозаказ отключён');
    updateCart();
  }
});

document.addEventListener('click', (event) => {
  const quickViewClose = event.target.closest('[data-quickview-close]');
  if (quickViewClose || event.target === quickView) {
    closeQuickView();
    return;
  }

  const quickViewAdd = event.target.closest('[data-quickview-add]');
  if (quickViewAdd && quickViewProduct) {
    if (quickViewProduct.kind === 'cart') {
      quickViewProduct.item.dataset.quantity = Number(quickViewProduct.item.dataset.quantity) + 1;
      updateLine(quickViewProduct.item);
      updateCart();
      showToast?.('Добавили ещё один товар');
    } else if (!cartState.recommendations.has(quickViewProduct.key)) {
      cartState.recommendations.set(quickViewProduct.key, { price: quickViewProduct.price, oldPrice: quickViewProduct.oldPrice || quickViewProduct.price });
      updateCart();
      quickViewAdd.disabled = true;
      quickViewAdd.textContent = 'Уже в корзине';
      showToast?.('Товар добавлен в корзину');
    }
    return;
  }

  const contextTab = event.target.closest('[data-context-tab]');
  if (contextTab) {
    cartState.activeContext = contextTab.dataset.contextTab;
    renderContextRecommendations();
    return;
  }

  const contextAdd = event.target.closest('[data-context-add]');
  if (contextAdd) {
    const productId = contextAdd.dataset.contextAdd;
    const product = Object.values(contextRecommendations).flatMap((context) => context.products).find((item) => item.id === productId);
    const recommendationKey = `context:${productId}`;
    const isAdded = !cartState.recommendations.has(recommendationKey);
    if (isAdded) {
      cartState.recommendations.set(recommendationKey, { price: product.price, oldPrice: product.oldPrice });
    } else {
      cartState.recommendations.delete(recommendationKey);
    }
    updateCart();
    showToast?.(isAdded ? 'Добавили товар из умной подборки' : 'Убрали товар из корзины');
    return;
  }

  const productOpen = event.target.closest('[data-product-open]');
  if (productOpen) {
    openQuickView(productOpen.closest('[data-cart-item]'));
    return;
  }

  const plusButton = event.target.closest('[data-quantity-plus]');
  if (plusButton) {
    const item = plusButton.closest('[data-cart-item]');
    item.dataset.quantity = Number(item.dataset.quantity) + 1;
    updateLine(item);
    updateCart();
    showToast?.('Количество увеличено');
    return;
  }

  const minusButton = event.target.closest('[data-quantity-minus]');
  if (minusButton) {
    const item = minusButton.closest('[data-cart-item]');
    const quantity = Number(item.dataset.quantity);
    if (quantity === 1) {
      showToast?.('Минимальное количество — 1');
      return;
    }
    item.dataset.quantity = quantity - 1;
    updateLine(item);
    updateCart();
    return;
  }

  const removeButton = event.target.closest('[data-remove-item]');
  if (removeButton) {
    const item = removeButton.closest('[data-cart-item]');
    item.style.opacity = '0';
    item.style.transform = 'translateX(10px)';
    setTimeout(() => {
      item.remove();
      updateCart();
    }, 180);
    showToast?.('Товар удалён из корзины');
    return;
  }

  const deleteSelected = event.target.closest('[data-delete-selected]');
  if (deleteSelected) {
    const selectedItems = activeItems().filter((item) => item.querySelector('[data-item-check]')?.checked);
    if (!selectedItems.length) {
      showToast?.('Сначала выберите товары');
      return;
    }
    selectedItems.forEach((item) => item.remove());
    updateCart();
    showToast?.('Выбранные товары удалены');
    return;
  }

  const copyPromo = event.target.closest('[data-copy-promo]');
  if (copyPromo) {
    const input = document.querySelector('[data-promo-form] input');
    if (input) {
      input.value = 'PETSHOP10';
      input.focus();
    }
    showToast?.('Промокод подставлен');
    return;
  }

  const recommendationButton = event.target.closest('[data-reco-add]');
  if (recommendationButton) {
    const card = recommendationButton.closest('.recommendation-card');
    const added = recommendationButton.classList.toggle('is-added');
    recommendationButton.setAttribute('aria-pressed', String(added));
    const title = card.querySelector('h3')?.textContent.trim() || 'Товар Petshop';
    const recommendationKey = `generic:${title.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-')}`;
    if (added) {
      const price = Number(card.querySelector(':scope > strong')?.textContent.replace(/\D/g, '')) || 0;
      const oldPrice = Number(card.querySelector(':scope > del')?.textContent.replace(/\D/g, '')) || price;
      cartState.recommendations.set(recommendationKey, { price, oldPrice });
    } else {
      cartState.recommendations.delete(recommendationKey);
    }
    updateCart();
    showToast?.(added ? 'Добавили рекомендацию в корзину' : 'Убрали рекомендацию из корзины');
    return;
  }

  const checkout = event.target.closest('[data-checkout]');
  if (checkout && !checkout.disabled) showToast?.('Переходим к выбору адреса доставки');

  const productCard = event.target.closest('[data-cart-item], .recommendation-card, .context-product');
  const interactive = event.target.closest('button, a, input, label');
  if (productCard && !interactive) openQuickView(productCard);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && quickView?.classList.contains('is-open')) closeQuickView();
});

document.querySelector('[data-promo-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('input');
  const code = input.value.trim().toUpperCase();
  if (code === 'PETSHOP10') {
    if (cartState.promoApplied) {
      showToast?.('Промокод уже применён');
      return;
    }
    cartState.promoApplied = true;
    input.disabled = true;
    event.currentTarget.querySelector('button').textContent = 'Готово';
    event.currentTarget.classList.add('is-applied');
    updateCart();
    showToast?.('Промокод применён: скидка 10%');
  } else {
    showToast?.(code ? 'Промокод не найден' : 'Введите промокод');
  }
});
