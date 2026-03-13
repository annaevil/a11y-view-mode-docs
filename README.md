# a11y-view-mode

Low-vision accessibility mode as an npm package for existing websites and apps.

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

- Docs: [https://github.com/annaevil/a11y-view-mode-docs](https://github.com/annaevil/a11y-view-mode-docs)
- Demo page: [https://annaevil.github.io/a11y-view-mode-docs](https://annaevil.github.io/a11y-view-mode-docs)

Русский: [README (RU)](#readme-ru)  
English: [README (EN)](#readme-en)

---

## README RU

`a11y-view-mode` — npm-библиотека для слабовидящих с гибкой настройкой внешнего вида и поведения.

### Возможности

- Режимы запуска: `auto` (кнопка‑пресет) и `control` (кнопка + панель).
- Настройки текста: размер, интервалы, выравнивание, семейство шрифта.
- Настройки отображения: контраст, тема, изображения, стиль ссылок, снижение движения.
- Хранение состояния: `none` / `localStorage` / `sessionStorage`.
- Локализация панели: `ru` / `en` + `labels`.
- Кастомизация UI: классы, иконка/текст, `uiMount`, `disableAutoPosition`.
- Управление панелью: `openPanel()`, `closePanel()`, `togglePanel()`.
- Закрытие по клику вне панели: `closeOnOutsideClick`.

### Установка

```bash
npm i a11y-view-mode
```

### Подключение стилей

Полный набор (core + ui):
```ts
import 'a11y-view-mode/styles/index.css'
```

Только core (без дефолтной панели):
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

### Опции (A11yViewOptions)

Основные:
- `activationMode`: `'auto' | 'control'`
- `enabled`: `boolean`
- `locale`: `'ru' | 'en'`
- `storageMode`: `'none' | 'localStorage' | 'sessionStorage'` 
- `openPanel`: `boolean` (только для `control`)
- `closeOnOutsideClick`: `boolean` (только для `control`)
- `cssClass`: `string` (класс на корневом контейнере, по умолчанию `a11y-mode`)
- `root`: `HTMLElement | Document` (контейнер применения режима)

Текст и визуальные настройки:
- `fontScale`: `1 | 1.25 | 1.5 | 2`
- `fontFamily`: `'default' | 'serif'`
- `lineHeight`: `'default' | 1.5 | 2 | 2.5`
- `textAlign`: `'default' | 'left'`
- `letterSpacing`: `'default' | 0.12 | 0.16 | 0.2`
- `wordSpacing`: `'default' | 0.16 | 0.2 | 0.5`
- `paragraphSpacing`: `'default' | 2 | 2.25 | 2.5`
- `contrastMode`: `'default' | 'high' | 'inverse'`
- `colorScheme`: `'default' | 'light' | 'dark' | 'sepia'`
- `imagesMode`: `'default' | 'show' | 'hide' | 'grayscale'`
- `reduceMotion`: `'default' | 'on' | 'off'`
- `linkStyle`: `'default' | 'underline'`

Изображения:
- `images.hideStrategy`: `'transparent' | 'collapse'` 
- `images.hideSelectors`: `string[]` (скрывайте изображения вместе с родительскими контейнерами, без потери верстки)
- `images.hideClass`: `string`

Подписи панели:
- `labels`: переопределяет тексты внутри панели (заголовки секций, подписи кнопок). Не влияет на внешнюю кнопку.

UI и позиционирование:
- `uiControlPosition`: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- `disableAutoPosition`: `boolean`
- `uiMount`: `string | HTMLElement` (селектор или элемент-контейнер)
- `buttonClassName`: `string`
- `panelClassName`: `string`

Кнопка (`button`):
- `label`: `string`
- `icon`: `string` (URL/путь)
- `showLabel`: `boolean`
- `ariaLabel`: `string` 
- `position`: `UiControlPosition` (если нужно отдельно)
- `useDefaultIcon`: `boolean` (встроенная SVG-иконка)

### Полный пример с комментариями

```ts
const a11y = createA11yView({
  // базовые
  activationMode: 'control', // 'auto' | 'control'
  enabled: true,             // включить сразу
  locale: 'ru',              // язык панели
  storageMode: 'localStorage', // none | localStorage | sessionStorage
  openPanel: false,          // стартовое состояние панели (control)
  closeOnOutsideClick: true, // закрывать панель по клику вне

  // область применения
  root: document,            // куда применять режим (по умолчанию html)
  cssClass: 'a11y-mode',     // класс на root (можно переименовать)

  // текст
  fontScale: 1.5,
  fontFamily: 'serif',
  lineHeight: 1.5,
  textAlign: 'left',
  letterSpacing: 0.12,
  wordSpacing: 0.16,
  paragraphSpacing: 2,

  // визуальные режимы
  contrastMode: 'high',
  colorScheme: 'dark',
  imagesMode: 'hide',
  reduceMotion: 'on',
  linkStyle: 'underline',

  // изображения
  images: {
    hideStrategy: 'collapse',
    hideSelectors: ['.hero', '.slider'],
    hideClass: 'a11y-hide-images'
  },

  // UI и позиционирование
  uiControlPosition: 'top-right',
  disableAutoPosition: false,
  uiMount: '#a11y-slot',     // если нужно встроить в разметку 
  buttonClassName: 'my-a11y-btn',
  panelClassName: 'my-a11y-panel',

  // кнопка
  button: {
    label: 'Версия для слабовидящих',
    icon: '/assets/eye.svg',
    showLabel: true,
    ariaLabel: 'Открыть настройки доступности',
    useDefaultIcon: false
  },

  // авто-пресет (для activationMode: 'auto')
  autoPreset: {
    fontScale: 1.5,
    contrastMode: 'high'
  },

  // переопределение подписей панели
  labels: {
    contrast: 'Выберите контраст'
  }
})
```

### Встраивание кнопки в разметку

Если кнопку нужно встроить в верстку (а не фиксировать), используйте `uiMount` и `disableAutoPosition`:

```ts
createA11yView({
  activationMode: 'control',
  uiMount: '#a11y-slot',
  disableAutoPosition: true
})
```

```html
<div id="a11y-slot"></div>
```

### Примеры

Кнопка с кастомной иконкой:
```ts
createA11yView({
  button: {
    icon: '/assets/eye.svg',
    showLabel: false,
    ariaLabel: 'Открыть настройки доступности'
  }
})
```

Кнопка: иконка + текст:
```ts
createA11yView({
  button: {
    icon: '/assets/eye.svg',
    label: 'Версия для слабовидящих',
    showLabel: true
  }
})
```

Кнопка + изображения:
```ts
createA11yView({
  button: {
    label: 'Версия для слабовидящих',
    icon: '/assets/eye.svg',
    showLabel: true
  },
  imagesMode: 'hide',
  images: {
    hideStrategy: 'collapse',
    hideSelectors: ['.hero', '.slider']
  }
})
```

Изображения: скрытие + стратегия:
```ts
createA11yView({
  imagesMode: 'hide',
  images: {
    hideStrategy: 'collapse',
    hideSelectors: ['.hero', '.slider'],
    hideClass: 'a11y-hide-images'
  }
})
```

Хранение состояния:
```ts
createA11yView({
  storageMode: 'sessionStorage'
})
```

Переопределение текстов панели:
```ts
createA11yView({
  labels: {
    contrast: 'Контраст',
    high: 'Высокий',
    inverse: 'Инверсия',
    default: 'По умолчанию'
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

---

## README EN

`a11y-view-mode` is an npm library for low-vision view mode with flexible UI and behavior customization.

### Features

- Activation modes: `auto` (preset button) and `control` (button + panel).
- Text controls: size, spacing, alignment, font family.
- Visual controls: contrast, color scheme, images mode, links style, reduced motion.
- State persistence: `none` / `localStorage` / `sessionStorage`.
- Panel localization: `ru` / `en` + `labels`.
- UI customization: classes, icon/text, `uiMount`, `disableAutoPosition`.
- Panel API: `openPanel()`, `closePanel()`, `togglePanel()`.
- Close on outside click: `closeOnOutsideClick`.

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

### Options (A11yViewOptions)

Core:
- `activationMode`: `'auto' | 'control'`
- `enabled`: `boolean`
- `locale`: `'ru' | 'en'`
- `storageMode`: `'none' | 'localStorage' | 'sessionStorage'`
- `openPanel`: `boolean` (control mode)
- `closeOnOutsideClick`: `boolean` (control mode)
- `cssClass`: `string` (root class, default `a11y-mode`)
- `root`: `HTMLElement | Document` (apply target)

Text & visual:
- `fontScale`: `1 | 1.25 | 1.5 | 2`
- `fontFamily`: `'default' | 'serif'`
- `lineHeight`: `'default' | 1.5 | 2 | 2.5`
- `textAlign`: `'default' | 'left'`
- `letterSpacing`: `'default' | 0.12 | 0.16 | 0.2`
- `wordSpacing`: `'default' | 0.16 | 0.2 | 0.5`
- `paragraphSpacing`: `'default' | 2 | 2.25 | 2.5`
- `contrastMode`: `'default' | 'high' | 'inverse'`
- `colorScheme`: `'default' | 'light' | 'dark' | 'sepia'`
- `imagesMode`: `'default' | 'show' | 'hide' | 'grayscale'`
- `reduceMotion`: `'default' | 'on' | 'off'`
- `linkStyle`: `'default' | 'underline'`

Images:
- `images.hideStrategy`: `'transparent' | 'collapse'`
- `images.hideSelectors`: `string[]`
- `images.hideClass`: `string`

Panel labels:
- `labels`: overrides panel texts (section titles and option labels). Does not affect the main toggle button.

UI & positioning:
- `uiControlPosition`: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- `disableAutoPosition`: `boolean`
- `uiMount`: `string | HTMLElement`
- `buttonClassName`: `string`
- `panelClassName`: `string`

Button (`button`):
- `label`: `string`
- `icon`: `string` (URL/path)
- `showLabel`: `boolean`
- `ariaLabel`: `string`
- `position`: `UiControlPosition`
- `useDefaultIcon`: `boolean`

### Full example with comments

```ts
const a11y = createA11yView({
  // core
  activationMode: 'control', // 'auto' | 'control'
  enabled: true,
  locale: 'en',
  storageMode: 'localStorage', // none | localStorage | sessionStorage
  openPanel: false,          // initial panel state (control)
  closeOnOutsideClick: true, // close on outside click

  // scope
  root: document,
  cssClass: 'a11y-mode',

  // text
  fontScale: 1.5,
  fontFamily: 'serif',
  lineHeight: 1.5,
  textAlign: 'left',
  letterSpacing: 0.12,
  wordSpacing: 0.16,
  paragraphSpacing: 2,

  // visual
  contrastMode: 'high',
  colorScheme: 'dark',
  imagesMode: 'hide',
  reduceMotion: 'on',
  linkStyle: 'underline',

  // images
  images: {
    hideStrategy: 'collapse',
    hideSelectors: ['.hero', '.slider'],
    hideClass: 'a11y-hide-images'
  },

  // UI & positioning
  uiControlPosition: 'top-right',
  disableAutoPosition: false,
  uiMount: '#a11y-slot',
  buttonClassName: 'my-a11y-btn',
  panelClassName: 'my-a11y-panel',

  // button
  button: {
    label: 'Accessibility',
    icon: '/assets/eye.svg',
    showLabel: true,
    ariaLabel: 'Open accessibility settings',
    useDefaultIcon: false
  },

  // auto preset (for activationMode: 'auto')
  autoPreset: {
    fontScale: 1.5,
    contrastMode: 'high'
  },

  // labels override
  labels: {
    contrast: 'Choose contrast'
  }
})
```

### Mount UI into layout

If you need to place the button inside your layout, use `uiMount` + `disableAutoPosition`:

```ts
createA11yView({
  activationMode: 'control',
  uiMount: '#a11y-slot',
  disableAutoPosition: true
})
```

```html
<div id="a11y-slot"></div>
```

### Examples

Custom icon button:
```ts
createA11yView({
  button: {
    icon: '/assets/eye.svg',
    showLabel: false,
    ariaLabel: 'Open accessibility settings'
  }
})
```

Icon + text:
```ts
createA11yView({
  button: {
    icon: '/assets/eye.svg',
    label: 'Accessibility',
    showLabel: true
  }
})
```

Button + images:
```ts
createA11yView({
  button: {
    label: 'Accessibility',
    icon: '/assets/eye.svg',
    showLabel: true
  },
  imagesMode: 'hide',
  images: {
    hideStrategy: 'collapse',
    hideSelectors: ['.hero', '.slider']
  }
})
```

Images: hide with strategy:
```ts
createA11yView({
  imagesMode: 'hide',
  images: {
    hideStrategy: 'collapse',
    hideSelectors: ['.hero', '.slider'],
    hideClass: 'a11y-hide-images'
  }
})
```

State persistence:
```ts
createA11yView({
  storageMode: 'sessionStorage'
})
```

Panel labels override:
```ts
createA11yView({
  labels: {
    contrast: 'Contrast',
    high: 'High',
    inverse: 'Inverse',
    default: 'Default'
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

---

## License

Proprietary. See LICENSE in the package.
