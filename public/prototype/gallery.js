(() => {
  const gallerySets = {
    royal: Array.from({ length: 10 }, (_, index) => `gallery-royal-${String(index + 1).padStart(2, '0')}.jpg`)
  };

  let modal;
  let product = null;
  let images = [];
  let activeIndex = 0;
  let onAdd = null;
  let lastFocus = null;
  let pointerStart = null;

  function assetPath(source) {
    if (!source) return '';
    if (/^(?:https?:|data:|\/)/.test(source) || source.startsWith('assets/')) return source;
    return `assets/${source}`;
  }

  function emojiImage(emoji = '🐾') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect width="800" height="800" rx="72" fill="#fff5ef"/><text x="400" y="460" text-anchor="middle" font-size="250">${emoji}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function imagesFor(item = {}) {
    const list = Array.isArray(item.gallery) && item.gallery.length
      ? item.gallery
      : gallerySets[item.galleryKey] || (item.image ? [item.image] : []);
    return list.length ? list.map(assetPath) : [emojiImage(item.emoji)];
  }

  function formatPrice(value) {
    if (typeof value === 'number') return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
    return value || '';
  }

  function ensureModal() {
    if (modal) return modal;
    document.body.insertAdjacentHTML('beforeend', `
      <aside class="pg-modal" aria-hidden="true" data-pg-modal>
        <button class="pg-backdrop" type="button" aria-label="Закрыть карточку товара" data-pg-close></button>
        <section class="pg-panel" role="dialog" aria-modal="true" aria-labelledby="pg-title">
          <button class="pg-close" type="button" aria-label="Закрыть карточку товара" data-pg-close>
            <span aria-hidden="true">×</span>
          </button>
          <div class="pg-layout">
            <div class="pg-media">
              <div class="pg-stage" data-pg-stage>
                <img data-pg-image alt="">
                <button class="pg-arrow pg-arrow--prev" type="button" aria-label="Предыдущее фото" data-pg-prev>‹</button>
                <button class="pg-arrow pg-arrow--next" type="button" aria-label="Следующее фото" data-pg-next>›</button>
                <span class="pg-counter" data-pg-counter></span>
                <span class="pg-swipe-hint" aria-hidden="true">Смахните фото</span>
              </div>
              <div class="pg-thumbs" role="list" aria-label="Фотографии товара" data-pg-thumbs></div>
            </div>
            <div class="pg-info">
              <span class="pg-badge" data-pg-badge></span>
              <h2 id="pg-title" data-pg-title></h2>
              <div class="pg-rating" data-pg-rating></div>
              <p class="pg-description" data-pg-description></p>
              <div class="pg-features">
                <span>✓ Оригинальный товар</span>
                <span>✓ Быстрая доставка Petshop</span>
                <span>✓ Возврат в течение 14 дней</span>
              </div>
              <div class="pg-variants" data-pg-variants hidden>
                <span>Вес упаковки</span>
                <div><button type="button">400 г</button><button type="button">1,2 кг</button><button type="button">2 кг</button><button class="is-active" type="button">4 кг</button></div>
              </div>
              <div class="pg-delivery"><i></i><span data-pg-delivery></span></div>
              <div class="pg-buy">
                <div><strong data-pg-price></strong><del data-pg-old-price></del></div>
                <button type="button" data-pg-add>В корзину</button>
              </div>
            </div>
          </div>
        </section>
      </aside>
    `);
    modal = document.querySelector('[data-pg-modal]');
    modal.addEventListener('click', handleModalClick);
    const stage = modal.querySelector('[data-pg-stage]');
    stage.addEventListener('pointerdown', (event) => {
      pointerStart = { x: event.clientX, y: event.clientY };
    });
    stage.addEventListener('pointerup', (event) => {
      if (!pointerStart || images.length < 2) return;
      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) show(activeIndex + (deltaX < 0 ? 1 : -1));
    });
    return modal;
  }

  function show(index) {
    if (!modal || !images.length) return;
    activeIndex = (index + images.length) % images.length;
    const mainImage = modal.querySelector('[data-pg-image]');
    mainImage.src = images[activeIndex];
    mainImage.alt = `${product.title} — фото ${activeIndex + 1} из ${images.length}`;
    modal.querySelector('[data-pg-counter]').textContent = `${activeIndex + 1} / ${images.length}`;
    modal.querySelectorAll('[data-pg-thumb]').forEach((button) => {
      const active = Number(button.dataset.pgThumb) === activeIndex;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-current', active ? 'true' : 'false');
      if (active) button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }

  function render() {
    modal.querySelector('[data-pg-title]').textContent = product.title || 'Товар Petshop';
    modal.querySelector('[data-pg-badge]').textContent = product.badge || 'Выбор Petshop';
    modal.querySelector('[data-pg-rating]').textContent = product.rating
      ? product.rating.trim().startsWith('★') ? product.rating : `★ ${product.rating}${product.reviews ? ` · ${product.reviews}` : ''}`
      : '★ 4,9 · проверенный товар';
    modal.querySelector('[data-pg-description]').textContent = product.description || 'Подходит вашему питомцу и доступно с быстрой доставкой Petshop.';
    modal.querySelector('[data-pg-delivery]').textContent = product.delivery || 'Доставим сегодня или завтра';
    modal.querySelector('[data-pg-price]').textContent = formatPrice(product.price);
    modal.querySelector('[data-pg-old-price]').textContent = formatPrice(product.oldPrice);
    modal.querySelector('[data-pg-variants]').hidden = product.galleryKey !== 'royal';
    const addButton = modal.querySelector('[data-pg-add]');
    addButton.textContent = 'В корзину';
    addButton.classList.remove('is-added');

    const multiple = images.length > 1;
    modal.classList.toggle('pg-modal--single', !multiple);
    modal.querySelectorAll('[data-pg-prev], [data-pg-next]').forEach((button) => { button.hidden = !multiple; });
    modal.querySelector('[data-pg-counter]').hidden = !multiple;
    modal.querySelector('[data-pg-thumbs]').innerHTML = images.map((source, index) => `
      <button class="pg-thumb${index === 0 ? ' is-active' : ''}" type="button" role="listitem" aria-label="Показать фото ${index + 1} из ${images.length}" aria-current="${index === 0}" data-pg-thumb="${index}">
        <img src="${source}" alt="" ${index > 3 ? 'loading="lazy"' : ''}>
      </button>
    `).join('');
    show(0);
  }

  function open(item, options = {}) {
    if (!item) return;
    ensureModal();
    product = item;
    images = imagesFor(item);
    activeIndex = 0;
    onAdd = typeof options.onAdd === 'function' ? options.onAdd : null;
    lastFocus = document.activeElement;
    render();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pg-open');
    requestAnimationFrame(() => modal.querySelector('[data-pg-close]').focus());
  }

  function close() {
    if (!modal?.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('pg-open');
    pointerStart = null;
    lastFocus?.focus?.();
  }

  function handleModalClick(event) {
    if (event.target.closest('[data-pg-close]')) return close();
    if (event.target.closest('[data-pg-prev]')) return show(activeIndex - 1);
    if (event.target.closest('[data-pg-next]')) return show(activeIndex + 1);
    const thumb = event.target.closest('[data-pg-thumb]');
    if (thumb) return show(Number(thumb.dataset.pgThumb));
    const variant = event.target.closest('[data-pg-variants] button');
    if (variant) {
      modal.querySelectorAll('[data-pg-variants] button').forEach((button) => button.classList.toggle('is-active', button === variant));
      return;
    }
    if (event.target.closest('[data-pg-add]')) {
      onAdd?.(product);
      const button = modal.querySelector('[data-pg-add]');
      button.textContent = 'Добавлено';
      button.classList.add('is-added');
    }
  }

  document.addEventListener('keydown', (event) => {
    if (!modal?.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft' && images.length > 1) show(activeIndex - 1);
    if (event.key === 'ArrowRight' && images.length > 1) show(activeIndex + 1);
    if (event.key === 'Tab') {
      const focusable = [...modal.querySelectorAll('button:not([hidden]):not(:disabled)')];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  window.PetshopGallery = { open, close, imagesFor };
})();
