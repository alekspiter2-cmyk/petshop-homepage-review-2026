const cartState = {
  promoApplied: false,
  autoOrder: false,
  recommendations: new Map()
};

const cartRoot = document.querySelector('[data-cart-items]');
const selectAll = document.querySelector('[data-select-all]');
const deliveryBlock = document.querySelector('[data-free-delivery]');
const deliveryHead = document.querySelector('.cart-delivery-head');
const autoOrderCard = document.querySelector('.auto-order-card');
const emptyState = document.querySelector('[data-cart-empty]');

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
    if (added) {
      const price = Number(card.querySelector(':scope > strong')?.textContent.replace(/\D/g, '')) || 0;
      const oldPrice = Number(card.querySelector(':scope > del')?.textContent.replace(/\D/g, '')) || price;
      cartState.recommendations.set(card, { price, oldPrice });
    } else {
      cartState.recommendations.delete(card);
    }
    updateCart();
    showToast?.(added ? 'Добавили рекомендацию в корзину' : 'Убрали рекомендацию из корзины');
    return;
  }

  const checkout = event.target.closest('[data-checkout]');
  if (checkout && !checkout.disabled) showToast?.('Переходим к выбору адреса доставки');
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
