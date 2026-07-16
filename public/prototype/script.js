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

$$('[data-search-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = $('input', form)?.value.trim();
    showToast(query ? `Ищем «${query}»` : 'Напишите, что нужно найти');
  });
});

$$('[data-add-cart]').forEach((button) => {
  button.addEventListener('click', () => {
    const added = button.classList.toggle('is-added');
    button.setAttribute('aria-pressed', String(added));
    changeCart(added ? 1 : -1);
    showToast(added ? 'Товар добавлен в корзину' : 'Товар убран из корзины');
  });
});

$$('[data-favorite]').forEach((button) => {
  button.addEventListener('click', () => {
    const active = button.classList.toggle('is-active');
    button.setAttribute('aria-pressed', String(active));
    showToast(active ? 'Добавили в избранное' : 'Убрали из избранного');
  });
});

$('[data-repeat-order]')?.addEventListener('click', () => {
  changeCart(3);
  showToast('Прошлый заказ добавлен в корзину');
});

$('[data-scroll-catalog]')?.addEventListener('click', () => {
  $('#catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

$$('[data-toast]').forEach((element) => {
  element.addEventListener('click', () => showToast(element.dataset.toast));
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
  if (event.key === 'Escape') setDrawer(false);
});
$$('.mobile-drawer a').forEach((link) => link.addEventListener('click', () => setDrawer(false)));
