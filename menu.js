const SAIGON_MENU=[{category:'Закуски',items:[['Нем',550,'250 г'],['Нем Том',650,'250 г'],['Нем Хайсан',690,'250 г'],['Нем Куон',680,'250 г'],['Димсам',650,'250 г'],['Дау',550,'200 г'],['Бань Бао',300,''],['Батат Фри',500,''],['Ассорти Немов',890,''],['Курица по-сайгонски',580,''],['Креветки Темпура',650,''],['Креветки по-сайгонски',680,''],['Креветки на гриле',680,'']]},{category:'Лапша',items:[['Бун Бо',700,'600 г'],['Бун Ча',700,'600 г'],['Фо Чон Вит',730,'600 г'],['Ми Том Ям',750,'500 г'],['Ми Сао (говядина)',700,'500 г'],['Ми Сао (курица)',650,'500 г'],['Ми Сао (морепродукты)',750,'500 г'],['Миен Сао (говядина)',680,'500 г'],['Миен Сао (курица)',620,'500 г'],['Миен Сао (морепродукты)',720,'500 г']]},{category:'Рис',items:[['Ком Бо Бит Тет',700,'350 г'],['Ком Га по-сайгонски',650,'350 г'],['Ком Вит Сот',730,'350 г'],['Ком Том Сот',730,'350 г']]},{category:'Суп',items:[['Том Ям',630,'700 г'],['Фо Вит',700,'700 г'],['Бун Хайсан',650,'700 г'],['Фо Бо',550,'700 г'],['Фо Тайлан',650,'700 г'],['Фо Га',550,'700 г']]},{category:'Десерт',items:[['Манго Саго',450,''],['Соевый пуддинг с тапиокой',300,''],['Моти (в ассортименте)',250,''],['Мороженое (в ассортименте)',350,'']]},{category:'Салат',items:[['Ном Бо',600,'300 г'],['Ном Хоай',650,'300 г'],['Салат Бо',650,'300 г']]}];

const menuRoot=document.querySelector('[data-menu-root]');
if(menuRoot){
  const tabs=document.createElement('div');
  const panels=document.createElement('div');
  tabs.className='menu-tabs';
  tabs.setAttribute('role','tablist');
  tabs.setAttribute('aria-label','Категории меню');
  panels.className='menu-panels';

  const activate=(targetTab,targetPanel,focus=false)=>{
    tabs.querySelectorAll('.menu-tab').forEach((tab)=>{
      const active=tab===targetTab;
      tab.classList.toggle('active',active);
      tab.setAttribute('aria-selected',String(active));
      tab.tabIndex=active?0:-1;
    });
    panels.querySelectorAll('.menu-panel').forEach((panel)=>{
      const active=panel===targetPanel;
      panel.classList.toggle('active',active);
      panel.hidden=!active;
    });
    if(focus){
      targetTab.focus({preventScroll:true});
      targetTab.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
    }
  };

  SAIGON_MENU.forEach((group,index)=>{
    const tabId=`menu-tab-${index}`;
    const panelId=`menu-panel-${index}`;
    const tab=document.createElement('button');
    tab.type='button';
    tab.id=tabId;
    tab.className=`menu-tab${index===0?' active':''}`;
    tab.textContent=group.category;
    tab.setAttribute('role','tab');
    tab.setAttribute('aria-selected',String(index===0));
    tab.setAttribute('aria-controls',panelId);
    tab.tabIndex=index===0?0:-1;

    const panel=document.createElement('section');
    panel.className=`menu-panel${index===0?' active':''}`;
    panel.id=panelId;
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-labelledby',tabId);
    panel.hidden=index!==0;
    panel.innerHTML=`<div class="menu-panel-head"><p>${group.category}</p><span>${group.items.length} позиций</span></div><div class="menu-list">${group.items.map(([name,price,weight])=>`<article class="menu-item"><div><h3>${name}</h3>${weight?`<p>${weight}</p>`:''}</div><strong>${price.toLocaleString('ru-RU')} ₽</strong></article>`).join('')}</div>`;

    tab.addEventListener('click',()=>activate(tab,panel));
    tabs.appendChild(tab);
    panels.appendChild(panel);
  });

  tabs.addEventListener('keydown',(event)=>{
    const keys=['ArrowRight','ArrowLeft','Home','End'];
    if(!keys.includes(event.key))return;
    event.preventDefault();
    const allTabs=[...tabs.querySelectorAll('.menu-tab')];
    const current=allTabs.indexOf(document.activeElement);
    let next=current<0?0:current;
    if(event.key==='ArrowRight')next=(next+1)%allTabs.length;
    if(event.key==='ArrowLeft')next=(next-1+allTabs.length)%allTabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=allTabs.length-1;
    const nextTab=allTabs[next];
    const nextPanel=panels.querySelector(`#${nextTab.getAttribute('aria-controls')}`);
    activate(nextTab,nextPanel,true);
  });

  menuRoot.replaceChildren(tabs,panels);
}
