export interface Conditions {
  /** `@media (hover: hover),&:is(:hover, [data-hover]):not(:disabled, [data-disabled])` */
  _hover: string
  /** `&:is(:active, [data-active]):not(:disabled, [data-disabled], [data-state=open])` */
  _active: string
  /** `&:is(:focus, [data-focus])` */
  _focus: string
  /** `&:is(:focus-within, [data-focus-within])` */
  _focusWithin: string
  /** `&:is(:focus-visible, [data-focus-visible])` */
  _focusVisible: string
  /** `&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])` */
  _disabled: string
  /** `&:visited` */
  _visited: string
  /** `&:target` */
  _target: string
  /** `&:is([data-readonly], [aria-readonly=true], [readonly])` */
  _readOnly: string
  /** `&:read-write` */
  _readWrite: string
  /** `&:is(:empty, [data-empty])` */
  _empty: string
  /** `&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked])` */
  _checked: string
  /** `&:enabled` */
  _enabled: string
  /** `&:is([aria-expanded=true], [data-expanded], [data-state=expanded])` */
  _expanded: string
  /** `&[data-highlighted]` */
  _highlighted: string
  /** `&[data-complete]` */
  _complete: string
  /** `&[data-incomplete]` */
  _incomplete: string
  /** `&[data-dragging]` */
  _dragging: string
  /** `&::before` */
  _before: string
  /** `&::after` */
  _after: string
  /** `&::first-letter` */
  _firstLetter: string
  /** `&::first-line` */
  _firstLine: string
  /** `&::marker` */
  _marker: string
  /** `&::selection` */
  _selection: string
  /** `&::file-selector-button` */
  _file: string
  /** `&::backdrop` */
  _backdrop: string
  /** `&:first-of-type` */
  _first: string
  /** `&:last-of-type` */
  _last: string
  /** `&:not(:first-of-type)` */
  _notFirst: string
  /** `&:not(:last-of-type)` */
  _notLast: string
  /** `&:only-child` */
  _only: string
  /** `&:nth-of-type(even)` */
  _even: string
  /** `&:nth-of-type(odd)` */
  _odd: string
  /** `.peer:is(:focus, [data-focus]) ~ &` */
  _peerFocus: string
  /** `.peer:is(:hover, [data-hover]):not(:disabled, [data-disabled]) ~ &` */
  _peerHover: string
  /** `.peer:is(:active, [data-active]):not(:disabled, [data-disabled]) ~ &` */
  _peerActive: string
  /** `.peer:focus-within ~ &` */
  _peerFocusWithin: string
  /** `.peer:is(:focus-visible, [data-focus-visible]) ~ &` */
  _peerFocusVisible: string
  /** `.peer:is(:disabled, [disabled], [data-disabled]) ~ &` */
  _peerDisabled: string
  /** `.peer:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) ~ &` */
  _peerChecked: string
  /** `.peer:is(:invalid, [data-invalid], [aria-invalid=true]) ~ &` */
  _peerInvalid: string
  /** `.peer:is([aria-expanded=true], [data-expanded], [data-state=expanded]) ~ &` */
  _peerExpanded: string
  /** `.peer:placeholder-shown ~ &` */
  _peerPlaceholderShown: string
  /** `.group:is(:focus, [data-focus]) &` */
  _groupFocus: string
  /** `.group:is(:hover, [data-hover]):not(:disabled, [data-disabled]) &` */
  _groupHover: string
  /** `.group:is(:active, [data-active]):not(:disabled, [data-disabled]) &` */
  _groupActive: string
  /** `.group:focus-within &` */
  _groupFocusWithin: string
  /** `.group:is(:focus-visible, [data-focus-visible]) &` */
  _groupFocusVisible: string
  /** `.group:is(:disabled, [disabled], [data-disabled]) &` */
  _groupDisabled: string
  /** `.group:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) &` */
  _groupChecked: string
  /** `.group:is([aria-expanded=true], [data-expanded], [data-state=expanded]) &` */
  _groupExpanded: string
  /** `.group:invalid &` */
  _groupInvalid: string
  /** `&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])` */
  _indeterminate: string
  /** `&:is([data-required], [aria-required=true])` */
  _required: string
  /** `&:is([data-valid], [data-state=valid])` */
  _valid: string
  /** `&:is([data-invalid], [aria-invalid=true], [data-state=invalid])` */
  _invalid: string
  /** `&:autofill` */
  _autofill: string
  /** `&:is(:in-range, [data-in-range])` */
  _inRange: string
  /** `&:is(:out-of-range, [data-outside-range])` */
  _outOfRange: string
  /** `&::placeholder, &[data-placeholder]` */
  _placeholder: string
  /** `&:is(:placeholder-shown, [data-placeholder-shown])` */
  _placeholderShown: string
  /** `&:is([aria-pressed=true], [data-pressed])` */
  _pressed: string
  /** `&:is([aria-selected=true], [data-selected])` */
  _selected: string
  /** `&:is([aria-grabbed=true], [data-grabbed])` */
  _grabbed: string
  /** `&[data-state=under-value]` */
  _underValue: string
  /** `&[data-state=over-value]` */
  _overValue: string
  /** `&[data-state=at-value]` */
  _atValue: string
  /** `&:default` */
  _default: string
  /** `&:optional` */
  _optional: string
  /** `&:is([open], [data-open], [data-state=open])` */
  _open: string
  /** `&:is([closed], [data-closed], [data-state=closed])` */
  _closed: string
  /** `&is(:fullscreen, [data-fullscreen])` */
  _fullscreen: string
  /** `&:is([data-loading], [aria-busy=true])` */
  _loading: string
  /** `&:is([hidden], [data-hidden])` */
  _hidden: string
  /** `&[data-current]` */
  _current: string
  /** `&[aria-current=page]` */
  _currentPage: string
  /** `&[aria-current=step]` */
  _currentStep: string
  /** `&[data-today]` */
  _today: string
  /** `&[data-unavailable]` */
  _unavailable: string
  /** `&[data-range-start]` */
  _rangeStart: string
  /** `&[data-range-end]` */
  _rangeEnd: string
  /** `&[data-now]` */
  _now: string
  /** `&[data-topmost]` */
  _topmost: string
  /** `@media (prefers-reduced-motion: reduce)` */
  _motionReduce: string
  /** `@media (prefers-reduced-motion: no-preference)` */
  _motionSafe: string
  /** `@media print` */
  _print: string
  /** `@media (orientation: landscape)` */
  _landscape: string
  /** `@media (orientation: portrait)` */
  _portrait: string
  /** `.dark &, .dark .chakra-theme:not(.light) &` */
  _dark: string
  /** `:root &, .light &` */
  _light: string
  /** `@media (prefers-color-scheme: dark)` */
  _osDark: string
  /** `@media (prefers-color-scheme: light)` */
  _osLight: string
  /** `@media (forced-colors: active)` */
  _highContrast: string
  /** `@media (prefers-contrast: less)` */
  _lessContrast: string
  /** `@media (prefers-contrast: more)` */
  _moreContrast: string
  /** `[dir=ltr] &` */
  _ltr: string
  /** `[dir=rtl] &` */
  _rtl: string
  /** `&::-webkit-scrollbar` */
  _scrollbar: string
  /** `&::-webkit-scrollbar-thumb` */
  _scrollbarThumb: string
  /** `&::-webkit-scrollbar-track` */
  _scrollbarTrack: string
  /** `&[data-orientation=horizontal]` */
  _horizontal: string
  /** `&[data-orientation=vertical]` */
  _vertical: string
  /** `& :where(svg)` */
  _icon: string
  /** `@starting-style` */
  _starting: string
  /** `@media screen and (min-width: 20rem)` */
  mobileSm: string
  /** `@media screen and (min-width: 20rem) and (max-width: 23.435rem)` */
  mobileSmOnly: string
  /** `@media screen and (max-width: 19.9975rem)` */
  mobileSmDown: string
  /** `@media screen and (min-width: 23.4375rem)` */
  mobile: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 26.56rem)` */
  mobileOnly: string
  /** `@media screen and (max-width: 23.435rem)` */
  mobileDown: string
  /** `@media screen and (min-width: 26.5625rem)` */
  mobileLg: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 29.9975rem)` */
  mobileLgOnly: string
  /** `@media screen and (max-width: 26.56rem)` */
  mobileLgDown: string
  /** `@media screen and (min-width: 30rem)` */
  sm: string
  /** `@media screen and (min-width: 30rem) and (max-width: 37.4975rem)` */
  smOnly: string
  /** `@media screen and (max-width: 29.9975rem)` */
  smDown: string
  /** `@media screen and (min-width: 37.5rem)` */
  tabletSm: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 47.9975rem)` */
  tabletSmOnly: string
  /** `@media screen and (max-width: 37.4975rem)` */
  tabletSmDown: string
  /** `@media screen and (min-width: 48rem)` */
  md: string
  /** `@media screen and (min-width: 48rem) and (max-width: 47.9975rem)` */
  mdOnly: string
  /** `@media screen and (max-width: 47.9975rem)` */
  mdDown: string
  /** `@media screen and (min-width: 48rem)` */
  tablet: string
  /** `@media screen and (min-width: 48rem) and (max-width: 61.9975rem)` */
  tabletOnly: string
  /** `@media screen and (max-width: 47.9975rem)` */
  tabletDown: string
  /** `@media screen and (min-width: 62rem)` */
  tabletLg: string
  /** `@media screen and (min-width: 62rem) and (max-width: 63.9975rem)` */
  tabletLgOnly: string
  /** `@media screen and (max-width: 61.9975rem)` */
  tabletLgDown: string
  /** `@media screen and (min-width: 64rem)` */
  lg: string
  /** `@media screen and (min-width: 64rem) and (max-width: 63.9975rem)` */
  lgOnly: string
  /** `@media screen and (max-width: 63.9975rem)` */
  lgDown: string
  /** `@media screen and (min-width: 64rem)` */
  laptopSm: string
  /** `@media screen and (min-width: 64rem) and (max-width: 74.9975rem)` */
  laptopSmOnly: string
  /** `@media screen and (max-width: 63.9975rem)` */
  laptopSmDown: string
  /** `@media screen and (min-width: 75rem)` */
  desktop: string
  /** `@media screen and (min-width: 75rem) and (max-width: 79.9975rem)` */
  desktopOnly: string
  /** `@media screen and (max-width: 74.9975rem)` */
  desktopDown: string
  /** `@media screen and (min-width: 80rem)` */
  xl: string
  /** `@media screen and (min-width: 80rem) and (max-width: 87.4975rem)` */
  xlOnly: string
  /** `@media screen and (max-width: 79.9975rem)` */
  xlDown: string
  /** `@media screen and (min-width: 87.5rem)` */
  wide: string
  /** `@media screen and (min-width: 87.5rem) and (max-width: 95.9975rem)` */
  wideOnly: string
  /** `@media screen and (max-width: 87.4975rem)` */
  wideDown: string
  /** `@media screen and (min-width: 96rem)` */
  "2xl": string
  /** `@media screen and (min-width: 96rem) and (max-width: 99.9975rem)` */
  "2xlOnly": string
  /** `@media screen and (max-width: 95.9975rem)` */
  "2xlDown": string
  /** `@media screen and (min-width: 100rem)` */
  ultra: string
  /** `@media screen and (min-width: 100rem) and (max-width: 119.9975rem)` */
  ultraOnly: string
  /** `@media screen and (max-width: 99.9975rem)` */
  ultraDown: string
  /** `@media screen and (min-width: 120rem)` */
  ultraHd: string
  /** `@media screen and (min-width: 120rem) and (max-width: 159.9975rem)` */
  ultraHdOnly: string
  /** `@media screen and (max-width: 119.9975rem)` */
  ultraHdDown: string
  /** `@media screen and (min-width: 160rem)` */
  fourK: string
  /** `@media screen and (min-width: 160rem)` */
  fourKOnly: string
  /** `@media screen and (max-width: 159.9975rem)` */
  fourKDown: string
  /** `@media screen and (min-width: 20rem) and (max-width: 23.435rem)` */
  mobileSmToMobile: string
  /** `@media screen and (min-width: 20rem) and (max-width: 26.56rem)` */
  mobileSmToMobileLg: string
  /** `@media screen and (min-width: 20rem) and (max-width: 29.9975rem)` */
  mobileSmToSm: string
  /** `@media screen and (min-width: 20rem) and (max-width: 37.4975rem)` */
  mobileSmToTabletSm: string
  /** `@media screen and (min-width: 20rem) and (max-width: 47.9975rem)` */
  mobileSmToMd: string
  /** `@media screen and (min-width: 20rem) and (max-width: 47.9975rem)` */
  mobileSmToTablet: string
  /** `@media screen and (min-width: 20rem) and (max-width: 61.9975rem)` */
  mobileSmToTabletLg: string
  /** `@media screen and (min-width: 20rem) and (max-width: 63.9975rem)` */
  mobileSmToLg: string
  /** `@media screen and (min-width: 20rem) and (max-width: 63.9975rem)` */
  mobileSmToLaptopSm: string
  /** `@media screen and (min-width: 20rem) and (max-width: 74.9975rem)` */
  mobileSmToDesktop: string
  /** `@media screen and (min-width: 20rem) and (max-width: 79.9975rem)` */
  mobileSmToXl: string
  /** `@media screen and (min-width: 20rem) and (max-width: 87.4975rem)` */
  mobileSmToWide: string
  /** `@media screen and (min-width: 20rem) and (max-width: 95.9975rem)` */
  mobileSmTo2xl: string
  /** `@media screen and (min-width: 20rem) and (max-width: 99.9975rem)` */
  mobileSmToUltra: string
  /** `@media screen and (min-width: 20rem) and (max-width: 119.9975rem)` */
  mobileSmToUltraHd: string
  /** `@media screen and (min-width: 20rem) and (max-width: 159.9975rem)` */
  mobileSmToFourK: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 26.56rem)` */
  mobileToMobileLg: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 29.9975rem)` */
  mobileToSm: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 37.4975rem)` */
  mobileToTabletSm: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 47.9975rem)` */
  mobileToMd: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 47.9975rem)` */
  mobileToTablet: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 61.9975rem)` */
  mobileToTabletLg: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 63.9975rem)` */
  mobileToLg: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 63.9975rem)` */
  mobileToLaptopSm: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 74.9975rem)` */
  mobileToDesktop: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 79.9975rem)` */
  mobileToXl: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 87.4975rem)` */
  mobileToWide: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 95.9975rem)` */
  mobileTo2xl: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 99.9975rem)` */
  mobileToUltra: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 119.9975rem)` */
  mobileToUltraHd: string
  /** `@media screen and (min-width: 23.4375rem) and (max-width: 159.9975rem)` */
  mobileToFourK: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 29.9975rem)` */
  mobileLgToSm: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 37.4975rem)` */
  mobileLgToTabletSm: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 47.9975rem)` */
  mobileLgToMd: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 47.9975rem)` */
  mobileLgToTablet: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 61.9975rem)` */
  mobileLgToTabletLg: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 63.9975rem)` */
  mobileLgToLg: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 63.9975rem)` */
  mobileLgToLaptopSm: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 74.9975rem)` */
  mobileLgToDesktop: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 79.9975rem)` */
  mobileLgToXl: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 87.4975rem)` */
  mobileLgToWide: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 95.9975rem)` */
  mobileLgTo2xl: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 99.9975rem)` */
  mobileLgToUltra: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 119.9975rem)` */
  mobileLgToUltraHd: string
  /** `@media screen and (min-width: 26.5625rem) and (max-width: 159.9975rem)` */
  mobileLgToFourK: string
  /** `@media screen and (min-width: 30rem) and (max-width: 37.4975rem)` */
  smToTabletSm: string
  /** `@media screen and (min-width: 30rem) and (max-width: 47.9975rem)` */
  smToMd: string
  /** `@media screen and (min-width: 30rem) and (max-width: 47.9975rem)` */
  smToTablet: string
  /** `@media screen and (min-width: 30rem) and (max-width: 61.9975rem)` */
  smToTabletLg: string
  /** `@media screen and (min-width: 30rem) and (max-width: 63.9975rem)` */
  smToLg: string
  /** `@media screen and (min-width: 30rem) and (max-width: 63.9975rem)` */
  smToLaptopSm: string
  /** `@media screen and (min-width: 30rem) and (max-width: 74.9975rem)` */
  smToDesktop: string
  /** `@media screen and (min-width: 30rem) and (max-width: 79.9975rem)` */
  smToXl: string
  /** `@media screen and (min-width: 30rem) and (max-width: 87.4975rem)` */
  smToWide: string
  /** `@media screen and (min-width: 30rem) and (max-width: 95.9975rem)` */
  smTo2xl: string
  /** `@media screen and (min-width: 30rem) and (max-width: 99.9975rem)` */
  smToUltra: string
  /** `@media screen and (min-width: 30rem) and (max-width: 119.9975rem)` */
  smToUltraHd: string
  /** `@media screen and (min-width: 30rem) and (max-width: 159.9975rem)` */
  smToFourK: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 47.9975rem)` */
  tabletSmToMd: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 47.9975rem)` */
  tabletSmToTablet: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 61.9975rem)` */
  tabletSmToTabletLg: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 63.9975rem)` */
  tabletSmToLg: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 63.9975rem)` */
  tabletSmToLaptopSm: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 74.9975rem)` */
  tabletSmToDesktop: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 79.9975rem)` */
  tabletSmToXl: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 87.4975rem)` */
  tabletSmToWide: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 95.9975rem)` */
  tabletSmTo2xl: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 99.9975rem)` */
  tabletSmToUltra: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 119.9975rem)` */
  tabletSmToUltraHd: string
  /** `@media screen and (min-width: 37.5rem) and (max-width: 159.9975rem)` */
  tabletSmToFourK: string
  /** `@media screen and (min-width: 48rem) and (max-width: 47.9975rem)` */
  mdToTablet: string
  /** `@media screen and (min-width: 48rem) and (max-width: 61.9975rem)` */
  mdToTabletLg: string
  /** `@media screen and (min-width: 48rem) and (max-width: 63.9975rem)` */
  mdToLg: string
  /** `@media screen and (min-width: 48rem) and (max-width: 63.9975rem)` */
  mdToLaptopSm: string
  /** `@media screen and (min-width: 48rem) and (max-width: 74.9975rem)` */
  mdToDesktop: string
  /** `@media screen and (min-width: 48rem) and (max-width: 79.9975rem)` */
  mdToXl: string
  /** `@media screen and (min-width: 48rem) and (max-width: 87.4975rem)` */
  mdToWide: string
  /** `@media screen and (min-width: 48rem) and (max-width: 95.9975rem)` */
  mdTo2xl: string
  /** `@media screen and (min-width: 48rem) and (max-width: 99.9975rem)` */
  mdToUltra: string
  /** `@media screen and (min-width: 48rem) and (max-width: 119.9975rem)` */
  mdToUltraHd: string
  /** `@media screen and (min-width: 48rem) and (max-width: 159.9975rem)` */
  mdToFourK: string
  /** `@media screen and (min-width: 48rem) and (max-width: 61.9975rem)` */
  tabletToTabletLg: string
  /** `@media screen and (min-width: 48rem) and (max-width: 63.9975rem)` */
  tabletToLg: string
  /** `@media screen and (min-width: 48rem) and (max-width: 63.9975rem)` */
  tabletToLaptopSm: string
  /** `@media screen and (min-width: 48rem) and (max-width: 74.9975rem)` */
  tabletToDesktop: string
  /** `@media screen and (min-width: 48rem) and (max-width: 79.9975rem)` */
  tabletToXl: string
  /** `@media screen and (min-width: 48rem) and (max-width: 87.4975rem)` */
  tabletToWide: string
  /** `@media screen and (min-width: 48rem) and (max-width: 95.9975rem)` */
  tabletTo2xl: string
  /** `@media screen and (min-width: 48rem) and (max-width: 99.9975rem)` */
  tabletToUltra: string
  /** `@media screen and (min-width: 48rem) and (max-width: 119.9975rem)` */
  tabletToUltraHd: string
  /** `@media screen and (min-width: 48rem) and (max-width: 159.9975rem)` */
  tabletToFourK: string
  /** `@media screen and (min-width: 62rem) and (max-width: 63.9975rem)` */
  tabletLgToLg: string
  /** `@media screen and (min-width: 62rem) and (max-width: 63.9975rem)` */
  tabletLgToLaptopSm: string
  /** `@media screen and (min-width: 62rem) and (max-width: 74.9975rem)` */
  tabletLgToDesktop: string
  /** `@media screen and (min-width: 62rem) and (max-width: 79.9975rem)` */
  tabletLgToXl: string
  /** `@media screen and (min-width: 62rem) and (max-width: 87.4975rem)` */
  tabletLgToWide: string
  /** `@media screen and (min-width: 62rem) and (max-width: 95.9975rem)` */
  tabletLgTo2xl: string
  /** `@media screen and (min-width: 62rem) and (max-width: 99.9975rem)` */
  tabletLgToUltra: string
  /** `@media screen and (min-width: 62rem) and (max-width: 119.9975rem)` */
  tabletLgToUltraHd: string
  /** `@media screen and (min-width: 62rem) and (max-width: 159.9975rem)` */
  tabletLgToFourK: string
  /** `@media screen and (min-width: 64rem) and (max-width: 63.9975rem)` */
  lgToLaptopSm: string
  /** `@media screen and (min-width: 64rem) and (max-width: 74.9975rem)` */
  lgToDesktop: string
  /** `@media screen and (min-width: 64rem) and (max-width: 79.9975rem)` */
  lgToXl: string
  /** `@media screen and (min-width: 64rem) and (max-width: 87.4975rem)` */
  lgToWide: string
  /** `@media screen and (min-width: 64rem) and (max-width: 95.9975rem)` */
  lgTo2xl: string
  /** `@media screen and (min-width: 64rem) and (max-width: 99.9975rem)` */
  lgToUltra: string
  /** `@media screen and (min-width: 64rem) and (max-width: 119.9975rem)` */
  lgToUltraHd: string
  /** `@media screen and (min-width: 64rem) and (max-width: 159.9975rem)` */
  lgToFourK: string
  /** `@media screen and (min-width: 64rem) and (max-width: 74.9975rem)` */
  laptopSmToDesktop: string
  /** `@media screen and (min-width: 64rem) and (max-width: 79.9975rem)` */
  laptopSmToXl: string
  /** `@media screen and (min-width: 64rem) and (max-width: 87.4975rem)` */
  laptopSmToWide: string
  /** `@media screen and (min-width: 64rem) and (max-width: 95.9975rem)` */
  laptopSmTo2xl: string
  /** `@media screen and (min-width: 64rem) and (max-width: 99.9975rem)` */
  laptopSmToUltra: string
  /** `@media screen and (min-width: 64rem) and (max-width: 119.9975rem)` */
  laptopSmToUltraHd: string
  /** `@media screen and (min-width: 64rem) and (max-width: 159.9975rem)` */
  laptopSmToFourK: string
  /** `@media screen and (min-width: 75rem) and (max-width: 79.9975rem)` */
  desktopToXl: string
  /** `@media screen and (min-width: 75rem) and (max-width: 87.4975rem)` */
  desktopToWide: string
  /** `@media screen and (min-width: 75rem) and (max-width: 95.9975rem)` */
  desktopTo2xl: string
  /** `@media screen and (min-width: 75rem) and (max-width: 99.9975rem)` */
  desktopToUltra: string
  /** `@media screen and (min-width: 75rem) and (max-width: 119.9975rem)` */
  desktopToUltraHd: string
  /** `@media screen and (min-width: 75rem) and (max-width: 159.9975rem)` */
  desktopToFourK: string
  /** `@media screen and (min-width: 80rem) and (max-width: 87.4975rem)` */
  xlToWide: string
  /** `@media screen and (min-width: 80rem) and (max-width: 95.9975rem)` */
  xlTo2xl: string
  /** `@media screen and (min-width: 80rem) and (max-width: 99.9975rem)` */
  xlToUltra: string
  /** `@media screen and (min-width: 80rem) and (max-width: 119.9975rem)` */
  xlToUltraHd: string
  /** `@media screen and (min-width: 80rem) and (max-width: 159.9975rem)` */
  xlToFourK: string
  /** `@media screen and (min-width: 87.5rem) and (max-width: 95.9975rem)` */
  wideTo2xl: string
  /** `@media screen and (min-width: 87.5rem) and (max-width: 99.9975rem)` */
  wideToUltra: string
  /** `@media screen and (min-width: 87.5rem) and (max-width: 119.9975rem)` */
  wideToUltraHd: string
  /** `@media screen and (min-width: 87.5rem) and (max-width: 159.9975rem)` */
  wideToFourK: string
  /** `@media screen and (min-width: 96rem) and (max-width: 99.9975rem)` */
  "2xlToUltra": string
  /** `@media screen and (min-width: 96rem) and (max-width: 119.9975rem)` */
  "2xlToUltraHd": string
  /** `@media screen and (min-width: 96rem) and (max-width: 159.9975rem)` */
  "2xlToFourK": string
  /** `@media screen and (min-width: 100rem) and (max-width: 119.9975rem)` */
  ultraToUltraHd: string
  /** `@media screen and (min-width: 100rem) and (max-width: 159.9975rem)` */
  ultraToFourK: string
  /** `@media screen and (min-width: 120rem) and (max-width: 159.9975rem)` */
  ultraHdToFourK: string
  /** The base (=no conditions) styles to apply  */
  base: string
}
