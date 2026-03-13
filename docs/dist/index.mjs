// src/ui/i18n.ts
var RU_LABELS = {
  reset: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",
  fontScale: "\u0420\u0430\u0437\u043C\u0435\u0440 \u0448\u0440\u0438\u0444\u0442\u0430",
  contrast: "\u041A\u043E\u043D\u0442\u0440\u0430\u0441\u0442",
  colorScheme: "\u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u0441\u0445\u0435\u043C\u0430",
  images: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
  fontFamily: "\u0428\u0440\u0438\u0444\u0442",
  textAlign: "\u0412\u044B\u0440\u0430\u0432\u043D\u0438\u0432\u0430\u043D\u0438\u0435",
  lineHeight: "\u041C\u0435\u0436\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B",
  letterSpacing: "\u041C\u0435\u0436\u0431\u0443\u043A\u0432\u0435\u043D\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B",
  wordSpacing: "\u041C\u0435\u0436\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B",
  paragraphSpacing: "\u041C\u0435\u0436\u0430\u0431\u0437\u0430\u0446\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B",
  linkStyle: "\u0421\u0441\u044B\u043B\u043A\u0438",
  motion: "\u0410\u043D\u0438\u043C\u0430\u0446\u0438\u0438",
  default: "\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
  show: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C",
  hide: "\u0421\u043A\u0440\u044B\u0442\u044C",
  grayscale: "\u0421\u0435\u0440\u044B\u0439",
  high: "\u0412\u044B\u0441\u043E\u043A\u0438\u0439",
  inverse: "\u0418\u043D\u0432\u0435\u0440\u0441\u0438\u044F",
  light: "\u0421\u0432\u0435\u0442\u043B\u0430\u044F",
  dark: "\u0422\u0451\u043C\u043D\u0430\u044F",
  sepia: "\u0421\u0435\u043F\u0438\u044F",
  underline: "\u041F\u043E\u0434\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044C",
  left: "\u041F\u043E \u043B\u0435\u0432\u043E\u043C\u0443 \u043A\u0440\u0430\u044E",
  serif: "\u0421 \u0437\u0430\u0441\u0435\u0447\u043A\u0430\u043C\u0438",
  on: "\u0412\u044B\u043A\u043B.",
  off: "\u0412\u043A\u043B."
};
var EN_LABELS = {
  reset: "Reset",
  fontScale: "Font size",
  contrast: "Contrast",
  colorScheme: "Color scheme",
  images: "Images",
  fontFamily: "Font family",
  textAlign: "Text align",
  lineHeight: "Line height",
  letterSpacing: "Letter spacing",
  wordSpacing: "Word spacing",
  paragraphSpacing: "Paragraph spacing",
  linkStyle: "Links",
  motion: "Motion",
  default: "Default",
  show: "Show",
  hide: "Hide",
  grayscale: "Grayscale",
  high: "High",
  inverse: "Inverse",
  light: "Light",
  dark: "Dark",
  sepia: "Sepia",
  underline: "Underline",
  left: "Left",
  serif: "Serif",
  on: "Off",
  off: "On"
};
function resolveLabels(locale = "ru", overrides) {
  const base = locale === "en" ? EN_LABELS : RU_LABELS;
  return { ...base, ...overrides != null ? overrides : {} };
}

// src/ui/panel.ts
function createRow(doc, labelText) {
  const row = doc.createElement("div");
  row.className = "a11y-panel__row";
  const label = doc.createElement("label");
  label.className = "a11y-panel__label";
  label.textContent = labelText;
  const content = doc.createElement("div");
  content.className = "a11y-panel__content";
  row.append(label, content);
  return { row, label, content };
}
function createSegmentControl(doc, groupLabel, items, onChange) {
  const root = doc.createElement("div");
  root.className = "a11y-panel__segment";
  root.setAttribute("role", "group");
  root.setAttribute("aria-label", groupLabel);
  const buttons = [];
  const listeners = [];
  const setValue = (value) => {
    buttons.forEach((btn) => {
      const active = btn.dataset.value === value;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  };
  items.forEach((item) => {
    const btn = doc.createElement("button");
    btn.type = "button";
    btn.className = "a11y-panel__segment-btn";
    btn.dataset.value = item.value;
    btn.textContent = item.label;
    btn.setAttribute("aria-pressed", "false");
    const onClick = () => {
      setValue(item.value);
      onChange(item.value);
    };
    btn.addEventListener("click", onClick);
    listeners.push({ el: btn, fn: onClick });
    buttons.push(btn);
    root.appendChild(btn);
  });
  const destroy = () => {
    listeners.forEach(({ el, fn }) => el.removeEventListener("click", fn));
  };
  return { root, setValue, destroy };
}
function createControlPanel(instance, doc, options) {
  var _a;
  const root = doc.createElement("div");
  root.className = "a11y-panel";
  root.hidden = true;
  if (options == null ? void 0 : options.panelClassName) {
    root.classList.add(options.panelClassName);
  }
  const labels = resolveLabels((_a = options == null ? void 0 : options.locale) != null ? _a : "ru", options == null ? void 0 : options.labels);
  const cleanups = [];
  const actions = doc.createElement("div");
  actions.className = "a11y-panel__actions a11y-panel__row a11y-panel__row--full";
  const resetBtn = doc.createElement("button");
  resetBtn.type = "button";
  resetBtn.textContent = labels.reset;
  const onReset = () => instance.reset();
  resetBtn.addEventListener("click", onReset);
  cleanups.push(() => resetBtn.removeEventListener("click", onReset));
  actions.appendChild(resetBtn);
  const fontScaleRow = createRow(doc, labels.fontScale);
  const fontScaleCtrl = createSegmentControl(
    doc,
    labels.fontScale,
    [
      { value: "1", label: "1x" },
      { value: "1.25", label: "1.25x" },
      { value: "1.5", label: "1.5x" },
      { value: "2", label: "2x" }
    ],
    (v) => instance.setFontScale(Number(v))
  );
  fontScaleRow.content.appendChild(fontScaleCtrl.root);
  cleanups.push(() => fontScaleCtrl.destroy());
  const contrastRow = createRow(doc, labels.contrast);
  const contrastCtrl = createSegmentControl(
    doc,
    labels.contrast,
    [
      { value: "default", label: labels.default },
      { value: "high", label: labels.high },
      { value: "inverse", label: labels.inverse }
    ],
    (v) => instance.setContrastMode(v)
  );
  contrastRow.content.appendChild(contrastCtrl.root);
  cleanups.push(() => contrastCtrl.destroy());
  const schemeRow = createRow(doc, labels.colorScheme);
  const schemeCtrl = createSegmentControl(
    doc,
    labels.colorScheme,
    [
      { value: "default", label: labels.default },
      { value: "light", label: labels.light },
      { value: "dark", label: labels.dark },
      { value: "sepia", label: labels.sepia }
    ],
    (v) => instance.setColorScheme(v)
  );
  schemeRow.content.appendChild(schemeCtrl.root);
  cleanups.push(() => schemeCtrl.destroy());
  const imagesRow = createRow(doc, labels.images);
  const imagesCtrl = createSegmentControl(
    doc,
    labels.images,
    [
      { value: "show", label: labels.show },
      { value: "hide", label: labels.hide },
      { value: "grayscale", label: labels.grayscale }
    ],
    (v) => instance.setImagesMode(v)
  );
  imagesRow.content.appendChild(imagesCtrl.root);
  cleanups.push(() => imagesCtrl.destroy());
  const fontFamilyRow = createRow(doc, labels.fontFamily);
  const fontFamilyCtrl = createSegmentControl(
    doc,
    labels.fontFamily,
    [
      { value: "default", label: labels.default },
      { value: "serif", label: labels.serif }
    ],
    (v) => instance.setFontFamily(v)
  );
  fontFamilyRow.content.appendChild(fontFamilyCtrl.root);
  cleanups.push(() => fontFamilyCtrl.destroy());
  const textAlignRow = createRow(doc, labels.textAlign);
  const textAlignCtrl = createSegmentControl(
    doc,
    labels.textAlign,
    [
      { value: "default", label: labels.default },
      { value: "left", label: labels.left }
    ],
    (v) => instance.setTextAlign(v)
  );
  textAlignRow.content.appendChild(textAlignCtrl.root);
  cleanups.push(() => textAlignCtrl.destroy());
  const lineHeightRow = createRow(doc, labels.lineHeight);
  const lineHeightCtrl = createSegmentControl(
    doc,
    labels.lineHeight,
    [
      { value: "default", label: labels.default },
      { value: "1.5", label: "1.5" },
      { value: "2", label: "2" },
      { value: "2.5", label: "2.5" }
    ],
    (v) => instance.setLineHeight(v === "default" ? "default" : Number(v))
  );
  lineHeightRow.content.appendChild(lineHeightCtrl.root);
  cleanups.push(() => lineHeightCtrl.destroy());
  const letterSpacingRow = createRow(doc, labels.letterSpacing);
  const letterSpacingCtrl = createSegmentControl(
    doc,
    labels.letterSpacing,
    [
      { value: "default", label: labels.default },
      { value: "0.12", label: "0.12" },
      { value: "0.16", label: "0.16" },
      { value: "0.2", label: "0.2" }
    ],
    (v) => instance.setLetterSpacing(v === "default" ? "default" : Number(v))
  );
  letterSpacingRow.content.appendChild(letterSpacingCtrl.root);
  cleanups.push(() => letterSpacingCtrl.destroy());
  const wordSpacingRow = createRow(doc, labels.wordSpacing);
  const wordSpacingCtrl = createSegmentControl(
    doc,
    labels.wordSpacing,
    [
      { value: "default", label: labels.default },
      { value: "0.16", label: "0.16" },
      { value: "0.2", label: "0.2" },
      { value: "0.5", label: "0.5" }
    ],
    (v) => instance.setWordSpacing(v === "default" ? "default" : Number(v))
  );
  wordSpacingRow.content.appendChild(wordSpacingCtrl.root);
  cleanups.push(() => wordSpacingCtrl.destroy());
  const paragraphSpacingRow = createRow(doc, labels.paragraphSpacing);
  const paragraphSpacingCtrl = createSegmentControl(
    doc,
    labels.paragraphSpacing,
    [
      { value: "default", label: labels.default },
      { value: "2", label: "2" },
      { value: "2.25", label: "2.25" },
      { value: "2.5", label: "2.5" }
    ],
    (v) => instance.setParagraphSpacing(v === "default" ? "default" : Number(v))
  );
  paragraphSpacingRow.content.appendChild(paragraphSpacingCtrl.root);
  cleanups.push(() => paragraphSpacingCtrl.destroy());
  const linksRow = createRow(doc, labels.linkStyle);
  const linksCtrl = createSegmentControl(
    doc,
    labels.linkStyle,
    [
      { value: "default", label: labels.default },
      { value: "underline", label: labels.underline }
    ],
    (v) => instance.setLinkStyle(v)
  );
  linksRow.content.appendChild(linksCtrl.root);
  cleanups.push(() => linksCtrl.destroy());
  const motionRow = createRow(doc, labels.motion);
  const motionCtrl = createSegmentControl(
    doc,
    labels.motion,
    [
      { value: "default", label: labels.default },
      { value: "on", label: labels.on },
      { value: "off", label: labels.off }
    ],
    (v) => instance.setReduceMotion(v)
  );
  motionRow.content.appendChild(motionCtrl.root);
  cleanups.push(() => motionCtrl.destroy());
  root.append(
    actions,
    fontScaleRow.row,
    contrastRow.row,
    schemeRow.row,
    imagesRow.row,
    fontFamilyRow.row,
    textAlignRow.row,
    lineHeightRow.row,
    letterSpacingRow.row,
    wordSpacingRow.row,
    paragraphSpacingRow.row,
    linksRow.row,
    motionRow.row
  );
  const syncFromState = () => {
    const state = instance.getState();
    fontScaleCtrl.setValue(String(state.fontScale));
    contrastCtrl.setValue(state.contrastMode);
    schemeCtrl.setValue(state.colorScheme);
    const imagesUiValue = state.imagesMode === "default" ? "show" : state.imagesMode;
    imagesCtrl.setValue(imagesUiValue);
    fontFamilyCtrl.setValue(state.fontFamily);
    textAlignCtrl.setValue(state.textAlign);
    lineHeightCtrl.setValue(String(state.lineHeight));
    letterSpacingCtrl.setValue(String(state.letterSpacing));
    wordSpacingCtrl.setValue(String(state.wordSpacing));
    paragraphSpacingCtrl.setValue(String(state.paragraphSpacing));
    linksCtrl.setValue(state.linkStyle);
    motionCtrl.setValue(state.reduceMotion);
  };
  const setOpen = (open) => {
    root.hidden = !open;
    if (open) syncFromState();
  };
  const toggle = () => {
    setOpen(root.hidden);
  };
  const destroy = () => {
    cleanups.forEach((fn) => fn());
    root.remove();
  };
  return { root, toggle, setOpen, syncFromState, destroy };
}

// src/core/storage.ts
var STORAGE_KEY = "a11y-storage-mode";
function persist(state, storageMode) {
  if (!storageMode || typeof window === "undefined" || storageMode === "none") return;
  try {
    if (storageMode === "localStorage") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else if (storageMode === "sessionStorage") {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
  }
}
function getStorage(storageMode) {
  if (typeof window === "undefined" || !storageMode || storageMode === "none") return null;
  try {
    const storage = storageMode === "sessionStorage" ? window.sessionStorage : window.localStorage;
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

// src/core/apply.ts
var DEFAULT_CSS_CLASS = "a11y-mode";
function resolveTarget(root) {
  if (typeof document === "undefined") return null;
  if (!root) return document.documentElement;
  if (root.nodeType === 9) return root.documentElement;
  if (root.nodeType === 1) return root;
  return null;
}
function setOrRemoveVar(target, name, value) {
  if (value == null) {
    target.style.removeProperty(name);
    return;
  }
  target.style.setProperty(name, value);
}
function setOrRemoveAttr(target, name, value) {
  if (value == null) {
    target.removeAttribute(name);
    return;
  }
  target.setAttribute(name, value);
}
function apply(state, options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const target = resolveTarget(options.root);
  if (!target) return;
  const cssClass = (_a = options.cssClass) != null ? _a : DEFAULT_CSS_CLASS;
  const isHideMode = state.imagesMode === "hide";
  target.classList.add(cssClass);
  if (isHideMode) {
    const strategy = (_c = (_b = options.images) == null ? void 0 : _b.hideStrategy) != null ? _c : "transparent";
    target.setAttribute("data-a11y-images-hide-strategy", strategy);
    if ((_d = options.images) == null ? void 0 : _d.hideClass) {
      target.classList.add(options.images.hideClass);
    }
    const selectors = (_f = (_e = options.images) == null ? void 0 : _e.hideSelectors) != null ? _f : [];
    if (selectors.length > 0) {
      selectors.forEach((selector) => {
        try {
          target.querySelectorAll(selector).forEach((el) => {
            el.classList.add("a11y-images-hide-target");
          });
        } catch {
        }
      });
    }
  } else {
    target.removeAttribute("data-a11y-images-hide-strategy");
    if ((_g = options.images) == null ? void 0 : _g.hideClass) {
      target.classList.remove(options.images.hideClass);
    }
    const selectors = (_i = (_h = options.images) == null ? void 0 : _h.hideSelectors) != null ? _i : [];
    if (selectors.length > 0) {
      selectors.forEach((selector) => {
        try {
          target.querySelectorAll(selector).forEach((el) => {
            el.classList.remove("a11y-images-hide-target");
          });
        } catch {
        }
      });
    }
  }
  setOrRemoveVar(target, "--a11y-font-scale", String(state.fontScale));
  setOrRemoveAttr(target, "data-a11y-font-family", state.fontFamily === "default" ? null : "on");
  setOrRemoveVar(target, "--a11y-font-family", state.fontFamily === "default" ? null : state.fontFamily);
  setOrRemoveVar(target, "--a11y-line-height", state.lineHeight === "default" ? null : String(state.lineHeight));
  setOrRemoveVar(target, "--a11y-letter-spacing", state.letterSpacing === "default" ? null : `${state.letterSpacing}em`);
  setOrRemoveVar(target, "--a11y-word-spacing", state.wordSpacing === "default" ? null : `${state.wordSpacing}em`);
  setOrRemoveAttr(target, "data-a11y-paragraph-spacing", state.paragraphSpacing === "default" ? null : "on");
  setOrRemoveVar(target, "--a11y-paragraph-spacing", state.paragraphSpacing === "default" ? null : `${state.paragraphSpacing}em`);
  setOrRemoveAttr(target, "data-a11y-text-align", state.textAlign === "default" ? null : "on");
  setOrRemoveVar(target, "--a11y-text-align", state.textAlign === "default" ? null : state.textAlign);
  setOrRemoveAttr(target, "data-a11y-contrast", state.contrastMode === "default" ? null : state.contrastMode);
  setOrRemoveAttr(target, "data-a11y-color-scheme", state.colorScheme === "default" ? null : state.colorScheme);
  setOrRemoveAttr(target, "data-a11y-images", state.imagesMode === "default" ? null : state.imagesMode);
  setOrRemoveAttr(target, "data-a11y-motion", state.reduceMotion === "default" ? null : state.reduceMotion);
  setOrRemoveAttr(target, "data-a11y-links", state.linkStyle === "default" ? null : state.linkStyle);
  setOrRemoveAttr(target, "data-a11y-control-position", state.uiControlPosition);
}
function clean(options) {
  var _a, _b, _c, _d;
  const target = resolveTarget(options.root);
  if (!target) return;
  const cssClass = (_a = options.cssClass) != null ? _a : DEFAULT_CSS_CLASS;
  const hideSelectors = (_c = (_b = options.images) == null ? void 0 : _b.hideSelectors) != null ? _c : [];
  target.classList.remove(cssClass);
  if ((_d = options.images) == null ? void 0 : _d.hideClass) {
    target.classList.remove(options.images.hideClass);
  }
  if (hideSelectors.length > 0) {
    hideSelectors.forEach((selector) => {
      try {
        target.querySelectorAll(selector).forEach((el) => {
          el.classList.remove("a11y-images-hide-target");
        });
      } catch {
      }
    });
  }
  target.style.removeProperty("--a11y-font-scale");
  target.style.removeProperty("--a11y-font-family");
  target.style.removeProperty("--a11y-line-height");
  target.style.removeProperty("--a11y-letter-spacing");
  target.style.removeProperty("--a11y-word-spacing");
  target.style.removeProperty("--a11y-paragraph-spacing");
  target.style.removeProperty("--a11y-text-align");
  target.removeAttribute("data-a11y-contrast");
  target.removeAttribute("data-a11y-color-scheme");
  target.removeAttribute("data-a11y-images");
  target.removeAttribute("data-a11y-images-hide-strategy");
  target.removeAttribute("data-a11y-motion");
  target.removeAttribute("data-a11y-links");
  target.removeAttribute("data-a11y-control-position");
  target.removeAttribute("data-a11y-paragraph-spacing");
  target.removeAttribute("data-a11y-text-align");
  target.removeAttribute("data-a11y-font-family");
}

// src/core/state.ts
var defaultState = {
  enabled: false,
  locale: "ru",
  fontScale: 1,
  fontFamily: "default",
  lineHeight: "default",
  textAlign: "default",
  letterSpacing: "default",
  wordSpacing: "default",
  paragraphSpacing: "default",
  contrastMode: "default",
  colorScheme: "default",
  imagesMode: "default",
  uiControlPosition: "top-right",
  reduceMotion: "default",
  linkStyle: "default",
  storageMode: "none",
  openPanel: false
};
function buildInitialState(options, restored) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na;
  return {
    ...defaultState,
    ...restored,
    enabled: (_d = (_c = (_b = options.enabled) != null ? _b : (_a = options.initial) == null ? void 0 : _a.enabled) != null ? _c : restored == null ? void 0 : restored.enabled) != null ? _d : defaultState.enabled,
    locale: (_h = (_g = (_f = options.locale) != null ? _f : (_e = options.initial) == null ? void 0 : _e.locale) != null ? _g : restored == null ? void 0 : restored.locale) != null ? _h : defaultState.locale,
    fontScale: (_l = (_k = (_j = options.fontScale) != null ? _j : (_i = options.initial) == null ? void 0 : _i.fontScale) != null ? _k : restored == null ? void 0 : restored.fontScale) != null ? _l : defaultState.fontScale,
    fontFamily: (_p = (_o = (_n = options.fontFamily) != null ? _n : (_m = options.initial) == null ? void 0 : _m.fontFamily) != null ? _o : restored == null ? void 0 : restored.fontFamily) != null ? _p : defaultState.fontFamily,
    lineHeight: (_t = (_s = (_r = options.lineHeight) != null ? _r : (_q = options.initial) == null ? void 0 : _q.lineHeight) != null ? _s : restored == null ? void 0 : restored.lineHeight) != null ? _t : defaultState.lineHeight,
    textAlign: (_x = (_w = (_v = options.textAlign) != null ? _v : (_u = options.initial) == null ? void 0 : _u.textAlign) != null ? _w : restored == null ? void 0 : restored.textAlign) != null ? _x : defaultState.textAlign,
    letterSpacing: (_B = (_A = (_z = options.letterSpacing) != null ? _z : (_y = options.initial) == null ? void 0 : _y.letterSpacing) != null ? _A : restored == null ? void 0 : restored.letterSpacing) != null ? _B : defaultState.letterSpacing,
    wordSpacing: (_F = (_E = (_D = options.wordSpacing) != null ? _D : (_C = options.initial) == null ? void 0 : _C.wordSpacing) != null ? _E : restored == null ? void 0 : restored.wordSpacing) != null ? _F : defaultState.wordSpacing,
    paragraphSpacing: (_J = (_I = (_H = options.paragraphSpacing) != null ? _H : (_G = options.initial) == null ? void 0 : _G.paragraphSpacing) != null ? _I : restored == null ? void 0 : restored.paragraphSpacing) != null ? _J : defaultState.paragraphSpacing,
    contrastMode: (_N = (_M = (_L = options.contrastMode) != null ? _L : (_K = options.initial) == null ? void 0 : _K.contrastMode) != null ? _M : restored == null ? void 0 : restored.contrastMode) != null ? _N : defaultState.contrastMode,
    colorScheme: (_R = (_Q = (_P = options.colorScheme) != null ? _P : (_O = options.initial) == null ? void 0 : _O.colorScheme) != null ? _Q : restored == null ? void 0 : restored.colorScheme) != null ? _R : defaultState.colorScheme,
    imagesMode: (_V = (_U = (_T = options.imagesMode) != null ? _T : (_S = options.initial) == null ? void 0 : _S.imagesMode) != null ? _U : restored == null ? void 0 : restored.imagesMode) != null ? _V : defaultState.imagesMode,
    uiControlPosition: (_Z = (_Y = (_X = options.uiControlPosition) != null ? _X : (_W = options.initial) == null ? void 0 : _W.uiControlPosition) != null ? _Y : restored == null ? void 0 : restored.uiControlPosition) != null ? _Z : defaultState.uiControlPosition,
    openPanel: (_ba = (_aa = (_$ = options.openPanel) != null ? _$ : (__ = options.initial) == null ? void 0 : __.openPanel) != null ? _aa : restored == null ? void 0 : restored.openPanel) != null ? _ba : defaultState.openPanel,
    reduceMotion: (_fa = (_ea = (_da = options.reduceMotion) != null ? _da : (_ca = options.initial) == null ? void 0 : _ca.reduceMotion) != null ? _ea : restored == null ? void 0 : restored.reduceMotion) != null ? _fa : defaultState.reduceMotion,
    linkStyle: (_ja = (_ia = (_ha = options.linkStyle) != null ? _ha : (_ga = options.initial) == null ? void 0 : _ga.linkStyle) != null ? _ia : restored == null ? void 0 : restored.linkStyle) != null ? _ja : defaultState.linkStyle,
    storageMode: (_na = (_ma = (_la = options.storageMode) != null ? _la : (_ka = options.initial) == null ? void 0 : _ka.storageMode) != null ? _ma : restored == null ? void 0 : restored.storageMode) != null ? _na : defaultState.storageMode
  };
}

// src/index.ts
var DEFAULT_BUTTON_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3v18'/%3E%3Cpath d='M6 7h8a4 4 0 0 1 0 8H6'/%3E%3C/svg%3E";
function resolveMountTarget(doc, mount) {
  if (typeof mount === "string") {
    const bySelector = doc.querySelector(mount);
    if (bySelector) return bySelector;
  }
  if (mount instanceof HTMLElement) return mount;
  return doc.body;
}
function applyPresetPosition(el, position, offsets = { edge: 16 }) {
  var _a;
  const edge = offsets.edge;
  const stack = (_a = offsets.stack) != null ? _a : edge;
  el.style.position = "fixed";
  el.style.zIndex = "99999";
  el.style.top = "";
  el.style.right = "";
  el.style.bottom = "";
  el.style.left = "";
  if (position === "top-left") {
    el.style.top = `${stack}px`;
    el.style.left = `${edge}px`;
  } else if (position === "top-right") {
    el.style.top = `${stack}px`;
    el.style.right = `${edge}px`;
  } else if (position === "bottom-left") {
    el.style.bottom = `${stack}px`;
    el.style.left = `${edge}px`;
  } else {
    el.style.bottom = `${stack}px`;
    el.style.right = `${edge}px`;
  }
}
function createA11yView(options = {}) {
  var _a;
  const mode = (_a = options.activationMode) != null ? _a : "auto";
  const restored = getStorage(options.storageMode);
  let state = buildInitialState(options, restored);
  let destroyUI = null;
  let setPanelOpen = null;
  const renderToggleButtonContent = (button, doc, opts, fallbackLabel) => {
    var _a2, _b, _c, _d;
    const label = (_a2 = opts == null ? void 0 : opts.label) != null ? _a2 : fallbackLabel;
    const iconSrc = (_b = opts == null ? void 0 : opts.icon) != null ? _b : (opts == null ? void 0 : opts.useDefaultIcon) ? DEFAULT_BUTTON_ICON : void 0;
    const hasIcon = Boolean(iconSrc);
    const showLabel = (_c = opts == null ? void 0 : opts.showLabel) != null ? _c : !hasIcon;
    button.replaceChildren();
    button.setAttribute("aria-label", (_d = opts == null ? void 0 : opts.ariaLabel) != null ? _d : label);
    if (hasIcon) {
      const icon = doc.createElement("img");
      icon.src = iconSrc;
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      icon.className = "a11y-toggle__icon";
      button.appendChild(icon);
    }
    if (showLabel) {
      const text = doc.createElement("span");
      text.className = "a11y-toggle__label";
      text.textContent = label;
      button.appendChild(text);
    }
  };
  const mountAutoUI = () => {
    var _a2;
    const target = resolveTarget(options.root);
    const doc = (_a2 = target == null ? void 0 : target.ownerDocument) != null ? _a2 : typeof document !== "undefined" ? document : null;
    if (!(doc == null ? void 0 : doc.body)) return () => {
    };
    const mountTarget = resolveMountTarget(doc, options.uiMount);
    const button = doc.createElement("button");
    button.type = "button";
    button.className = "a11y-toggle a11y-toggle--auto";
    if (options.buttonClassName) button.classList.add(options.buttonClassName);
    if (!options.disableAutoPosition && !options.uiMount) {
      applyPresetPosition(button, state.uiControlPosition, { edge: 16, stack: 16 });
    }
    renderToggleButtonContent(button, doc, options.button, "\u0412\u0435\u0440\u0441\u0438\u044F \u0434\u043B\u044F \u0441\u043B\u0430\u0431\u043E\u0432\u0438\u0434\u044F\u0449\u0438\u0445");
    const onClick = () => {
      var _a3;
      if (state.enabled) {
        instance.disable();
        return;
      }
      instance.update({
        ...(_a3 = options.autoPreset) != null ? _a3 : {},
        enabled: true
      });
    };
    button.addEventListener("click", onClick);
    mountTarget.appendChild(button);
    return () => {
      button.removeEventListener("click", onClick);
      button.remove();
    };
  };
  const mountControlUI = () => {
    var _a2;
    const target = resolveTarget(options.root);
    const doc = (_a2 = target == null ? void 0 : target.ownerDocument) != null ? _a2 : typeof document !== "undefined" ? document : null;
    if (!(doc == null ? void 0 : doc.body)) return () => {
    };
    const mountTarget = resolveMountTarget(doc, options.uiMount);
    const button = doc.createElement("button");
    button.type = "button";
    button.className = "a11y-toggle a11y-toggle--control";
    if (options.buttonClassName) button.classList.add(options.buttonClassName);
    const panel = createControlPanel(instance, doc, {
      ...options,
      locale: state.locale,
      panelClassName: options.panelClassName
    });
    if (!options.disableAutoPosition && !options.uiMount) {
      applyPresetPosition(button, state.uiControlPosition, { edge: 16, stack: 16 });
      applyPresetPosition(panel.root, state.uiControlPosition, { edge: 16, stack: 80 });
    }
    mountTarget.append(button, panel.root);
    panel.setOpen(state.openPanel);
    setPanelOpen = panel.setOpen;
    renderToggleButtonContent(button, doc, options.button, "A11Y");
    const onTogglePanel = () => instance.togglePanel();
    const onOutsidePointerDown = (event) => {
      if (!state.openPanel) return;
      const targetNode = event.target;
      if (!targetNode) return;
      if (panel.root.contains(targetNode) || button.contains(targetNode)) return;
      instance.closePanel();
    };
    button.addEventListener("click", onTogglePanel);
    if (options.closeOnOutsideClick) {
      doc.addEventListener("pointerdown", onOutsidePointerDown);
    }
    return () => {
      button.removeEventListener("click", onTogglePanel);
      if (options.closeOnOutsideClick) {
        doc.removeEventListener("pointerdown", onOutsidePointerDown);
      }
      panel.destroy();
      button.remove();
      setPanelOpen = null;
    };
  };
  const remountUI = () => {
    destroyUI == null ? void 0 : destroyUI();
    destroyUI = mode === "control" ? mountControlUI() : mountAutoUI();
  };
  const instance = {
    enable() {
      instance.update({ enabled: true });
    },
    disable() {
      instance.update({ enabled: false });
    },
    toggle() {
      instance.update({ enabled: !state.enabled });
    },
    reset() {
      instance.update({ ...defaultState });
    },
    getState() {
      return { ...state };
    },
    update(next) {
      state = { ...state, ...next };
      if (state.enabled) apply(state, options);
      else clean(options);
      setPanelOpen == null ? void 0 : setPanelOpen(state.openPanel);
      persist(state, state.storageMode);
    },
    openPanel() {
      if (mode !== "control") return;
      instance.update({ openPanel: true });
    },
    closePanel() {
      if (mode !== "control") return;
      instance.update({ openPanel: false });
    },
    togglePanel() {
      if (mode !== "control") return;
      instance.update({ openPanel: !state.openPanel });
    },
    setLocale(value) {
      if (state.locale === value) return;
      state = { ...state, locale: value };
      persist(state, state.storageMode);
      remountUI();
    },
    destroy() {
      destroyUI == null ? void 0 : destroyUI();
      destroyUI = null;
      clean(options);
      state.enabled = false;
    },
    setFontScale(value) {
      instance.update({ fontScale: value });
    },
    setFontFamily(value) {
      instance.update({ fontFamily: value });
    },
    setLineHeight(value) {
      instance.update({ lineHeight: value });
    },
    setTextAlign(value) {
      instance.update({ textAlign: value });
    },
    setLetterSpacing(value) {
      instance.update({ letterSpacing: value });
    },
    setWordSpacing(value) {
      instance.update({ wordSpacing: value });
    },
    setParagraphSpacing(value) {
      instance.update({ paragraphSpacing: value });
    },
    setContrastMode(value) {
      instance.update({ contrastMode: value });
    },
    setColorScheme(value) {
      instance.update({ colorScheme: value });
    },
    setImagesMode(value) {
      instance.update({ imagesMode: value });
    },
    setUiControlPosition(value) {
      instance.update({ uiControlPosition: value });
      remountUI();
    },
    setReduceMotion(value) {
      instance.update({ reduceMotion: value });
    },
    setLinkStyle(value) {
      instance.update({ linkStyle: value });
    },
    setStorageMode(value) {
      instance.update({ storageMode: value });
    }
  };
  if (state.enabled) apply(state, options);
  remountUI();
  return instance;
}
export {
  createA11yView
};
