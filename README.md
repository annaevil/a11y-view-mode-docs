# a11y-view-mode

Low-vision accessibility mode as an npm package for existing websites and apps.

## TL;DR

```bash
npm i a11y-view-mode
```

```ts
import { createA11yView } from 'a11y-view-mode'
import 'a11y-view-mode/styles/index.css'

createA11yView({
  activationMode: 'control',
  locale: 'ru',
  storageMode: 'localStorage'
})
```

- Source demo file: `demo/index.html`

Русский: [README (RU)](#readme-ru)  
English: [README (EN)](#readme-en)

---

## README RU

`a11y-view-mode` — npm-библиотека версии для слабовидящих с гибкой настройкой внешнего вида и поведения.

### Возможности

- Режимы запуска:
  - `auto` — одна кнопка с быстрым пресетом.
  - `control` — кнопка + панель пользовательских настроек.
- Настройки текста:
  - размер шрифта, межстрочный/межбуквенный/межсловный/межабзацный интервалы, выравнивание, семейство шрифта.
- Настройки отображения:
  - контраст, цветовая схема, режим изображений, стиль ссылок, снижение движения.
- Хранение состояния:
  - `none` / `localStorage` / `sessionStorage`.
- Локализация панели:
  - `ru` / `en` + переопределение `labels`.
- Кастомизация UI:
  - классы кнопки и панели, иконка/текст/иконка+текст, `uiMount`, `disableAutoPosition`.
- Управление панелью из API:
  - `openPanel()`, `closePanel()`, `togglePanel()`.
- Опция закрытия панели по клику вне:
  - `closeOnOutsideClick`.

### Установка

```bash
npm i a11y-view-mode
```

### Подключение стилей

Полный набор (core + ui):
```ts
import 'a11y-view-mode/styles/index.css'
```

Только функциональные стили (без дефолтной UI панели):
```ts
import 'a11y-view-mode/styles/core.css'
```

Только UI слой:
```ts
import 'a11y-view-mode/styles/ui.css'
```

### Быстрый старт

```ts
import { createA11yView } from 'a11y-view-mode'
import 'a11y-view-mode/styles/index.css'

const a11y = createA11yView({
  activationMode: 'control',
  locale: 'ru',
  enabled: true,
  storageMode: 'localStorage'
})
```

### Пример 

```ts
const a11y = createA11yView({
  activationMode: 'control', // 'auto' | 'control'
  locale: 'ru',              // 'ru' | 'en'
  enabled: true,
  storageMode: 'sessionStorage', // 'none' | 'localStorage' | 'sessionStorage'

  openPanel: false,
  closeOnOutsideClick: true,

  button: {
    label: 'Версия для слабовидящих',
    icon: './assets/eye.svg',
    showLabel: true,
    ariaLabel: 'Открыть настройки доступности'
  },

  buttonClassName: 'my-a11y-btn',
  panelClassName: 'my-a11y-panel',

  uiControlPosition: 'top-right',
  disableAutoPosition: false,
  // uiMount: '#a11y-slot',

  images: {
    hideStrategy: 'transparent', // 'transparent' | 'collapse'
    hideSelectors: ['.js-slider', '.media-card'],
    hideClass: 'demo-images-hide'
  },

  labels: {
    motion: 'Снижение движения'
  }
})
```

### API экземпляра

- `enable()`
- `disable()`
- `toggle()`
- `reset()`
- `getState()`
- `update(next)`
- `destroy()`
- `openPanel()`
- `closePanel()`
- `togglePanel()`
- `setLocale(value)`
- `setFontScale(value)`
- `setFontFamily(value)`
- `setLineHeight(value)`
- `setTextAlign(value)`
- `setLetterSpacing(value)`
- `setWordSpacing(value)`
- `setParagraphSpacing(value)`
- `setContrastMode(value)`
- `setColorScheme(value)`
- `setImagesMode(value)`
- `setUiControlPosition(value)`
- `setReduceMotion(value)`
- `setLinkStyle(value)`
- `setStorageMode(value)`

### Важные заметки

- Значение `default` в настройках означает: не форсировать стиль и вернуть поведение к базовому.
- `images.hideStrategy` используется в режиме `imagesMode = 'hide'`.
- `reduceMotion = 'on'` означает, что снижение движения включено (анимации/transition отключаются).

### Demo

- Live demo: _[]_
- Исходник демо: `demo/index.html`

### Изменения

-See [CHANGELOG](CHANGELOG.md).

### Разработка

```bash
npm install
npm run typecheck
npm run typecheck:test
npm test
npm run build
```

---

## README EN

`a11y-view-mode` is an npm library for low-vision view mode with flexible UI and behavior customization.

### Features

- Activation modes:
  - `auto` — single quick-preset button.
  - `control` — button + full control panel.
- Text controls:
  - font size, line/letter/word/paragraph spacing, text align, font family.
- Visual controls:
  - contrast, color scheme, images mode, links style, reduced motion.
- State persistence:
  - `none` / `localStorage` / `sessionStorage`.
- Panel localization:
  - `ru` / `en` + `labels` overrides.
- UI customization:
  - button/panel classes, icon/text/icon+text, `uiMount`, `disableAutoPosition`.
- Public panel controls:
  - `openPanel()`, `closePanel()`, `togglePanel()`.
- Close on outside click:
  - `closeOnOutsideClick`.

### Installation

```bash
npm i a11y-view-mode
```

### Styles

Full styles (core + ui):
```ts
import 'a11y-view-mode/styles/index.css'
```

Core only (no default panel skin):
```ts
import 'a11y-view-mode/styles/core.css'
```

UI only:
```ts
import 'a11y-view-mode/styles/ui.css'
```

### Quick Start

```ts
import { createA11yView } from 'a11y-view-mode'
import 'a11y-view-mode/styles/index.css'

const a11y = createA11yView({
  activationMode: 'control',
  locale: 'en',
  enabled: true,
  storageMode: 'localStorage'
})
```

### Example

```ts
const a11y = createA11yView({
  activationMode: 'control', // 'auto' | 'control'
  locale: 'en',              // 'ru' | 'en'
  enabled: true,
  storageMode: 'sessionStorage', // 'none' | 'localStorage' | 'sessionStorage'

  openPanel: false,
  closeOnOutsideClick: true,

  button: {
    label: 'Accessibility',
    icon: './assets/eye.svg',
    showLabel: true,
    ariaLabel: 'Open accessibility settings'
  },

  buttonClassName: 'my-a11y-btn',
  panelClassName: 'my-a11y-panel',

  uiControlPosition: 'top-right',
  disableAutoPosition: false,
  // uiMount: '#a11y-slot',

  images: {
    hideStrategy: 'transparent', // 'transparent' | 'collapse'
    hideSelectors: ['.js-slider', '.media-card'],
    hideClass: 'demo-images-hide'
  },

  labels: {
    motion: 'Reduce motion'
  }
})
```

### Instance API

- `enable()`
- `disable()`
- `toggle()`
- `reset()`
- `getState()`
- `update(next)`
- `destroy()`
- `openPanel()`
- `closePanel()`
- `togglePanel()`
- `setLocale(value)`
- `setFontScale(value)`
- `setFontFamily(value)`
- `setLineHeight(value)`
- `setTextAlign(value)`
- `setLetterSpacing(value)`
- `setWordSpacing(value)`
- `setParagraphSpacing(value)`
- `setContrastMode(value)`
- `setColorScheme(value)`
- `setImagesMode(value)`
- `setUiControlPosition(value)`
- `setReduceMotion(value)`
- `setLinkStyle(value)`
- `setStorageMode(value)`

### Notes

- `default` means “do not force override” and rollback to base behavior.
- `images.hideStrategy` is used when `imagesMode = 'hide'`.
- `reduceMotion = 'on'` means reduced motion is enabled (animations/transitions are disabled).

### Demo

- Live demo: _[]_
- Demo source: `demo/index.html`

### Changelog

-See [CHANGELOG](CHANGELOG.md).

### Development

```bash
npm install
npm run typecheck
npm run typecheck:test
npm test
npm run build
```

---

## License

ISC