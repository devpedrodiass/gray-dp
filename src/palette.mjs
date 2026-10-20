// Single source of truth for every color in the theme.
// Noir: pure neutral grays, no hue. Roles are told apart by luminance and font style.
// Brightest text stops at #ececec and the darkest surface at #0e0e0e to avoid glare.

export const dark = {
  gray: {
    950: '#0e0e0e', // deepest: shadows, widget borders
    900: '#121212', // activity bar, title bar, status bar
    850: '#171717', // sidebar, panel
    800: '#1c1c1c', // editor background
    750: '#232323', // current line, hover
    700: '#2b2b2b', // inactive selection, tab borders
    600: '#3a3a3a', // active selection, scrollbar
    500: '#555555', // line numbers, guides
    400: '#737373', // muted text
    300: '#969696', // secondary text
    200: '#bdbdbd', // UI text
    100: '#d6d6d6', // editor foreground
    50: '#ececec', // emphasis
  },
  // UI accent (focus rings, active tab, cursor) — also gray.
  accent: '#d6d6d6',
  // Base of translucent highlights (find matches, scrollbars): lighten on dark themes.
  overlay: '#ffffff',

  // Syntax roles, brightest first. Each role is [color, fontStyle].
  // Every font style carries one meaning, so the eye learns it:
  //   bold          → language keywords
  //   italic        → the type world (types, interfaces, generics, type-only keywords)
  //   underline     → the place a name is defined
  //   strikethrough → deprecated (semantic tokens)
  //   regular       → runtime values
  syntax: {
    keyword: ['#f2f2f2', 'bold'], // if, else, for, return, await, try, throw, switch
    keywordOperator: ['#f2f2f2', ''], // new, typeof, instanceof, delete, void, in
    component: ['#f2f2f2', 'bold'], // JSX components: <Header />
    func: ['#dcdcdc', ''], // function / method calls
    funcDefinition: ['#dcdcdc', 'underline'], // function / method names where declared
    decorator: ['#dcdcdc', 'bold'], // @Decorator
    number: ['#dcdcdc', ''], // numbers, booleans, null
    constant: ['#dcdcdc', ''], // CONSTANTS, enum members
    regexp: ['#dcdcdc', ''], // regex, escapes — pop inside dim strings
    regexpOperator: ['#dcdcdc', 'bold'], // ^ $ + * ( ) inside regex
    type: ['#cfcfcf', 'italic'], // User, string, Promise
    typeDefinition: ['#cfcfcf', 'italic underline'], // class / interface / type names where declared
    typeParameter: ['#cfcfcf', 'bold italic'], // generics: T, K, V
    parameter: ['#cfcfcf', ''], // function parameters
    variable: ['#bdbdbd', ''], // plain variables
    tag: ['#b4b4b4', ''], // native HTML tags: <div>, <h2>
    storage: ['#b4b4b4', 'bold'], // const, let, function, class, async, this
    keywordType: ['#b4b4b4', 'bold italic'], // interface, type, keyof, as, satisfies, infer, is
    property: ['#a8a8a8', ''], // object properties, keys, JSX attributes
    keywordModule: ['#9a9a9a', 'bold'], // import, export, from — boilerplate, recessed
    operator: ['#9a9a9a', ''], // = => + &&
    string: ['#8a8a8a', ''], // strings
    punctuation: ['#787878', ''], // ; , . ( ) { }
    comment: ['#6b6b6b', 'italic'], // comments — recessed
    commentTag: ['#8a8a8a', 'bold italic'], // @param, @returns
    invalid: ['#f2f2f2', 'bold underline strikethrough'],
  },

  // The only hue in the theme: muted signals for diagnostics, source control and the terminal.
  signal: {
    error: '#c97b7b',
    warning: '#c9a96b',
    info: '#7b9cc9',
    added: '#7fa98a',
    modified: '#8fa3c4',
    deleted: '#c97b7b',
    magenta: '#a98fb3',
    cyan: '#7fa9a9',
  },
};

// Pure black editor for OLED / maximum depth. Same syntax and signals as `dark`;
// surfaces step *up* from the editor, so borders become the lightest surface.
export const black = {
  ...dark,
  gray: {
    ...dark.gray,
    950: '#1f1f1f', // borders — must lift off pure black
    900: '#000000', // activity bar, title bar, status bar
    850: '#0a0a0a', // sidebar, panel
    800: '#000000', // editor background
    750: '#121212', // current line, hover
    700: '#1c1c1c', // inactive selection, tab borders
    600: '#2e2e2e', // active selection, scrollbar
  },
};

// Light gray, not white. Same roles and font styles as `dark`, with luminance inverted:
// the darker the text, the stronger the role. Index names keep their UI meaning.
export const light = {
  gray: {
    950: '#c2c2c2', // borders
    900: '#d4d4d4', // activity bar, title bar, status bar
    850: '#dcdcdc', // sidebar, panel
    800: '#e4e4e4', // editor background
    750: '#d9d9d9', // current line, hover
    700: '#cfcfcf', // inactive selection, tab borders
    600: '#bcbcbc', // active selection, scrollbar
    500: '#8c8c8c', // line numbers, guides
    400: '#6b6b6b', // muted text
    300: '#525252', // secondary text
    200: '#3b3b3b', // UI text
    100: '#262626', // editor foreground
    50: '#141414', // emphasis
  },
  accent: '#262626',
  overlay: '#000000',

  syntax: {
    keyword: ['#141414', 'bold'],
    keywordOperator: ['#141414', ''],
    component: ['#141414', 'bold'],
    func: ['#262626', ''],
    funcDefinition: ['#262626', 'underline'],
    decorator: ['#262626', 'bold'],
    number: ['#262626', ''],
    constant: ['#262626', ''],
    regexp: ['#262626', ''],
    regexpOperator: ['#262626', 'bold'],
    type: ['#333333', 'italic'],
    typeDefinition: ['#333333', 'italic underline'],
    typeParameter: ['#333333', 'bold italic'],
    parameter: ['#333333', ''],
    variable: ['#3d3d3d', ''],
    tag: ['#474747', ''],
    storage: ['#474747', 'bold'],
    keywordType: ['#474747', 'bold italic'],
    property: ['#4f4f4f', ''],
    keywordModule: ['#5c5c5c', 'bold'],
    operator: ['#5c5c5c', ''],
    string: ['#666666', ''],
    punctuation: ['#737373', ''],
    comment: ['#7e7e7e', 'italic'],
    commentTag: ['#666666', 'bold italic'],
    invalid: ['#141414', 'bold underline strikethrough'],
  },

  signal: {
    error: '#a33f3f',
    warning: '#8a6a1c',
    info: '#3b649a',
    added: '#3c7550',
    modified: '#476596',
    deleted: '#a33f3f',
    magenta: '#7a5488',
    cyan: '#36706f',
  },
};
