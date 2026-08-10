# Saigon VN — new website

Новый коммерческий сайт ресторана Saigon VN в Королёве.

## Концепция

Сайт имеет две полноценные визуальные версии — тёмную и светлую. Обе сохраняют одну структуру, контент и CTA, но используют разные поверхности, контраст и настроение. Переключатель темы доступен в шапке на desktop и внутри мобильного меню. Выбор сохраняется в `localStorage`; при первом визите учитывается системная тема устройства.

## Технологии

- semantic HTML5
- responsive CSS без UI-фреймворков
- минимальный vanilla JavaScript
- отдельная светлая и тёмная тема
- SVG-анимация пара над главным блюдом с turbulence/displacement/blur
- автоматическое отключение анимации при `prefers-reduced-motion`
- Restaurant schema.org markup
- mobile sticky action bar
- responsive breakpoints для 375 / 430 / 768 / 1024 / 1440 px
- отдельная 404-страница и robots.txt

Сборщик, npm-зависимости и backend для запуска сайта не нужны.

## Установка локального репозитория

Понадобится Git. Откройте Terminal / PowerShell и выполните:

```bash
git clone https://github.com/Benzilya/saigon-new.git
cd saigon-new
```

Если репозиторий уже клонирован, повторно клонировать его не нужно.

## Запуск локально

Рекомендуется запускать сайт через простой HTTP-сервер, а не двойным кликом по `index.html`: так поведение будет ближе к реальному хостингу.

### Вариант 1 — Python

```bash
python -m http.server 8080
```

На Windows также может использоваться:

```bash
py -m http.server 8080
```

После запуска открыть `http://localhost:8080`.

### Как выбрать другой порт

Число в конце команды — это порт. Например:

```bash
python -m http.server 3000
python -m http.server 5500
python -m http.server 9000
```

Тогда адреса будут соответственно `http://localhost:3000`, `http://localhost:5500` или `http://localhost:9000`.

Если терминал пишет `Address already in use`, выберите другой порт, например 8081 или 9000. Чтобы остановить локальный сервер, нажмите `Ctrl + C`.

### Вариант 2 — Node.js

```bash
npx serve . -l 8080
```

Открыть `http://localhost:8080`.

### Вариант 3 — VS Code

Можно установить расширение Live Server, открыть папку проекта и нажать `Go Live`. Порт отображается в адресной строке браузера и обычно равен 5500.

## Как получить последние обновления

```bash
git switch main
git pull origin main
```

Проверить состояние:

```bash
git status
```

Если есть локальные изменения и `pull` не выполняется:

```bash
git stash
git pull origin main
git stash pop
```

После `stash pop` проверьте возможные конфликты.

## Как сохранить свои изменения

```bash
git status
git add .
git commit -m "Describe changes"
git push origin main
```

Для серьёзных изменений безопаснее отдельная ветка:

```bash
git switch -c feature/my-change
git add .
git commit -m "Describe changes"
git push -u origin feature/my-change
```

## Структура проекта

```text
saigon-new/
├── index.html      # контент, SEO, переключатели тем
├── styles.css      # базовая визуальная система и responsive layout
├── theme.css       # светлая/тёмная темы и theme toggle
├── steam.css       # стили SVG-пара
├── app.js          # темы, мобильное меню, SVG-анимация пара
├── 404.html        # страница 404
├── robots.txt      # правила для поисковых роботов
└── README.md       # документация
```

## Темы

Тема задаётся атрибутом `data-theme="dark"` или `data-theme="light"` у элемента `<html>`. Пользовательский выбор сохраняется под ключом `saigon-theme`.

Чтобы сбросить сохранённый выбор в DevTools:

```js
localStorage.removeItem('saigon-theme')
location.reload()
```

После этого сайт снова возьмёт системную тему устройства.

## Публикация

Сайт статический, поэтому его можно публиковать на GitHub Pages, Netlify, Cloudflare Pages, Vercel или обычном веб-хостинге. Build command не требуется; публикуется корень репозитория.

Для GitHub Pages: `Settings` → `Pages` → `Build and deployment` → `Deploy from a branch` → `main` → `/ (root)` → `Save`.

## Что менять чаще всего

Контент находится в `index.html`. Основной layout — в `styles.css`. Цветовые различия тем изолированы в `theme.css`. Эффект пара — в `steam.css` и SVG-разметке, создаваемой в `app.js`.

## Источники фактических данных

Контакты, адрес, рейтинг и отзывы взяты с текущего сайта Saigon VN / карточки Яндекс. Неизвестные часы работы и цены намеренно не выдуманы. Кнопка «Меню и цены» ведёт в текущий каталог ресторана, пока структурированное меню не будет перенесено в репозиторий.

Фото блюд и интерьерный референс в текущей версии — фотографии Unsplash. Кнопка «Посмотреть реальные фото» ведёт в галерею Saigon VN на Яндекс Картах. При получении оригинальных фотографий их можно заменить без изменения структуры страницы.
