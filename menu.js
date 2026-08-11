const SAIGON_MENU=[
  {category:'Закуски',items:[['Нем',550,'250 г'],['Нем Том',650,'250 г'],['Нем Хайсан',690,'250 г'],['Нем Куон',680,'250 г'],['Димсам',650,'250 г'],['Дау',550,'200 г'],['Бань Бао',300,''],['Батат Фри',500,''],['Ассорти Немов',890,''],['Курица по-сайгонски',580,''],['Креветки Темпура',650,''],['Креветки по-сайгонски',680,''],['Креветки на гриле',680,'']]},
  {category:'Лапша',items:[['Бун Бо',700,'600 г'],['Бун Ча',700,'600 г'],['Фо Чон Вит',730,'600 г'],['Ми Том Ям',750,'500 г'],['Ми Сао (говядина)',700,'500 г'],['Ми Сао (курица)',650,'500 г'],['Ми Сао (морепродукты)',750,'500 г'],['Миен Сао (говядина)',680,'500 г'],['Миен Сао (курица)',620,'500 г'],['Миен Сао (морепродукты)',720,'500 г']]},
  {category:'Рис',items:[['Ком Бо Бит Тет',700,'350 г'],['Ком Га по-сайгонски',650,'350 г'],['Ком Вит Сот',730,'350 г'],['Ком Том Сот',730,'350 г']]},
  {category:'Суп',items:[['Том Ям',630,'700 г'],['Фо Вит',700,'700 г'],['Бун Хайсан',650,'700 г'],['Фо Бо',550,'700 г'],['Фо Тайлан',650,'700 г'],['Фо Га',550,'700 г']]},
  {category:'Десерт',items:[['Манго Саго',450,''],['Соевый пуддинг с тапиокой',300,''],['Моти (в ассортименте)',250,''],['Мороженое (в ассортименте)',350,'']]},
  {category:'Салат',items:[['Ном Бо',600,'300 г'],['Ном Хоай',650,'300 г'],['Салат Бо',650,'300 г']]}
];

const DISH_DETAILS={
  'Фо Бо':{image:'assets/menu/pho-bo.webp',badge:'Классика',description:'Большая порция вьетнамской классики на ароматном говяжьем бульоне.',ingredients:['Рисовая лапша','Говядина','Говяжий бульон','Лук','Свежая зелень','Лайм']},
  'Том Ям':{image:'assets/menu/tom-yam.webp',badge:'Острое',description:'Яркий, пряный и насыщенный суп с морепродуктами.',ingredients:['Креветки','Грибы','Бульон том ям','Кокосовая основа','Лемонграсс','Лайм','Чили','Свежая зелень']},
  'Фо Вит':{image:'assets/menu/pho-vit.webp',badge:'Вьетнам',description:'Ароматный суп с уткой, рисовой лапшой и свежей зеленью.',ingredients:['Рисовая лапша','Утка','Бульон','Лук','Свежая зелень','Лайм']},
  'Бун Ча':{image:'assets/menu/bun-cha.webp',badge:'Хит',description:'Один из самых узнаваемых вкусов Вьетнама: лапша, мясо на гриле и свежая зелень.',ingredients:['Рисовая лапша бун','Свинина на гриле','Свежая зелень','Овощи','Кисло-сладкий соус']},
  'Нем Хайсан':{image:'assets/menu/nem-haisan.webp',badge:'Для компании',description:'Хрустящая закуска с морепродуктами и овощной начинкой.',ingredients:['Морепродукты','Овощная начинка','Хрустящая оболочка','Свежая зелень','Соус для подачи']},
  'Ком Том Сот':{image:'assets/menu/com-tom-sot.webp',badge:'Популярное',description:'Креветки, рис и насыщенный соус в азиатском стиле.',ingredients:['Рис','Креветки','Овощи','Зелёный лук','Азиатский соус']}
};

const FEATURED_NAMES=['Фо Бо','Нем Хайсан','Том Ям','Ком Том Сот','Бун Ча'];
const CATEGORY_COPY={
  'Закуски':'Закуски и блюда для начала трапезы.',
  'Лапша':'Блюда с рисовой и стеклянной лапшой.',
  'Рис':'Сытные блюда на основе риса.',
  'Суп':'Вьетнамские и азиатские супы большими порциями.',
  'Десерт':'Сладкое завершение ужина.',
  'Салат':'Свежие салаты в азиатском стиле.'
};

const menuSection=document.querySelector('.menu-section');
if(menuSection){
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior=reduceMotion?'auto':'smooth';
  const shell=menuSection.querySelector('.shell');
  const total=SAIGON_MENU.reduce((sum,group)=>sum+group.items.length,0);
  const allItems=SAIGON_MENU.flatMap(group=>group.items.map(([name,price,weight])=>({name,price,weight,category:group.category,detail:DISH_DETAILS[name]||null})));
  const featured=FEATURED_NAMES.map(name=>allItems.find(item=>item.name===name)).filter(Boolean);

  const cardMarkup=item=>{
    const detail=item.detail;
    return `<button class="menu-feature-card" type="button" data-dish="${item.name}" aria-label="Открыть ${item.name}">${detail?.image?`<img src="${detail.image}" alt="${item.name} — иллюстрация блюда Saigon VN" loading="lazy" decoding="async">`:''}<span class="menu-feature-shade"></span><span class="menu-feature-top">${detail?.badge||item.category}</span><span class="menu-feature-copy"><strong>${item.name}</strong><small>${detail?.description||CATEGORY_COPY[item.category]}</small><span><b>${item.price.toLocaleString('ru-RU')} ₽</b>${item.weight?`<em>${item.weight}</em>`:''}</span></span></button>`;
  };

  shell.innerHTML=`
    <div class="menu-topline">
      <div><p class="eyebrow">Меню</p><h2 id="menu-title">Попробуйте наши хиты</h2><p class="section-intro">Самые интересные позиции Saigon VN — и полное меню, которое можно раскрыть только когда оно понадобится.</p></div>
      <div class="menu-top-actions"><span class="menu-count">${total} позиций</span><button class="btn btn-primary menu-toggle-full" type="button" aria-expanded="false" aria-controls="full-menu-panel">Показать полное меню <span aria-hidden="true">⌄</span></button></div>
    </div>
    <div class="menu-feature-toolbar"><strong>Популярные блюда</strong><div><button class="menu-carousel-arrow prev" type="button" aria-label="Предыдущие блюда">‹</button><button class="menu-carousel-arrow next" type="button" aria-label="Следующие блюда">›</button></div></div>
    <div class="menu-feature-viewport"><div class="menu-feature-track">${featured.map(cardMarkup).join('')}</div></div>
    <div class="full-menu-panel" id="full-menu-panel" hidden>
      <div class="menu-workspace">
        <div class="menu-list-pane">
          <div class="menu-list-head"><h3>Полное меню</h3><button class="menu-collapse" type="button" aria-label="Скрыть полное меню">Скрыть <span aria-hidden="true">⌃</span></button></div>
          <label class="menu-search"><span aria-hidden="true">⌕</span><input type="search" placeholder="Поиск по меню…" autocomplete="off" aria-label="Поиск по меню"><button class="menu-search-clear" type="button" aria-label="Очистить поиск" hidden>×</button></label>
          <div class="menu-tabs" role="tablist" aria-label="Категории меню"></div>
          <div class="menu-results" aria-live="polite"></div>
        </div>
        <aside class="dish-detail" aria-live="polite"></aside>
      </div>
    </div>
    <div class="menu-source"><p><strong>Источник меню:</strong> карточка Saigon VN на Яндекс Картах. Точный состав и аллергены лучше уточнить у ресторана.</p><a class="text-link" href="https://yandex.ru/maps/org/saygon/105448387404/menu/?ll=37.867304%2C55.917370&z=17" target="_blank" rel="noopener">Сверить меню →</a></div>`;

  const fullPanel=shell.querySelector('.full-menu-panel');
  const toggleFull=shell.querySelector('.menu-toggle-full');
  const collapse=shell.querySelector('.menu-collapse');
  const tabs=shell.querySelector('.menu-tabs');
  const results=shell.querySelector('.menu-results');
  const detailPanel=shell.querySelector('.dish-detail');
  const searchInput=shell.querySelector('.menu-search input');
  const searchClear=shell.querySelector('.menu-search-clear');
  const featureTrack=shell.querySelector('.menu-feature-track');
  let activeCategory='Суп';
  let selectedName='Фо Бо';

  const openMenu=(focus=false)=>{
    fullPanel.hidden=false;
    requestAnimationFrame(()=>fullPanel.classList.add('is-open'));
    toggleFull.setAttribute('aria-expanded','true');
    toggleFull.innerHTML='Скрыть полное меню <span aria-hidden="true">⌃</span>';
    if(focus)setTimeout(()=>fullPanel.scrollIntoView({behavior,block:'start'}),60);
  };
  const closeMenu=()=>{
    fullPanel.classList.remove('is-open');
    toggleFull.setAttribute('aria-expanded','false');
    toggleFull.innerHTML='Показать полное меню <span aria-hidden="true">⌄</span>';
    setTimeout(()=>{if(!fullPanel.classList.contains('is-open'))fullPanel.hidden=true;},reduceMotion?0:220);
  };
  toggleFull.addEventListener('click',()=>fullPanel.hidden?openMenu(true):closeMenu());
  collapse.addEventListener('click',()=>{closeMenu();toggleFull.focus({preventScroll:true});});

  const renderDetail=item=>{
    selectedName=item.name;
    const d=item.detail;
    detailPanel.innerHTML=`
      <div class="dish-detail-media ${d?.image?'has-image':'no-image'}">${d?.image?`<img src="${d.image}" alt="${item.name} — иллюстрация блюда Saigon VN" decoding="async">`:`<div class="dish-photo-placeholder"><span>SAIGON VN</span><strong>${item.category}</strong><small>Фото блюда скоро появится</small></div>`}</div>
      <div class="dish-detail-body"><div class="dish-detail-title"><div><p class="eyebrow">${item.category}</p><h3>${item.name}</h3></div><strong>${item.price.toLocaleString('ru-RU')} ₽</strong></div>
      <div class="dish-detail-meta">${item.weight?`<span>${item.weight}</span>`:''}${d?.badge?`<span>${d.badge}</span>`:''}</div>
      <p class="dish-description">${d?.description||CATEGORY_COPY[item.category]}</p>
      <div class="dish-composition"><strong>Состав</strong>${d?.ingredients?.length?`<div>${d.ingredients.map(ingredient=>`<span>${ingredient}</span>`).join('')}</div>`:'<p>Точный состав этой позиции пока не внесён на сайт. Уточните ингредиенты и аллергены у ресторана.</p>'}</div></div>`;
    results.querySelectorAll('.menu-row').forEach(row=>row.classList.toggle('is-selected',row.dataset.dish===item.name));
  };

  const renderResults=()=>{
    const q=searchInput.value.trim().toLocaleLowerCase('ru-RU');
    const items=q?allItems.filter(item=>`${item.name} ${item.category}`.toLocaleLowerCase('ru-RU').includes(q)):allItems.filter(item=>item.category===activeCategory);
    searchClear.hidden=!q;
    if(!items.length){results.innerHTML='<div class="menu-empty"><strong>Ничего не нашли</strong><p>Попробуйте другое название блюда.</p></div>';return;}
    results.innerHTML=`<div class="menu-category-head"><div><strong>${q?'Результаты поиска':activeCategory}</strong><small>${q?'По всему меню':CATEGORY_COPY[activeCategory]}</small></div><span>${items.length} поз.</span></div><div class="menu-row-list">${items.map(item=>`<button class="menu-row${item.name===selectedName?' is-selected':''}" type="button" data-dish="${item.name}"><span class="menu-row-thumb">${item.detail?.image?`<img src="${item.detail.image}" alt="" loading="lazy">`:'<i aria-hidden="true">•</i>'}</span><span class="menu-row-copy"><strong>${item.name}</strong><small>${item.detail?.description||CATEGORY_COPY[item.category]}</small></span>${item.weight?`<span class="menu-row-weight">${item.weight}</span>`:''}<b>${item.price.toLocaleString('ru-RU')} ₽</b><span class="menu-row-arrow" aria-hidden="true">›</span></button>`).join('')}</div>`;
    results.querySelectorAll('.menu-row').forEach(row=>row.addEventListener('click',()=>{const item=allItems.find(x=>x.name===row.dataset.dish);if(item)renderDetail(item);}));
  };

  SAIGON_MENU.forEach((group,index)=>{
    const button=document.createElement('button');
    button.type='button';button.className=`menu-tab${group.category===activeCategory?' active':''}`;button.textContent=group.category;button.setAttribute('role','tab');button.setAttribute('aria-selected',String(group.category===activeCategory));button.tabIndex=group.category===activeCategory?0:-1;
    button.addEventListener('click',()=>{activeCategory=group.category;searchInput.value='';tabs.querySelectorAll('.menu-tab').forEach(tab=>{const on=tab===button;tab.classList.toggle('active',on);tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1;});renderResults();const first=allItems.find(item=>item.category===activeCategory);if(first)renderDetail(first);});
    tabs.appendChild(button);
  });
  tabs.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const all=[...tabs.querySelectorAll('.menu-tab')];let index=all.indexOf(document.activeElement);if(event.key==='ArrowRight')index=(index+1)%all.length;if(event.key==='ArrowLeft')index=(index-1+all.length)%all.length;if(event.key==='Home')index=0;if(event.key==='End')index=all.length-1;all[index].click();all[index].focus({preventScroll:true});});
  searchInput.addEventListener('input',renderResults);
  searchClear.addEventListener('click',()=>{searchInput.value='';searchInput.focus();renderResults();});

  shell.querySelectorAll('.menu-feature-card').forEach(card=>card.addEventListener('click',()=>{const item=allItems.find(x=>x.name===card.dataset.dish);if(!item)return;activeCategory=item.category;searchInput.value='';tabs.querySelectorAll('.menu-tab').forEach(tab=>{const on=tab.textContent===activeCategory;tab.classList.toggle('active',on);tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1;});renderResults();renderDetail(item);openMenu(true);}));

  const scrollFeatures=direction=>{const card=featureTrack.querySelector('.menu-feature-card');featureTrack.scrollBy({left:direction*((card?.getBoundingClientRect().width||320)+16),behavior});};
  shell.querySelector('.menu-carousel-arrow.prev').addEventListener('click',()=>scrollFeatures(-1));
  shell.querySelector('.menu-carousel-arrow.next').addEventListener('click',()=>scrollFeatures(1));

  renderResults();
  renderDetail(allItems.find(item=>item.name===selectedName)||allItems[0]);
}
