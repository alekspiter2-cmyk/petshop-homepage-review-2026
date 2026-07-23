(() => {
  const STORAGE_KEY = 'petshop-assistant-prototype-v4';
  const MAX_MESSAGES = 14;

  const catalog = [
    { id: 'royal-canin-sterilised', title: 'Royal Canin Sterilised 37 для стерилизованных кошек, 4 кг', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: true, price: 5268, rating: '5,0', reviews: 557, image: 'gallery-royal-01.jpg', note: 'Премиальный рацион · контроль веса', tags: 'кошка кот стерилизован сухой корм контроль веса royal canin' },
    { id: 'organix-rabbit-small', title: 'Organix Sterilised с кроликом, 400 г', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: true, price: 519, rating: '4,8', reviews: 291, image: 'product-rabbit.jpg', note: 'Небольшая упаковка · можно попробовать', tags: 'кошка кот стерилизован сухой корм кролик недорогой' },
    { id: 'savita-turkey', title: 'Savita Sterilised со свежей индейкой, 1,5 кг', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: true, price: 1290, rating: '4,9', reviews: 684, image: 'product-turkey.png', note: 'Выгодный ежедневный рацион', tags: 'кошка кот стерилизован сухой корм индейка контроль веса' },
    { id: 'florida-salmon', title: 'Florida Sterilised с лососем и черникой, 1,5 кг', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: true, price: 1690, rating: '5,0', reviews: 536, image: 'product-salmon.png', note: 'Лосось · поддержка кожи и шерсти', tags: 'кошка стерилизован сухой корм лосось шерсть кожа' },
    { id: 'gokitchen-sensitive-cat', title: 'GO’KITCHEN Sensitive с индейкой, 1,5 кг', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: null, sensitive: true, price: 1890, rating: '4,8', reviews: 418, image: 'product-dog.png', note: 'Для чувствительного пищеварения', tags: 'кошка сухой корм индейка чувствительное пищеварение' },
    { id: 'taormina-grainfree-cat', title: 'Taormina беззерновой корм с индейкой, 3 кг', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: null, sensitive: true, price: 2924, rating: '4,9', reviews: 702, image: 'product-turkey.png', note: 'Беззерновой состав · большая упаковка', tags: 'кошка сухой корм индейка беззерновой чувствительный' },
    { id: 'savita-kitten', title: 'Savita Kitten с курицей для котят, 700 г', pet: 'cat', category: 'dry_food', age: 'young', sterilized: false, price: 749, rating: '4,9', reviews: 438, image: 'product-rabbit.jpg', note: 'Для роста котят до 12 месяцев', tags: 'кошка котенок сухой корм курица рост' },
    { id: 'savita-senior-cat', title: 'Savita Senior для кошек старше 7 лет, 1,5 кг', pet: 'cat', category: 'dry_food', age: 'senior', sterilized: null, price: 1590, rating: '4,9', reviews: 367, image: 'product-renal.png', note: 'Для кошек старше 7 лет', tags: 'кошка пожилая старше 7 лет сухой корм' },
    { id: 'adult-dog-food', title: 'GO’KITCHEN корм для взрослых собак, 3 кг', pet: 'dog', category: 'dry_food', age: 'adult', sterilized: null, price: 1749, rating: '4,8', reviews: 418, image: 'product-dog.png', note: 'Повседневный сбалансированный рацион', tags: 'собака пес взрослый сухой корм ежедневный рацион' },
    { id: 'florida-small-dog', title: 'Florida для взрослых собак малых пород, 1 кг', pet: 'dog', category: 'dry_food', age: 'adult', sterilized: null, price: 999, rating: '4,9', reviews: 395, image: 'product-salmon.png', note: 'Мелкие гранулы · для малых пород', tags: 'собака малая порода взрослый сухой корм' },
    { id: 'organix-adult-dog', title: 'Organix Adult с индейкой для собак, 2 кг', pet: 'dog', category: 'dry_food', age: 'adult', sterilized: null, price: 1490, rating: '4,8', reviews: 447, image: 'product-rabbit.jpg', note: 'Индейка · средняя упаковка', tags: 'собака взрослый сухой корм индейка' },
    { id: 'sensitive-dog-food', title: 'Savita Sensitive с ягнёнком для собак, 1,5 кг', pet: 'dog', category: 'dry_food', age: 'adult', sterilized: null, sensitive: true, price: 1399, rating: '4,9', reviews: 512, image: 'product-turkey.png', note: 'Ягнёнок · чувствительное пищеварение', tags: 'собака сухой корм ягненок чувствительное пищеварение' },
    { id: 'puppy-dog-food', title: 'Organix Puppy с курицей для щенков, 1 кг', pet: 'dog', category: 'dry_food', age: 'young', sterilized: null, price: 899, rating: '4,8', reviews: 326, image: 'product-dog.png', note: 'Для щенков до 12 месяцев', tags: 'собака щенок сухой корм курица рост' },
    { id: 'senior-dog-food', title: 'Savita Senior для собак старше 7 лет, 2 кг', pet: 'dog', category: 'dry_food', age: 'senior', sterilized: null, price: 1650, rating: '4,9', reviews: 284, image: 'product-renal.png', note: 'Для собак старше 7 лет', tags: 'собака пожилая старше 7 лет сухой корм' },
    { id: 'large-dog-food', title: 'Taormina для собак средних и крупных пород, 5 кг', pet: 'dog', category: 'dry_food', age: 'adult', sterilized: null, price: 2949, rating: '4,8', reviews: 604, image: 'product-dog.png', note: 'Большая упаковка · выгодная цена за кг', tags: 'собака средняя крупная порода сухой корм' },
    { id: 'little-one-ferret', title: 'Little One корм для хорьков, 400 г', pet: 'ferret', category: 'dry_food', age: null, sterilized: null, price: 509, rating: '4,8', reviews: 126, image: 'product-ferret.svg', href: 'catalog.html#other-pets', note: 'Небольшая упаковка · можно попробовать', tags: 'хорек хорьки сухой корм полнорационный little one' },
    { id: 'padovan-grandmix-ferret', title: 'Padovan GrandMix корм для хорьков, 850 г', pet: 'ferret', category: 'dry_food', age: null, sterilized: null, price: 1149, rating: '4,9', reviews: 84, image: 'product-ferret.svg', href: 'catalog.html#other-pets', note: 'Средняя упаковка · ежедневный рацион', tags: 'хорек хорьки сухой корм padovan grandmix' },
    { id: 'fiory-ferret', title: 'Fiory Ferret корм для хорьков, 650 г', pet: 'ferret', category: 'dry_food', age: null, sterilized: null, price: 1390, rating: '4,8', reviews: 57, image: 'product-ferret.svg', href: 'catalog.html#other-pets', note: 'Белковый рацион · удобная упаковка', tags: 'хорек хорьки сухой корм fiory белок' },
    { id: 'versele-laga-ferret', title: 'Versele-Laga Complete Ferret, 750 г', pet: 'ferret', category: 'dry_food', age: null, sterilized: null, price: 1699, rating: '4,9', reviews: 63, image: 'product-ferret.svg', href: 'catalog.html#other-pets', note: 'Полнорационный корм · крупная упаковка', tags: 'хорек хорьки сухой корм versele laga complete' },
    { id: 'little-one-hamster', title: 'Little One корм для хомяков, 400 г', pet: 'rodent', detail: 'hamster', category: 'dry_food', price: 319, rating: '4,9', reviews: 248, image: 'product-rodent.svg', href: 'catalog.html#other-pets', note: 'Для хомяков · небольшая упаковка', tags: 'грызун хомяк корм little one' },
    { id: 'fiory-hamster', title: 'Fiory смесь для хомяков, 400 г', pet: 'rodent', detail: 'hamster', category: 'dry_food', price: 429, rating: '4,8', reviews: 137, image: 'product-rodent.svg', href: 'catalog.html#other-pets', note: 'Зерновая смесь · ежедневный рацион', tags: 'грызун хомяк корм fiory смесь' },
    { id: 'little-one-rat', title: 'Little One корм для крыс, 400 г', pet: 'rodent', detail: 'rat', category: 'dry_food', price: 339, rating: '4,9', reviews: 214, image: 'product-rodent.svg', href: 'catalog.html#other-pets', note: 'Для декоративных крыс', tags: 'грызун крыса корм little one' },
    { id: 'versele-laga-rat', title: 'Versele-Laga Nature Rat, 500 г', pet: 'rodent', detail: 'rat', category: 'dry_food', price: 599, rating: '4,8', reviews: 92, image: 'product-rodent.svg', href: 'catalog.html#other-pets', note: 'Разнообразная смесь · средняя упаковка', tags: 'грызун крыса корм versele laga' },
    { id: 'little-one-guinea-pig', title: 'Little One корм для морских свинок, 400 г', pet: 'rodent', detail: 'guinea_pig', category: 'dry_food', price: 349, rating: '4,9', reviews: 306, image: 'product-rodent.svg', href: 'catalog.html#other-pets', note: 'Для морских свинок · витамин C', tags: 'грызун морская свинка корм little one' },
    { id: 'vitakraft-guinea-pig', title: 'Vitakraft Menu корм для морских свинок, 600 г', pet: 'rodent', detail: 'guinea_pig', category: 'dry_food', price: 649, rating: '4,8', reviews: 118, image: 'product-rodent.svg', href: 'catalog.html#other-pets', note: 'Большая упаковка · растительные компоненты', tags: 'грызун морская свинка корм vitakraft' },
    { id: 'little-one-chinchilla', title: 'Little One корм для шиншилл, 400 г', pet: 'rodent', detail: 'chinchilla', category: 'dry_food', price: 359, rating: '4,9', reviews: 276, image: 'product-rodent.svg', href: 'catalog.html#other-pets', note: 'Для шиншилл · травы и гранулы', tags: 'грызун шиншилла корм little one' },
    { id: 'versele-laga-chinchilla', title: 'Versele-Laga Nature Chinchilla, 500 г', pet: 'rodent', detail: 'chinchilla', category: 'dry_food', price: 669, rating: '4,8', reviews: 101, image: 'product-rodent.svg', href: 'catalog.html#other-pets', note: 'Средняя упаковка · разнообразный состав', tags: 'грызун шиншилла корм versele laga' },
    { id: 'rio-budgie', title: 'RIO корм для волнистых попугаев, 500 г', pet: 'bird', detail: 'budgie', category: 'dry_food', price: 329, rating: '4,9', reviews: 421, image: 'product-bird.svg', href: 'catalog.html#birds', note: 'Для волнистых попугаев', tags: 'птица волнистый попугай корм rio' },
    { id: 'padovan-budgie', title: 'Padovan GrandMix Cocorite, 400 г', pet: 'bird', detail: 'budgie', category: 'dry_food', price: 449, rating: '4,8', reviews: 163, image: 'product-bird.svg', href: 'catalog.html#birds', note: 'Зерновая смесь · небольшая упаковка', tags: 'птица волнистый попугай корм padovan' },
    { id: 'rio-parrot', title: 'RIO корм для средних попугаев, 500 г', pet: 'bird', detail: 'parrot', category: 'dry_food', price: 439, rating: '4,9', reviews: 284, image: 'product-bird.svg', href: 'catalog.html#birds', note: 'Для корелл и средних попугаев', tags: 'птица попугай корелла корм rio' },
    { id: 'padovan-parrot', title: 'Padovan GrandMix Parrocchetti, 850 г', pet: 'bird', detail: 'parrot', category: 'dry_food', price: 699, rating: '4,8', reviews: 126, image: 'product-bird.svg', href: 'catalog.html#birds', note: 'Большая упаковка · зерновая смесь', tags: 'птица попугай корелла корм padovan' },
    { id: 'rio-canary', title: 'RIO корм для канареек, 500 г', pet: 'bird', detail: 'canary', category: 'dry_food', price: 399, rating: '4,9', reviews: 207, image: 'product-bird.svg', href: 'catalog.html#birds', note: 'Для канареек · ежедневный рацион', tags: 'птица канарейка корм rio' },
    { id: 'padovan-canary', title: 'Padovan GrandMix Canarini, 1 кг', pet: 'bird', detail: 'canary', category: 'dry_food', price: 749, rating: '4,8', reviews: 88, image: 'product-bird.svg', href: 'catalog.html#birds', note: 'Большая упаковка · зерновая смесь', tags: 'птица канарейка корм padovan' },
    { id: 'tetramin-fish', title: 'TetraMin корм для тропических рыб, 100 мл', pet: 'fish', detail: 'tropical_fish', category: 'dry_food', price: 399, rating: '4,9', reviews: 318, image: 'product-fish.svg', href: 'catalog.html#fish', note: 'Хлопья для тропических рыб', tags: 'рыбки тропические корм tetra min хлопья' },
    { id: 'tetra-pro-fish', title: 'TetraPro корм для тропических рыб, 250 мл', pet: 'fish', detail: 'tropical_fish', category: 'dry_food', price: 799, rating: '4,9', reviews: 196, image: 'product-fish.svg', href: 'catalog.html#fish', note: 'Большая банка · чипсы', tags: 'рыбки тропические корм tetra pro' },
    { id: 'tetra-goldfish', title: 'Tetra Goldfish корм для золотых рыб, 100 мл', pet: 'fish', detail: 'goldfish', category: 'dry_food', price: 429, rating: '4,9', reviews: 241, image: 'product-fish.svg', href: 'catalog.html#fish', note: 'Хлопья для золотых рыб', tags: 'рыбки золотая рыбка корм tetra' },
    { id: 'tetra-goldfish-pro', title: 'Tetra Goldfish Pro, 250 мл', pet: 'fish', detail: 'goldfish', category: 'dry_food', price: 849, rating: '4,8', reviews: 134, image: 'product-fish.svg', href: 'catalog.html#fish', note: 'Большая банка · ежедневный рацион', tags: 'рыбки золотая рыбка корм tetra pro' },
    { id: 'tetra-cichlid', title: 'Tetra Cichlid корм для цихлид, 250 мл', pet: 'fish', detail: 'cichlid', category: 'dry_food', price: 699, rating: '4,9', reviews: 172, image: 'product-fish.svg', href: 'catalog.html#fish', note: 'Палочки для цихлид', tags: 'рыбки цихлиды корм tetra' },
    { id: 'sera-cichlid', title: 'Sera Cichlid Sticks, 250 мл', pet: 'fish', detail: 'cichlid', category: 'dry_food', price: 779, rating: '4,8', reviews: 96, image: 'product-fish.svg', href: 'catalog.html#fish', note: 'Плавающие палочки · средняя банка', tags: 'рыбки цихлиды корм sera' },
    { id: 'van-cat-litter', title: 'Van Cat комкующийся наполнитель без пыли, 5 кг', pet: 'cat', category: 'litter', price: 579, rating: '4,9', reviews: 1230, image: 'product-litter.png', tags: 'кошка кот наполнитель комкующийся без пыли запах' },
    { id: 'ceramic-bowl', title: 'Керамическая миска с нескользящим дном', pet: 'any', category: 'bowl', price: 459, rating: '4,9', reviews: 642, image: 'product-rabbit.jpg', tags: 'миска керамика кормление нескользящий' },
    { id: 'feeding-mat', title: 'Коврик под миски с защитой от воды', pet: 'any', category: 'mat', price: 329, rating: '4,8', reviews: 381, image: 'product-turkey.png', tags: 'коврик миска кормление защита пола вода' },
    { id: 'wet-salmon-pouch', title: 'Florida влажный корм с лососем, пауч 85 г', pet: 'cat', category: 'wet_food', age: 'adult', sterilized: null, price: 89, rating: '5,0', reviews: 1102, image: 'product-salmon.png', note: 'Лосось · пауч на одну порцию', tags: 'кошка кот влажный корм пауч лосось' },
    { id: 'wet-rabbit-pouch', title: 'Organix влажный корм с кроликом, 85 г', pet: 'cat', category: 'wet_food', age: 'adult', sterilized: null, price: 79, rating: '4,9', reviews: 845, image: 'product-rabbit.jpg', note: 'Нежный кролик · без искусственных красителей', tags: 'кошка кот влажный корм пауч кролик' },
    { id: 'wet-kitten-pouch', title: 'Savita влажный корм для котят с курицей, 85 г', pet: 'cat', category: 'wet_food', age: 'young', sterilized: false, price: 85, rating: '4,9', reviews: 392, image: 'product-turkey.png', note: 'Мягкая текстура для котят', tags: 'кошка котенок влажный корм пауч курица' },
    { id: 'wet-dog-lamb', title: 'Savita влажный корм для собак с ягнёнком, 100 г', pet: 'dog', category: 'wet_food', age: 'adult', sterilized: null, price: 99, rating: '4,9', reviews: 476, image: 'product-dog.png', note: 'Ягнёнок · порционная упаковка', tags: 'собака влажный корм ягненок пауч' },
    { id: 'catnip-ball', title: 'Мячик с кошачьей мятой для активной игры', pet: 'cat', category: 'toy', price: 299, rating: '4,9', reviews: 740, image: 'product-turkey.png', tags: 'кошка кот игрушка мяч кошачья мята активность' },
    { id: 'high-cat-tray', title: 'Высокий лоток с защитным бортиком', pet: 'cat', category: 'tray', price: 899, rating: '4,9', reviews: 865, image: 'product-litter.png', tags: 'кошка кот лоток туалет высокий борт наполнитель' },
    { id: 'litter-scoop', title: 'Совок для наполнителя с крупной сеткой', pet: 'cat', category: 'scoop', price: 189, rating: '4,8', reviews: 512, image: 'product-litter.png', tags: 'кошка совок лоток наполнитель уборка' },
    { id: 'litter-honeycomb-mat', title: 'Двухслойный коврик под кошачий лоток', pet: 'cat', category: 'litter_mat', price: 459, rating: '4,9', reviews: 692, image: 'product-litter.png', tags: 'кошка коврик лоток наполнитель чистота' }
  ];

  const productById = Object.fromEntries(catalog.map((product) => [product.id, product]));
  const defaultQuick = ['Корм для кошки', 'Корм для собаки', 'Корм для хорька', 'Корм для грызуна', 'Корм для птицы', 'Корм для рыбок'];
  const state = loadState();
  let answerTimer;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.messages)) {
        return {
          messages: saved.messages.slice(-MAX_MESSAGES),
          pet: ['cat', 'dog', 'ferret', 'rodent', 'bird', 'fish'].includes(saved.pet) ? saved.pet : null,
          petDetail: typeof saved.petDetail === 'string' ? saved.petDetail : null,
          lastIntent: saved.lastIntent || null,
          age: ['young', 'adult', 'senior'].includes(saved.age) ? saved.age : null,
          sterilized: typeof saved.sterilized === 'boolean' ? saved.sterilized : null,
          sensitive: Boolean(saved.sensitive),
          budget: Number.isFinite(saved.budget) ? saved.budget : null,
          noBudget: Boolean(saved.noBudget),
          profileComplete: Boolean(saved.profileComplete),
          pendingQuestion: saved.pendingQuestion || null
        };
      }
    } catch (_) {
      // A blocked or malformed localStorage must not break the prototype.
    }
    return {
      messages: [], pet: null, petDetail: null, lastIntent: null, age: null, sterilized: null,
      sensitive: false, budget: null, noBudget: false, profileComplete: false,
      pendingQuestion: null
    };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      // The assistant still works for the current page when storage is unavailable.
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (symbol) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[symbol]);
  }

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[^a-zа-я0-9\s]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function rubles(value) {
    return `${Number(value).toLocaleString('ru-RU')} ₽`;
  }

  function reviewLabel(value) {
    const lastTwo = value % 100;
    const last = value % 10;
    if (lastTwo >= 11 && lastTwo <= 19) return `${value} отзывов`;
    if (last === 1) return `${value} отзыв`;
    if (last >= 2 && last <= 4) return `${value} отзыва`;
    return `${value} отзывов`;
  }

  function mount() {
    const launcher = document.createElement('button');
    launcher.className = 'petshop-assistant-launcher';
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Открыть помощника Petshop');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = `
      <span class="petshop-assistant-launcher__icon" aria-hidden="true">🐾</span>
      <span class="petshop-assistant-launcher__label">Помочь с выбором</span>
      <i class="petshop-assistant-launcher__pulse" aria-hidden="true"></i>`;

    const panel = document.createElement('section');
    panel.className = 'petshop-assistant';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-label', 'Помощник Petshop');
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <header class="petshop-assistant__header">
        <span class="petshop-assistant__avatar" aria-hidden="true">🐾</span>
        <div class="petshop-assistant__heading">
          <strong>Помощник Petshop</strong>
          <span>Подбирает товары мгновенно · демо</span>
        </div>
        <button class="petshop-assistant__header-action" type="button" title="Начать заново" aria-label="Очистить диалог" data-pa-reset>↻</button>
        <button class="petshop-assistant__header-action" type="button" aria-label="Закрыть помощника" data-pa-close>×</button>
      </header>
      <div class="petshop-assistant__messages" aria-live="polite" data-pa-messages></div>
      <footer class="petshop-assistant__composer">
        <form class="petshop-assistant__form" data-pa-form>
          <input name="message" type="text" maxlength="280" autocomplete="off" aria-label="Сообщение помощнику" placeholder="Например, корм хорьку или попугаю">
          <button class="petshop-assistant__send" type="submit" aria-label="Отправить">➜</button>
        </form>
        <p class="petshop-assistant__privacy">Демо работает в браузере и никуда не отправляет ваши сообщения</p>
      </footer>`;

    document.body.append(launcher, panel);
    const messages = panel.querySelector('[data-pa-messages]');
    const form = panel.querySelector('[data-pa-form]');
    const input = form.elements.message;

    if (!state.messages.length) {
      state.messages.push({
        role: 'assistant',
        text: 'Здравствуйте! Помогу подобрать корм, наполнитель или полезные дополнения. Для кого выбираем?',
        products: [],
        quick: defaultQuick
      });
      saveState();
    }
    render(messages);

    function setOpen(open) {
      panel.classList.toggle('is-open', open);
      panel.setAttribute('aria-hidden', String(!open));
      launcher.setAttribute('aria-expanded', String(open));
      launcher.hidden = open;
      if (open) {
        requestAnimationFrame(() => input.focus());
        scrollMessages(messages);
      } else {
        launcher.focus();
      }
    }

    launcher.addEventListener('click', () => setOpen(true));
    panel.querySelector('[data-pa-close]').addEventListener('click', () => setOpen(false));
    panel.querySelector('[data-pa-reset]').addEventListener('click', () => {
      clearTimeout(answerTimer);
      state.messages = [{
        role: 'assistant',
        text: 'Начнём заново. Для кого и что хотите подобрать?',
        products: [],
        quick: defaultQuick
      }];
      state.pet = null;
      state.petDetail = null;
      state.lastIntent = null;
      state.age = null;
      state.sterilized = null;
      state.sensitive = false;
      state.budget = null;
      state.noBudget = false;
      state.profileComplete = false;
      state.pendingQuestion = null;
      saveState();
      render(messages);
      input.focus();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      input.value = '';
      send(value, messages);
    });

    messages.addEventListener('click', (event) => {
      const quick = event.target.closest('[data-pa-quick]');
      if (quick) {
        send(quick.dataset.paQuick, messages);
        return;
      }
      const productLink = event.target.closest('[data-pa-product]');
      if (productLink) {
        const product = productById[productLink.dataset.paProduct];
        if (product && window.PetshopGallery) {
          event.preventDefault();
          window.PetshopGallery.open(product, {
            onAdd: () => {
              if (typeof window.changeCart === 'function') window.changeCart(1);
              if (typeof window.showToast === 'function') window.showToast('Товар добавлен в корзину');
            }
          });
        }
        return;
      }
      const add = event.target.closest('[data-pa-add]');
      if (add && !add.classList.contains('is-added')) {
        add.classList.add('is-added');
        add.textContent = 'Добавлено';
        add.disabled = true;
        if (typeof window.changeCart === 'function') window.changeCart(1);
        if (typeof window.showToast === 'function') window.showToast('Товар добавлен в корзину');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
    });
  }

  function send(text, container) {
    clearTimeout(answerTimer);
    state.messages.push({ role: 'user', text, products: [], quick: [] });
    state.messages = state.messages.slice(-MAX_MESSAGES);
    saveState();
    render(container, true);
    answerTimer = setTimeout(() => {
      state.messages.push({ role: 'assistant', ...replyFor(text) });
      state.messages = state.messages.slice(-MAX_MESSAGES);
      saveState();
      render(container);
    }, 420);
  }

  function detectPet(text) {
    if (/(хорек|хорьк)/.test(text)) return 'ferret';
    if (/(грызун|хомяк|хомяч|крыс|морск[а-я]* свин|шиншилл|дегу|кролик|мышк)/.test(text)) return 'rodent';
    if (/(птиц|попуг|корелл|канар|амадин|какаду|неразлуч)/.test(text)) return 'bird';
    if (/(рыб|аквариум|цихлид)/.test(text)) return 'fish';
    if (/(собак|собач|пес|псу|щен|дог)/.test(text)) return 'dog';
    if (/(кош|кот|кис|котен)/.test(text)) return 'cat';
    return null;
  }

  function detectPetDetail(text) {
    if (/(хомяк|хомяч)/.test(text)) return 'hamster';
    if (/(морск[а-я]* свин)/.test(text)) return 'guinea_pig';
    if (/(шиншилл)/.test(text)) return 'chinchilla';
    if (/(крыс)/.test(text)) return 'rat';
    if (/(волнист)/.test(text)) return 'budgie';
    if (/(канар)/.test(text)) return 'canary';
    if (/(попуг|корелл|какаду|неразлуч)/.test(text)) return 'parrot';
    if (/(золот[а-я]* рыб)/.test(text)) return 'goldfish';
    if (/(цихлид)/.test(text)) return 'cichlid';
    if (/(тропическ[а-я]* рыб)/.test(text)) return 'tropical_fish';
    return null;
  }

  function detectBudget(text) {
    const match = text.match(/(?:до|бюджет|не дороже|максимум)\s*(\d[\d\s]{1,8})/);
    if (!match) return null;
    const value = Number(match[1].replace(/\s/g, ''));
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  function detectAge(text) {
    if (/(котен|щен|до года|малыш)/.test(text)) return 'young';
    if (/(старше [57]|пожил|возрастн|стареньк|сеньор)/.test(text)) return 'senior';
    if (/(взросл|от года|обычный рацион)/.test(text)) return 'adult';
    return null;
  }

  function detectSterilized(text) {
    if (/(не стерилиз|не кастрир)/.test(text)) return false;
    if (/(стерилиз|кастрир)/.test(text)) return true;
    return null;
  }

  function profileDescription(pet) {
    const detailLabels = {
      hamster: 'хомяк', rat: 'декоративная крыса', guinea_pig: 'морская свинка', chinchilla: 'шиншилла',
      budgie: 'волнистый попугай', parrot: 'попугай', canary: 'канарейка',
      goldfish: 'золотые рыбки', tropical_fish: 'тропические рыбки', cichlid: 'цихлиды'
    };
    let petLabel = state.petDetail && detailLabels[state.petDetail]
      ? detailLabels[state.petDetail]
      : pet === 'dog' ? 'собака' : pet === 'ferret' ? 'хорёк' : pet === 'rodent' ? 'грызун' : pet === 'bird' ? 'птица' : pet === 'fish' ? 'рыбки' : 'кошка';
    if (state.age === 'young') petLabel = pet === 'dog' ? 'щенок' : pet === 'ferret' ? 'хорёк до года' : 'котёнок';
    if (state.age === 'adult') petLabel = pet === 'dog' ? 'взрослая собака' : pet === 'ferret' ? 'взрослый хорёк' : 'взрослая кошка';
    if (state.age === 'senior') petLabel = pet === 'dog' ? 'собака старше 7 лет' : pet === 'ferret' ? 'хорёк старше 5 лет' : 'кошка старше 7 лет';
    if (pet === 'cat' && state.sterilized === true && state.age !== 'young') petLabel = `${petLabel}, стерилизована`;
    if (pet === 'cat' && state.sterilized === false && state.age !== 'young') petLabel = `${petLabel}, не стерилизована`;
    const details = [petLabel];
    if (state.sensitive) details.push('чувствительное пищеварение');
    if (state.budget) details.push(`до ${rubles(state.budget)}`);
    return details.join(', ');
  }

  function productScore(product, { age, sterilized, sensitive, petDetail }) {
    let score = Number(product.rating.replace(',', '.'));
    if (age) {
      if (product.age === age) score += 5;
      else if (!product.age) score += 1;
      else score -= 5;
    }
    if (typeof sterilized === 'boolean') {
      if (product.sterilized === sterilized) score += 4;
      else if (product.sterilized == null) score += 1;
      else score -= 4;
    }
    if (sensitive && product.sensitive) score += 3;
    if (petDetail) {
      if (product.detail === petDetail) score += 5;
      else if (!product.detail) score += 1;
      else score -= 5;
    }
    return score;
  }

  function topProducts({ pet, categories, budget, age, sterilized, sensitive, petDetail, limit = 4 }) {
    return catalog
      .filter((product) => !pet || product.pet === pet || product.pet === 'any')
      .filter((product) => !categories?.length || categories.includes(product.category))
      .filter((product) => !petDetail || !product.detail || product.detail === petDetail)
      .filter((product) => !budget || product.price <= budget)
      .sort((a, b) => productScore(b, { age, sterilized, sensitive, petDetail }) - productScore(a, { age, sterilized, sensitive, petDetail }) || a.price - b.price)
      .slice(0, limit)
      .map((product) => product.id);
  }

  function lastRecommendedProducts() {
    const recommendations = [...state.messages].reverse().filter((message) => message.role === 'assistant' && message.products?.length);
    const previous = recommendations.find((message) => message.products.length > 1) || recommendations[0];
    return (previous?.products || []).map((id) => productById[id]).filter(Boolean);
  }

  function replyFor(rawText) {
    const text = normalize(rawText);
    const detectedPet = detectPet(text);
    const detectedDetail = detectPetDetail(text);
    if (detectedPet && state.pet && detectedPet !== state.pet) {
      state.petDetail = null;
      state.age = null;
      state.sterilized = null;
      state.sensitive = false;
      state.budget = null;
      state.noBudget = false;
      state.profileComplete = false;
      state.pendingQuestion = null;
    }
    if (detectedPet) state.pet = detectedPet;
    if (detectedDetail && state.petDetail && detectedDetail !== state.petDetail) {
      state.age = null;
      state.sterilized = null;
      state.sensitive = false;
      state.budget = null;
      state.noBudget = false;
      state.profileComplete = false;
      state.pendingQuestion = null;
    }
    if (detectedDetail) state.petDetail = detectedDetail;
    if (detectedPet && ['ferret', 'rodent', 'bird', 'fish'].includes(detectedPet) && !['dry_food', 'wet_food'].includes(state.lastIntent)) state.lastIntent = 'dry_food';
    const pet = detectedPet || state.pet;
    const detectedAge = detectAge(text);
    const detectedSterilized = detectSterilized(text);
    const detectedBudget = detectBudget(text);
    if (detectedAge) state.age = detectedAge;
    if (typeof detectedSterilized === 'boolean') state.sterilized = detectedSterilized;
    if (detectedBudget) {
      state.budget = detectedBudget;
      state.noBudget = false;
    }
    if (/(бюджет не важен|без ограничений|цена не важна)/.test(text)) {
      state.budget = null;
      state.noBudget = true;
    }
    if (/(чувствительн|аллерги|пищеварен|беззернов)/.test(text)) state.sensitive = true;
    const budget = detectedBudget || state.budget;
    const skipQuestions = /(без уточн|показать сразу|неважно|не важно)/.test(text);

    if (/(привет|здравств|добрый день|добрый вечер)/.test(text)) {
      return { text: 'Здравствуйте! Что подбираем и для какого питомца?', products: [], quick: defaultQuick };
    }

    if (/(кров|судорог|задыха|тяжело дыш|отрав|не ест|рвет|рвот|лекар|таблет|диагноз|лечение)/.test(text)) {
      return {
        text: 'С такими симптомами безопаснее обратиться к ветеринарному врачу. Я не ставлю диагнозы и не подбираю лекарства. Если состояние острое — лучше связаться с ближайшей круглосуточной клиникой прямо сейчас.',
        products: [],
        quick: ['Найти товары для ухода', 'Подобрать обычный корм']
      };
    }

    if (/(спасибо|благодарю|понятно|отлично)/.test(text)) {
      return {
        text: 'Пожалуйста! Могу ещё сравнить показанные варианты, выбрать самый выгодный или собрать к корму небольшой комплект.',
        products: [],
        quick: ['Какой выбрать?', 'Показать самый недорогой', 'Собрать набор к корму']
      };
    }

    if (/(какой выбрать|что лучше|посоветуй один|выбери один)/.test(text)) {
      const [best] = lastRecommendedProducts();
      if (best) {
        const distinction = best.note ? best.note.toLowerCase() : 'высокий рейтинг и хорошее соотношение цены и качества';
        return {
          text: `Если нужен один вариант, я бы начал с «${best.title}». У него рейтинг ${best.rating}, а главное отличие — ${distinction}.`,
          products: [best.id],
          quick: ['Показать самый недорогой', 'Собрать набор к корму']
        };
      }
    }

    if (/(подешевле|самый недорог|самый дешев)/.test(text)) {
      const cheapest = lastRecommendedProducts().sort((a, b) => a.price - b.price)[0];
      if (cheapest) {
        const distinction = cheapest.note ? cheapest.note.toLowerCase() : 'хорошее соотношение цены и качества';
        return {
          text: `Самый доступный из показанных — «${cheapest.title}» за ${rubles(cheapest.price)}. Его главное отличие — ${distinction}.`,
          products: [cheapest.id],
          quick: ['Показать корм ещё раз', 'Собрать набор к корму']
        };
      }
    }

    const wantsLitter = /(наполнител|лоток|совок|туалет)/.test(text);
    const wantsWet = /(влажн|пауч|консерв)/.test(text);
    const wantsFood = /(корм|питани|рацион|есть)/.test(text);
    const wantsToy = /(игруш|мяч|игр)/.test(text);
    const wantsBundle = /(набор|вместе|дополн|комплект)/.test(text);

    if ((wantsFood || wantsWet) && !pet) {
      state.lastIntent = wantsBundle ? 'food_bundle' : wantsWet ? 'wet_food' : 'dry_food';
      state.pendingQuestion = 'pet';
      return { text: 'Конечно, помогу. Для кого выбираем?', products: [], quick: defaultQuick };
    }

    if (wantsLitter || (wantsBundle && state.lastIntent === 'litter')) {
      state.pet = 'cat';
      state.lastIntent = 'litter';
      const base = topProducts({ pet: 'cat', categories: ['litter'], budget, limit: 1 });
      const bundleOrder = ['high-cat-tray', 'litter-scoop', 'catnip-ball'];
      const additions = bundleOrder.filter((id) => !budget || productById[id].price <= budget);
      const products = [...base, ...additions];
      return {
        text: budget && !base.length
          ? `В демонстрационном каталоге нет наполнителя до ${rubles(budget)}. Покажу полезные дополнения к лотку.`
          : 'Собрал удобный комплект: наполнитель, высокий лоток, совок и игрушку для кошки.',
        products,
        quick: ['Только наполнитель', 'Показать игрушку кошке']
      };
    }

    if (wantsToy) {
      state.lastIntent = 'toy';
      const products = topProducts({ pet: pet || 'cat', categories: ['toy'], budget });
      return products.length
        ? { text: 'Вот компактная игрушка с высоким рейтингом. Она подойдёт для самостоятельной активности кошки.', products, quick: ['Добавить товары для ухода'] }
        : { text: 'В демо-каталоге пока есть игрушка только для кошки. Для собак расширим выбор на следующем этапе.', products: [], quick: ['Показать корм для собаки'] };
    }

    if (wantsBundle || state.lastIntent === 'food_bundle') {
      const bundlePet = pet || 'cat';
      state.lastIntent = 'food_bundle';
      const products = topProducts({ pet: bundlePet, categories: ['bowl', 'mat', 'wet_food', 'toy'], budget, limit: 4 });
      return {
        text: bundlePet === 'cat'
          ? 'К сухому корму рекомендую миску, защитный коврик, влажный рацион и игрушку. Можно добавить только нужное.'
          : 'К сухому корму рекомендую устойчивую миску и коврик под неё. Собачьи игрушки добавим в полный каталог.',
        products,
        quick: ['Показать корм', 'Набор к наполнителю']
      };
    }

    if (wantsFood || wantsWet || state.lastIntent === 'dry_food' || state.lastIntent === 'wet_food') {
      const category = wantsWet || state.lastIntent === 'wet_food' ? 'wet_food' : 'dry_food';
      state.lastIntent = category;

      if (!state.profileComplete && !skipQuestions) {
        if (pet === 'rodent' && !state.petDetail) {
          state.pendingQuestion = 'pet_detail';
          return { text: 'Понял, корм нужен грызуну. Кто у вас?', products: [], quick: ['Хомяк', 'Декоративная крыса', 'Морская свинка', 'Шиншилла', 'Показать без уточнений'] };
        }
        if (pet === 'bird' && !state.petDetail) {
          state.pendingQuestion = 'pet_detail';
          return { text: 'Понял, корм нужен птице. Уточните вид — так подборка будет точнее.', products: [], quick: ['Волнистый попугай', 'Средний попугай', 'Канарейка', 'Показать без уточнений'] };
        }
        if (pet === 'fish' && !state.petDetail) {
          state.pendingQuestion = 'pet_detail';
          return { text: 'Понял, корм нужен рыбкам. Какие рыбки живут в аквариуме?', products: [], quick: ['Тропические рыбки', 'Золотые рыбки', 'Цихлиды', 'Показать без уточнений'] };
        }
        if (!state.age && ['cat', 'dog', 'ferret'].includes(pet)) {
        state.pendingQuestion = 'age';
        if (pet === 'cat') {
          return {
              text: 'Хорошо. Уточню один момент, чтобы не показывать случайный корм: кошка взрослая, котёнок или старше 7 лет? Она стерилизована?',
              products: [],
              quick: ['Взрослая, стерилизована', 'Взрослая, не стерилизована', 'Котёнок', 'Старше 7 лет', 'Показать без уточнений']
            };
        }
        if (pet === 'ferret') {
          return {
            text: 'Понял, корм нужен хорьку. Уточню возраст: он взрослый, младше года или старше 5 лет?',
            products: [],
            quick: ['Взрослый хорёк', 'Хорёк до года', 'Старше 5 лет', 'Показать без уточнений']
          };
        }
        return {
              text: 'Расскажите немного о питомце: это взрослая собака, щенок или собака старше 7 лет?',
              products: [],
              quick: ['Взрослая собака', 'Щенок', 'Старше 7 лет', 'Показать без уточнений']
            };
        }
      }

      if (!state.profileComplete && !skipQuestions && !state.budget && !state.noBudget) {
        state.pendingQuestion = 'budget';
        return {
          text: `Понял: ${profileDescription(pet)}. И последний вопрос — какой бюджет на одну упаковку?`,
          products: [],
          quick: ['До 1 000 ₽', 'До 1 500 ₽', 'До 2 000 ₽', 'До 3 000 ₽', 'Бюджет не важен']
        };
      }

      state.profileComplete = true;
      state.pendingQuestion = null;
      const products = topProducts({
        pet,
        categories: [category],
        budget,
        age: state.age,
        sterilized: state.sterilized,
        sensitive: state.sensitive,
        petDetail: state.petDetail,
        limit: 4
      });
      if (!products.length) {
        return {
          text: `В демонстрационном каталоге подходящего варианта${budget ? ` до ${rubles(budget)}` : ''} пока нет. Попробуйте увеличить бюджет или выбрать другую категорию.`,
          products: [],
          quick: pet === 'dog'
            ? ['Корм собаке без бюджета']
            : pet === 'ferret'
              ? ['Корм хорьку без бюджета', 'Другие товары для хорьков']
              : pet === 'rodent'
                ? ['Корм грызуну без бюджета', 'Другие товары для грызунов']
                : pet === 'bird'
                  ? ['Корм птице без бюджета', 'Другие товары для птиц']
                  : pet === 'fish'
                    ? ['Корм рыбкам без бюджета', 'Другие товары для рыбок']
              : ['Корм кошке без бюджета', 'Влажный корм кошке']
        };
      }
      const petName = pet === 'dog' ? 'собаки' : pet === 'ferret' ? 'хорька' : pet === 'rodent' ? 'грызуна' : pet === 'bird' ? 'птицы' : pet === 'fish' ? 'рыбок' : 'кошки';
      return {
        text: products.length === 1
          ? `Понял: ${profileDescription(pet)}. Пока нашёл один точный вариант для ${petName}. Можно изменить бюджет или параметры — тогда выбор станет шире.`
          : `Понял: ${profileDescription(pet)}. Нашёл ${products.length} разных варианта: от доступной небольшой упаковки до более специализированного рациона. Ниже видно, чем они отличаются.`,
        products,
        quick: pet === 'cat'
          ? ['Собрать набор к корму', 'Показать наполнитель']
          : pet === 'ferret'
            ? ['Показать самый недорогой', 'Другие товары для хорьков']
            : pet === 'rodent'
              ? ['Показать самый недорогой', 'Другие товары для грызунов']
              : pet === 'bird'
                ? ['Показать самый недорогой', 'Другие товары для птиц']
                : pet === 'fish'
                  ? ['Показать самый недорогой', 'Другие товары для рыбок']
            : ['Показать товары для кошки']
      };
    }

    if (pet) {
      const products = topProducts({ pet, budget, age: state.age, sterilized: state.sterilized, sensitive: state.sensitive, petDetail: state.petDetail, limit: 4 });
      return {
        text: `Вот популярные товары для ${pet === 'dog' ? 'собаки' : pet === 'ferret' ? 'хорька' : pet === 'rodent' ? 'грызуна' : pet === 'bird' ? 'птицы' : pet === 'fish' ? 'рыбок' : 'кошки'}${budget ? ` до ${rubles(budget)}` : ''}. Что хотите уточнить: корм, уход или аксессуары?`,
        products,
        quick: pet === 'dog'
          ? ['Сухой корм для собаки']
          : pet === 'ferret'
            ? ['Сухой корм для хорька', 'Другие товары для хорьков']
            : pet === 'rodent'
              ? ['Корм для грызуна', 'Другие товары для грызунов']
              : pet === 'bird'
                ? ['Корм для птицы', 'Другие товары для птиц']
                : pet === 'fish'
                  ? ['Корм для рыбок', 'Другие товары для рыбок']
            : ['Сухой корм для кошки', 'Набор к наполнителю']
      };
    }

    return {
      text: 'Я умею подбирать корм по виду питомца и бюджету, сравнивать варианты, находить самый доступный и добавлять товары в корзину. Напишите, например: «корм для хорька» или «корм волнистому попугаю до 1 000 ₽».',
      products: [],
      quick: defaultQuick
    };
  }

  function render(container, typing = false) {
    const history = state.messages.map((message) => {
      const productIds = Array.isArray(message.products) ? message.products.filter((id) => productById[id]) : [];
      const quick = Array.isArray(message.quick) ? message.quick : [];
      return `
        <div class="petshop-assistant__message petshop-assistant__message--${message.role}">${escapeHtml(message.text)}</div>
        ${productIds.length ? productList(productIds) : ''}
        ${quick.length ? `<div class="petshop-assistant__quick">${quick.map((label) => `<button type="button" data-pa-quick="${escapeHtml(label)}">${escapeHtml(label)}</button>`).join('')}</div>` : ''}`;
    }).join('');
    container.innerHTML = `<div class="petshop-assistant__day">Сегодня</div>${history}${typing ? '<div class="petshop-assistant__message petshop-assistant__message--assistant"><span class="petshop-assistant__typing" aria-label="Помощник печатает"><i></i><i></i><i></i></span></div>' : ''}`;
    scrollMessages(container);
  }

  function productList(ids) {
    return `<div class="petshop-assistant__products" aria-label="Рекомендованные товары">${ids.map((id) => {
      const product = productById[id];
      const productPage = product.pet === 'dog' ? 'dogs' : product.pet === 'cat' ? 'cats' : null;
      const productHref = product.href || `catalog.html${productPage ? `?page=${productPage}&` : '?'}product=${encodeURIComponent(product.id)}`;
      return `
        <article class="petshop-assistant-product">
          <a href="${escapeHtml(productHref)}" aria-label="Посмотреть ${escapeHtml(product.title)}" data-pa-product="${escapeHtml(product.id)}"><img class="petshop-assistant-product__image" src="assets/${encodeURIComponent(product.image)}" alt=""></a>
          <a class="petshop-assistant-product__title" href="${escapeHtml(productHref)}" data-pa-product="${escapeHtml(product.id)}">${escapeHtml(product.title)}</a>
          <div class="petshop-assistant-product__meta"><b>★ ${product.rating}</b><span>${reviewLabel(product.reviews)}</span></div>
          ${product.note ? `<div class="petshop-assistant-product__hint">${escapeHtml(product.note)}</div>` : ''}
          <div class="petshop-assistant-product__bottom"><span class="petshop-assistant-product__price">${rubles(product.price)}</span><button class="petshop-assistant-product__add" type="button" data-pa-add="${escapeHtml(product.id)}">В корзину</button></div>
        </article>`;
    }).join('')}</div>`;
  }

  function scrollMessages(container) {
    requestAnimationFrame(() => { container.scrollTop = container.scrollHeight; });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
