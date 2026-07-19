const storePoints = [
  { id: 1, address: 'улица Савушкина, 127', metro: 'Старая Деревня', hours: '09:00–21:00', close: '21:00', phone: '+7 (812) 313-01-01', services: ['Самовывоз сегодня', 'Парковка', 'Бонусы'], pickup: true, vet: false, x: 32, y: 22 },
  { id: 2, address: 'улица Есенина, 32', metro: 'Проспект Просвещения', hours: '09:00–22:00', close: '22:00', phone: '+7 (812) 313-01-01', services: ['Самовывоз сегодня', 'Онлайн-оплата'], pickup: true, vet: false, x: 48, y: 16 },
  { id: 3, address: 'проспект Науки, 8', metro: 'Академическая', hours: '09:00–21:00', close: '21:00', phone: '+7 (812) 313-01-01', services: ['Самовывоз сегодня', 'Парковка'], pickup: true, vet: false, x: 64, y: 25 },
  { id: 4, address: 'улица Наличная, 40', metro: 'Приморская', hours: '09:00–21:00', close: '21:00', phone: '+7 (812) 313-01-01', services: ['Самовывоз сегодня', 'Бонусы'], pickup: true, vet: false, x: 22, y: 54 },
  { id: 5, address: 'улица Алтайская, 21', metro: 'Московская', hours: '09:00–21:00', close: '21:00', phone: '+7 (812) 313-01-01', services: ['Самовывоз сегодня', 'Парковка'], pickup: true, vet: false, x: 62, y: 77 },
  { id: 6, address: 'Ленинский проспект, 123', metro: 'Ленинский проспект', hours: '09:00–21:00', close: '21:00', phone: '+7 (812) 313-01-01', services: ['Самовывоз сегодня', 'Онлайн-оплата'], pickup: true, vet: false, x: 40, y: 82 },
  { id: 7, address: 'улица Марата, 80', metro: 'Звенигородская', hours: '09:00–21:00', close: '21:00', phone: '+7 (812) 313-01-01', services: ['Самовывоз сегодня', 'Бонусы'], pickup: true, vet: false, x: 54, y: 52 },
  { id: 8, address: 'Богатырский проспект, 49', metro: 'Комендантский проспект', hours: '09:00–22:00', close: '22:00', phone: '+7 (812) 313-01-01', services: ['Ветеринарный кабинет', 'Самовывоз сегодня', 'Парковка'], pickup: true, vet: true, x: 20, y: 15 }
];

const storeList = document.querySelector('[data-store-list]');
const mapMarkers = document.querySelector('[data-map-markers]');
const mapCard = document.querySelector('[data-map-store-card]');
const storeSearch = document.querySelector('[data-store-search]');
const resultSummary = document.querySelector('[data-result-summary]');
const emptyState = document.querySelector('[data-store-empty]');
let activeFilter = 'all';
let selectedStoreId = 1;

function routeUrl(store) {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(`Санкт-Петербург, ${store.address}`)}`;
}

function storeType(store) {
  return store.vet ? 'Магазин с веткабинетом' : 'Магазин Petshop';
}

function storeCard(store) {
  return `<article class="store-card${store.id === selectedStoreId ? ' is-selected' : ''}" data-store-id="${store.id}" tabindex="0">
    <div class="store-card__top"><span class="store-card__type${store.vet ? ' store-card__type--vet' : ''}">${storeType(store)}</span><span class="store-card__status">Открыто до ${store.close}</span></div>
    <h3>${store.address}</h3>
    <div class="store-card__metro"><span class="metro-icon">М</span>${store.metro}</div>
    <div class="store-card__details"><span><svg><use href="#i-clock"/></svg>Ежедневно ${store.hours}</span><span><svg><use href="#i-phone"/></svg>${store.phone}</span></div>
    <div class="store-card__services">${store.services.map((item) => `<span>${item}</span>`).join('')}</div>
    <div class="store-card__actions"><button type="button" data-store-details="${store.id}">Подробнее</button><a href="${routeUrl(store)}" target="_blank" rel="noopener" data-route-link><svg><use href="#i-route"/></svg>Маршрут</a></div>
  </article>`;
}

function mapSummary(store) {
  return `<span class="map-store-card__status">● Открыто до ${store.close}</span><h3>${store.address}</h3><p><span class="metro-icon">М</span> ${store.metro}</p><div class="map-store-card__meta"><span>${store.hours}</span><span>${storeType(store)}</span></div><div class="map-store-card__actions"><button type="button" data-store-details="${store.id}">Подробнее</button><a href="${routeUrl(store)}" target="_blank" rel="noopener"><svg><use href="#i-route"/></svg>Маршрут</a></div>`;
}

function filteredStores() {
  const query = storeSearch?.value.trim().toLocaleLowerCase('ru') || '';
  return storePoints.filter((store) => {
    const matchesQuery = !query || `${store.address} ${store.metro} ${store.services.join(' ')}`.toLocaleLowerCase('ru').includes(query);
    const matchesFilter = activeFilter === 'all' || activeFilter === 'open' || (activeFilter === 'vet' && store.vet) || (activeFilter === 'pickup' && store.pickup);
    return matchesQuery && matchesFilter;
  });
}

function renderStores() {
  const visible = filteredStores();
  if (!visible.some((store) => store.id === selectedStoreId) && visible[0]) selectedStoreId = visible[0].id;
  if (storeList) storeList.innerHTML = visible.map(storeCard).join('');
  if (mapMarkers) mapMarkers.innerHTML = visible.map((store) => `<button class="map-marker${store.id === selectedStoreId ? ' is-selected' : ''}" type="button" style="left:${store.x}%;top:${store.y}%" aria-label="${store.address}" data-map-store="${store.id}"><span>${store.vet ? '+' : 'P'}</span></button>`).join('');
  const selected = storePoints.find((store) => store.id === selectedStoreId) || visible[0];
  if (mapCard) mapCard.innerHTML = selected ? mapSummary(selected) : '<h3>Магазины не найдены</h3><p>Измените параметры поиска.</p>';
  if (resultSummary) resultSummary.textContent = `${visible.length} ${visible.length === 1 ? 'магазин' : visible.length < 5 ? 'магазина' : 'магазинов'} в Санкт-Петербурге`;
  if (emptyState) emptyState.hidden = visible.length !== 0;
  if (storeList) storeList.hidden = visible.length === 0;
}

function selectStore(id, openMap = false) {
  selectedStoreId = id;
  if (openMap) setView('map');
  renderStores();
}

function setView(view) {
  document.querySelectorAll('[data-store-view]').forEach((button) => {
    const active = button.dataset.storeView === view;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-store-panel]').forEach((panel) => panel.classList.toggle('is-active', panel.dataset.storePanel === view));
  history.replaceState(null, '', view === 'map' ? '#map' : window.location.pathname + window.location.search);
}

function openStoreModal(store) {
  const modal = document.querySelector('[data-store-modal]');
  const content = document.querySelector('[data-store-modal-content]');
  if (!modal || !content) return;
  content.innerHTML = `<div class="store-modal__head"><span>${storeType(store)}</span><button class="store-modal__close" type="button" aria-label="Закрыть" data-store-modal-close><svg><use href="#i-close"/></svg></button></div><h2 id="store-modal-title">${store.address}</h2><div class="store-modal__metro"><span class="metro-icon">М</span>${store.metro}</div><div class="store-modal__info"><div><small>Часы работы</small><b>Ежедневно ${store.hours}</b></div><div><small>Телефон</small><b>${store.phone}</b></div></div><div class="store-modal__services">${store.services.map((item) => `<span>✓ ${item}</span>`).join('')}</div><p class="store-modal__note">При оформлении самовывоза действует цена интернет-магазина. За заказ можно получить и списать бонусы Petshop.</p><div class="store-modal__actions"><button type="button" data-select-on-map="${store.id}"><svg><use href="#i-map"/></svg>Показать на карте</button><a href="${routeUrl(store)}" target="_blank" rel="noopener"><svg><use href="#i-route"/></svg>Построить маршрут</a></div>`;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  content.querySelector('[data-store-modal-close]')?.focus();
}

function closeStoreModal() {
  const modal = document.querySelector('[data-store-modal]');
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
}

function setCityPopover(open) {
  const popover = document.querySelector('[data-city-popover]');
  if (!popover) return;
  popover.hidden = !open;
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) document.querySelector('[data-city-search]')?.focus();
}

document.addEventListener('click', (event) => {
  const viewButton = event.target.closest('[data-store-view]');
  if (viewButton) return setView(viewButton.dataset.storeView);
  const filterButton = event.target.closest('[data-store-filter]');
  if (filterButton) {
    activeFilter = filterButton.dataset.storeFilter;
    document.querySelectorAll('[data-store-filter]').forEach((button) => button.classList.toggle('is-active', button === filterButton));
    renderStores();
    return;
  }
  const marker = event.target.closest('[data-map-store]');
  if (marker) return selectStore(Number(marker.dataset.mapStore));
  const details = event.target.closest('[data-store-details]');
  if (details) return openStoreModal(storePoints.find((store) => store.id === Number(details.dataset.storeDetails)));
  const card = event.target.closest('[data-store-id]');
  if (card && !event.target.closest('a,button')) return selectStore(Number(card.dataset.storeId), true);
  if (event.target.closest('[data-city-open]')) return setCityPopover(true);
  if (event.target.closest('[data-city-close]')) return setCityPopover(false);
  if (event.target.closest('[data-store-modal-close]')) return closeStoreModal();
  const onMap = event.target.closest('[data-select-on-map]');
  if (onMap) { closeStoreModal(); selectStore(Number(onMap.dataset.selectOnMap), true); }
  if (event.target.closest('[data-search-clear]')) { storeSearch.value = ''; storeSearch.closest('.store-search').classList.remove('has-value'); renderStores(); storeSearch.focus(); }
  if (event.target.closest('[data-reset-filters]')) {
    activeFilter = 'all'; storeSearch.value = ''; storeSearch.closest('.store-search').classList.remove('has-value');
    document.querySelectorAll('[data-store-filter]').forEach((button) => button.classList.toggle('is-active', button.dataset.storeFilter === 'all')); renderStores();
  }
  if (event.target.closest('[data-nearby]')) { selectStore(7); if (typeof showToast === 'function') showToast('Показываем ближайшие магазины'); }
});

storeSearch?.addEventListener('input', () => { storeSearch.closest('.store-search').classList.toggle('has-value', Boolean(storeSearch.value)); renderStores(); });
document.querySelector('[data-city-search]')?.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLocaleLowerCase('ru');
  document.querySelectorAll('[data-city-list] button').forEach((button) => { button.hidden = !button.textContent.toLocaleLowerCase('ru').includes(query); });
});
document.querySelector('[data-city-list]')?.addEventListener('click', (event) => {
  const button = event.target.closest('button'); if (!button) return;
  document.querySelectorAll('[data-city-list] button').forEach((item) => item.classList.toggle('is-active', item === button));
  document.querySelector('[data-current-city]').textContent = button.textContent;
  setCityPopover(false);
  if (typeof showToast === 'function') showToast(button.textContent === 'Санкт-Петербург' ? 'Город выбран' : `В прототипе показываем пример для города ${button.textContent}`);
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeStoreModal(); setCityPopover(false); } });

renderStores();
if (window.location.hash === '#map') setView('map');
