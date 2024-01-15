type TokenStream = Array<string | Token>;

type Token = {
  alias: string | Array<string>,
  content: string | TokenStream,
  type: string,
};

declare module 'prismjs/components/prism-core' {
  declare module.exports: {
    {[string]: Object | Function},
    tokenize(code: string, grammar: Object): TokenStream,
  };
}

declare module 'prismjs/components/prism-cpp' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-clike' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-javascript' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-markup' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-markdown' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-c' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-css' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-objectivec' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-sql' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-python' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-rust' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-swift' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-typescript' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-java' {
  declare module.exports: {};
}

declare module 'prismjs/components/prism-cpp' {
  declare module.exports: {};
}
