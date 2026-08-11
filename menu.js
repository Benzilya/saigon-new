const SAIGON_MENU=[
  {category:'Закуски',items:[['Нем',550,'250 г'],['Нем Том',650,'250 г'],['Нем Хайсан',690,'250 г'],['Нем Куон',680,'250 г'],['Димсам',650,'250 г'],['Дау',550,'200 г'],['Бань Бао',300,''],['Батат Фри',500,''],['Ассорти Немов',890,''],['Курица по-сайгонски',580,''],['Креветки Темпура',650,''],['Креветки по-сайгонски',680,''],['Креветки на гриле',680,'']]},
  {category:'Лапша',items:[['Бун Бо',700,'600 г'],['Бун Ча',700,'600 г'],['Фо Чон Вит',730,'600 г'],['Ми Том Ям',750,'500 г'],['Ми Сао (говядина)',700,'500 г'],['Ми Сао (курица)',650,'500 г'],['Ми Сао (морепродукты)',750,'500 г'],['Миен Сао (говядина)',680,'500 г'],['Миен Сао (курица)',620,'500 г'],['Миен Сао (морепродукты)',720,'500 г']]},
  {category:'Рис',items:[['Ком Бо Бит Тет',700,'350 г'],['Ком Га по-сайгонски',650,'350 г'],['Ком Вит Сот',730,'350 г'],['Ком Том Сот',730,'350 г']]},
  {category:'Суп',items:[['Том Ям',630,'700 г'],['Фо Вит',700,'700 г'],['Бун Хайсан',650,'700 г'],['Фо Бо',550,'700 г'],['Фо Тайлан',650,'700 г'],['Фо Га',550,'700 г']]},
  {category:'Десерт',items:[['Манго Саго',450,''],['Соевый пуддинг с тапиокой',300,''],['Моти (в ассортименте)',250,''],['Мороженое (в ассортименте)',350,'']]},
  {category:'Салат',items:[['Ном Бо',600,'300 г'],['Ном Хоай',650,'300 г'],['Салат Бо',650,'300 г']]}
];

const FEATURED_DISHES=[
  {name:'Фо Бо',category:'Суп',price:550,weight:'700 г',note:'Большая порция вьетнамской классики',className:'featured-pho',badge:'Хит',image:'assets/menu/pho-bo.webp',ingredients:'Рисовая лапша, говядина, ароматный говяжий бульон, лук, свежая зелень и лайм.'},
  {name:'Том Ям',category:'Суп',price:630,weight:'700 г',note:'Яркий, пряный и насыщенный',className:'featured-tom',badge:'Острое',image:'assets/menu/tom-yam.webp',ingredients:'Креветки, грибы, пряный бульон том ям, кокосовая основа, лемонграсс, лайм, чили и свежая зелень.'},
  {name:'Бун Ча',category:'Лапша',price:700,weight:'600 г',note:'Один из самых узнаваемых вкусов Вьетнама',className:'featured-bun',badge:'Хит',image:'assets/menu/bun-cha.webp',ingredients:'Рисовая лапша бун, свинина на гриле, свежая зелень, овощи и кисло-сладкий соус.'},
  {name:'Нем Хайсан',category:'Закуски',price:690,weight:'250 г',note:'Хрустящая закуска с морепродуктами',className:'featured-nem',badge:'Для компании',image:'assets/menu/nem-haisan.webp',ingredients:'Хрустящие роллы с морепродуктами и овощной начинкой, свежая зелень и соус для подачи.'},
  {name:'Ком Том Сот',category:'Рис',price:730,weight:'350 г',note:'Креветки, рис и насыщенный соус',className:'featured-rice',badge:'Популярное',image:'assets/menu/com-tom-sot.webp',ingredients:'Рис, креветки, овощи, зелёный лук и соус в азиатском стиле.'}
];

const menuSection=document.querySelector('.menu-section');
if(menuSection){
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior=reduceMotion?'auto':'smooth';
  const shell=menuSection.querySelector('.shell');
  const total=SAIGON_MENU.reduce((sum,group)=>sum+group.items.length,0);
  const popularNames=new Set(FEATURED_DISHES.map(dish=>dish.name));

  shell.innerHTML=`
    <div class="section-head menu-heading">
      <div><p class="eyebrow">Актуальное меню</p><h2 id="menu-title">Что хочется сегодня?</h2></div>
      <a class="text-link" href="https://yandex.ru/maps/org/saygon/105448387404/menu/?ll=37.867304%2C55.917370&z=17" target="_blank" rel="noopener">Сверить на Яндекс Картах →</a>
    </div>
    <p class="section-intro menu-intro">Сначала — блюда, с которых удобно познакомиться с Saigon VN. Ниже можно быстро выбрать категорию или найти конкретное блюдо среди ${total} позиций.</p>
    <div class="featured-menu" aria-label="Популярные блюда">
      ${FEATURED_DISHES.map((dish,index)=>`<article class="featured-dish ${dish.className}${index===0?' featured-dish-main':''}" role="button" tabindex="0" aria-expanded="false" aria-label="${dish.name}: показать ингредиенты"><img class="featured-dish-image" src="${dish.image}" alt="${dish.name} — блюдо Saigon VN" loading="${index===0?'eager':'lazy'}" decoding="async"><div class="featured-dish-shade"></div><div class="card-steam" aria-hidden="true"><i></i><i></i><i></i></div><div class="featured-dish-content"><div class="featured-topline"><span>${dish.badge}</span><span>${dish.category}</span></div><div class="featured-summary"><h3>${dish.name}</h3><p>${dish.note}</p><div class="featured-price"><strong>${dish.price.toLocaleString('ru-RU')} ₽</strong>${dish.weight?`<span>${dish.weight}</span>`:''}</div><span class="featured-tap-hint">Состав блюда</span></div></div><div class="featured-details" aria-hidden="true"><button class="featured-close" type="button" aria-label="Закрыть состав">×</button><span class="featured-details-kicker">Основные ингредиенты</span><h4>${dish.name}</h4><p>${dish.ingredients}</p><small>Точный состав, способ приготовления и аллергены уточняйте у ресторана.</small></div></article>`).join('')}
    </div>
    <div class="menu-browser" aria-label="Полное меню">
      <div class="menu-browser-head">
        <div><p class="eyebrow">Все блюда</p><h3>Найдите своё</h3></div>
        <div class="menu-meta"><span>${total} позиций</span><span>${SAIGON_MENU.length} категорий</span></div>
      </div>
      <label class="menu-search"><span class="menu-search-icon" aria-hidden="true">⌕</span><input type="search" placeholder="Поиск: Фо Бо, Нем, Том Ям…" autocomplete="off" aria-label="Поиск по меню"><button type="button" class="menu-search-clear" aria-label="Очистить поиск" hidden>×</button></label>
      <div class="menu-tabs" role="tablist" aria-label="Категории меню"></div>
      <div class="menu-results" aria-live="polite"></div>
    </div>
    <div class="menu-source"><p><strong>Источник меню:</strong> карточка Saigon VN на Яндекс Картах. Если ресторан обновит цены раньше сайта, ориентируйтесь на карточку Яндекса.</p><a class="btn btn-ghost" href="https://yandex.ru/maps/org/saygon/105448387404/menu/?ll=37.867304%2C55.917370&z=17" target="_blank" rel="noopener">Открыть оригинал</a></div>`;

  const featuredCards=[...shell.querySelectorAll('.featured-dish')];
  const setCardState=(card,open)=>{card.classList.toggle('is-active',open);card.setAttribute('aria-expanded',String(open));const details=card.querySelector('.featured-details');if(details)details.setAttribute('aria-hidden',String(!open));};
  const closeAllCards=()=>featuredCards.forEach(card=>setCardState(card,false));
  const toggleCard=(card)=>{const open=!card.classList.contains('is-active');closeAllCards();setCardState(card,open);};
  featuredCards.forEach(card=>{
    card.addEventListener('click',event=>{if(event.target.closest('.featured-close')){event.stopPropagation();setCardState(card,false);card.focus();return;}toggleCard(card);});
    card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleCard(card);}if(event.key==='Escape'){event.preventDefault();setCardState(card,false);}});
  });
  document.addEventListener('pointerdown',event=>{if(!event.target.closest('.featured-dish'))closeAllCards();});

  const tabs=shell.querySelector('.menu-tabs');
  const results=shell.querySelector('.menu-results');
  const searchInput=shell.querySelector('.menu-search input');
  const clearButton=shell.querySelector('.menu-search-clear');
  const categories=['Все','Популярное',...SAIGON_MENU.map(group=>group.category)];
  let activeCategory='Все';

  const flattenMenu=()=>SAIGON_MENU.flatMap(group=>group.items.map(([name,price,weight])=>({name,price,weight,category:group.category,popular:popularNames.has(name)})));
  const allItems=flattenMenu();

  const renderResults=()=>{
    const query=searchInput.value.trim().toLocaleLowerCase('ru-RU');
    const filtered=allItems.filter(item=>{
      const categoryMatch=activeCategory==='Все'||(activeCategory==='Популярное'&&item.popular)||item.category===activeCategory;
      const searchMatch=!query||`${item.name} ${item.category}`.toLocaleLowerCase('ru-RU').includes(query);
      return categoryMatch&&searchMatch;
    });
    clearButton.hidden=!query;
    if(!filtered.length){results.innerHTML=`<div class="menu-empty"><strong>Ничего не нашли</strong><p>Попробуйте другое название или выберите «Все».</p></div>`;return;}
    const grouped=filtered.reduce((acc,item)=>{(acc[item.category]??=[]).push(item);return acc;},{});
    results.innerHTML=Object.entries(grouped).map(([category,items])=>`<section class="menu-group"><div class="menu-panel-head"><p>${category}</p><span>${items.length} ${items.length===1?'позиция':'позиций'}</span></div><div class="menu-list">${items.map(item=>`<article class="menu-item${item.popular?' is-popular':''}"><div class="menu-item-copy"><div class="menu-item-title"><h4>${item.name}</h4>${item.popular?'<span class="menu-badge">Хит</span>':''}</div><p>${item.weight||item.category}</p></div><strong>${item.price.toLocaleString('ru-RU')} ₽</strong></article>`).join('')}</div></section>`).join('');
  };

  categories.forEach((category,index)=>{
    const button=document.createElement('button');
    button.type='button';
    button.className=`menu-tab${index===0?' active':''}`;
    button.textContent=category;
    button.setAttribute('role','tab');
    button.setAttribute('aria-selected',String(index===0));
    button.tabIndex=index===0?0:-1;
    button.addEventListener('click',()=>{
      activeCategory=category;
      tabs.querySelectorAll('.menu-tab').forEach(tab=>{const active=tab===button;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
      renderResults();
      results.scrollIntoView({behavior:scrollBehavior,block:'nearest'});
    });
    tabs.appendChild(button);
  });

  tabs.addEventListener('keydown',event=>{
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
    event.preventDefault();
    const allTabs=[...tabs.querySelectorAll('.menu-tab')];
    const current=allTabs.indexOf(document.activeElement);
    let next=current<0?0:current;
    if(event.key==='ArrowRight')next=(next+1)%allTabs.length;
    if(event.key==='ArrowLeft')next=(next-1+allTabs.length)%allTabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=allTabs.length-1;
    allTabs[next].click();
    allTabs[next].focus({preventScroll:true});
    allTabs[next].scrollIntoView({behavior:scrollBehavior,block:'nearest',inline:'center'});
  });

  searchInput.addEventListener('input',renderResults);
  clearButton.addEventListener('click',()=>{searchInput.value='';searchInput.focus();renderResults();});
  renderResults();
}
