type ActivationMode = 'auto' | 'control';
type FontScale = 1 | 1.25 | 1.5 | 2;
type FontFamily = 'default' | 'serif';
type LineHeight = 'default' | 1.5 | 2 | 2.5;
type TextAlign = 'default' | 'left';
type LetterSpacing = 'default' | 0.12 | 0.16 | 0.2;
type WordSpacing = 'default' | 0.16 | 0.2 | 0.5;
type ParagraphSpacing = 'default' | 2 | 2.25 | 2.5;
type ContrastMode = 'default' | 'high' | 'inverse';
type ColorScheme = 'default' | 'light' | 'dark' | 'sepia';
type ImagesMode = 'default' | 'show' | 'hide' | 'grayscale';
type ImagesHideStrategy = 'transparent' | 'collapse';
type UiControlPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type ReduceMotion = 'default' | 'on' | 'off';
type LinkStyle = 'default' | 'underline';
type StorageMode = 'none' | 'localStorage' | 'sessionStorage';
type LocaleMode = 'ru' | 'en';
interface ImagesOptions {
    hideStrategy?: ImagesHideStrategy;
    hideSelectors?: string[];
    hideClass?: string;
}
interface ButtonOptions {
    label?: string;
    icon?: string;
    position?: UiControlPosition;
    ariaLabel?: string;
    showLabel?: boolean;
    useDefaultIcon?: boolean;
}
interface PanelLabels {
    reset: string;
    fontScale: string;
    contrast: string;
    colorScheme: string;
    images: string;
    fontFamily: string;
    textAlign: string;
    lineHeight: string;
    letterSpacing: string;
    wordSpacing: string;
    paragraphSpacing: string;
    linkStyle: string;
    motion: string;
    default: string;
    show: string;
    hide: string;
    grayscale: string;
    high: string;
    inverse: string;
    light: string;
    dark: string;
    sepia: string;
    underline: string;
    left: string;
    serif: string;
    on: string;
    off: string;
}
interface A11yViewOptions {
    locale?: LocaleMode;
    enabled?: boolean;
    labels?: Partial<PanelLabels>;
    activationMode?: ActivationMode;
    autoPreset?: Partial<A11yViewState>;
    fontScale?: FontScale;
    fontFamily?: FontFamily;
    lineHeight?: LineHeight;
    textAlign?: TextAlign;
    letterSpacing?: LetterSpacing;
    wordSpacing?: WordSpacing;
    paragraphSpacing?: ParagraphSpacing;
    contrastMode?: ContrastMode;
    colorScheme?: ColorScheme;
    imagesMode?: ImagesMode;
    images?: ImagesOptions;
    uiControlPosition?: UiControlPosition;
    buttonClassName?: string;
    disableAutoPosition?: boolean;
    panelClassName?: string;
    uiMount?: string | HTMLElement;
    button?: ButtonOptions;
    reduceMotion?: ReduceMotion;
    linkStyle?: LinkStyle;
    storageMode?: StorageMode;
    closeOnOutsideClick?: boolean;
    cssClass?: string;
    openPanel?: boolean;
    root?: HTMLElement | Document;
    initial?: Partial<A11yViewState>;
}
interface A11yViewState {
    enabled: boolean;
    locale: LocaleMode;
    fontScale: FontScale;
    fontFamily: FontFamily;
    lineHeight: LineHeight;
    textAlign: TextAlign;
    letterSpacing: LetterSpacing;
    wordSpacing: WordSpacing;
    paragraphSpacing: ParagraphSpacing;
    contrastMode: ContrastMode;
    colorScheme: ColorScheme;
    imagesMode: ImagesMode;
    uiControlPosition: UiControlPosition;
    reduceMotion: ReduceMotion;
    linkStyle: LinkStyle;
    storageMode: StorageMode;
    openPanel: boolean;
}
interface A11yViewInstance {
    enable(): void;
    disable(): void;
    toggle(): void;
    reset(): void;
    getState(): A11yViewState;
    update(next: Partial<A11yViewState>): void;
    destroy(): void;
    openPanel(): void;
    closePanel(): void;
    togglePanel(): void;
    setLocale(value: LocaleMode): void;
    setFontScale(value: FontScale): void;
    setFontFamily(value: FontFamily): void;
    setLineHeight(value: LineHeight): void;
    setTextAlign(value: TextAlign): void;
    setLetterSpacing(value: LetterSpacing): void;
    setWordSpacing(value: WordSpacing): void;
    setParagraphSpacing(value: ParagraphSpacing): void;
    setContrastMode(value: ContrastMode): void;
    setColorScheme(value: ColorScheme): void;
    setImagesMode(value: ImagesMode): void;
    setUiControlPosition(value: UiControlPosition): void;
    setReduceMotion(value: ReduceMotion): void;
    setLinkStyle(value: LinkStyle): void;
    setStorageMode(value: StorageMode): void;
}

declare function createA11yView(options?: A11yViewOptions): A11yViewInstance;

export { createA11yView };
