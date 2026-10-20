// TextMate scopes and semantic tokens, mapped to syntax roles.

export function buildTokenColors(s) {
  // fontStyle overrides the role's own style (e.g. bold markdown headings).
  const rule = (name, scope, role, fontStyle = s[role][1]) => ({
    name,
    scope,
    settings: { foreground: s[role][0], fontStyle },
  });

  return [
    rule('Comments', ['comment', 'punctuation.definition.comment'], 'comment'),
    rule('Doc comment tags', ['storage.type.class.jsdoc', 'keyword.other.phpdoc', 'entity.name.type.instance.jsdoc'], 'commentTag'),

    rule('Keywords', ['keyword', 'keyword.control', 'keyword.other.using'], 'keyword'),
    rule('Operator keywords', [
      'keyword.operator.new',
      'keyword.control.new',
      'keyword.operator.expression',
      'keyword.operator.logical.python',
    ], 'keywordOperator'),
    rule('Module keywords', [
      'keyword.control.import',
      'keyword.control.export',
      'keyword.control.from',
      'keyword.control.require',
      'keyword.other.import',
      'storage.modifier.import',
      'storage.modifier.package',
      'keyword.other.use',
      'keyword.other.namespace',
    ], 'keywordModule'),

    rule('Storage', [
      'storage',
      'storage.type',
      'storage.modifier',
      'keyword.declaration',
      'keyword.function',
    ], 'storage'),
    rule('Type keywords', [
      'storage.type.interface',
      'storage.type.type',
      'storage.modifier.implements',
      'storage.modifier.extends',
      'keyword.control.as',
      'keyword.control.satisfies',
      'keyword.control.type',
      'keyword.operator.expression.keyof',
      'keyword.operator.expression.infer',
      'keyword.operator.expression.is',
      'keyword.operator.type.asserts',
    ], 'keywordType'),
    rule('this / self', [
      'variable.language.this',
      'variable.language.self',
      'variable.language.super',
      'variable.language.special.self',
      'variable.parameter.function.language.special.self.python',
    ], 'storage'),

    rule('Operators', ['keyword.operator', 'storage.type.function.arrow'], 'operator'),
    rule('Punctuation', [
      'punctuation',
      'meta.brace',
      'punctuation.separator',
      'punctuation.terminator',
      'punctuation.accessor',
    ], 'punctuation'),

    rule('Functions', [
      'entity.name.function',
      'support.function',
      'meta.function-call entity.name.function',
      'variable.function',
    ], 'func'),
    rule('Function definitions', [
      'meta.definition.function entity.name.function',
      'meta.definition.method entity.name.function',
      'meta.function.python entity.name.function',
      'meta.function.php entity.name.function',
    ], 'funcDefinition'),

    rule('Types and classes', [
      'entity.name.type',
      'entity.name.class',
      'entity.other.inherited-class',
      'support.class',
      'support.type',
      'entity.name.namespace',
      'storage.type.primitive',
      'storage.type.built-in',
      'keyword.other.type.php',
    ], 'type'),
    rule('Type definitions', [
      'entity.name.type.class',
      'entity.name.type.interface',
      'entity.name.type.alias',
      'entity.name.type.enum',
      'entity.name.type.module',
      'entity.name.class',
    ], 'typeDefinition'),

    rule('Strings', ['string', 'punctuation.definition.string', 'string.template'], 'string'),
    rule('Template expressions', [
      'punctuation.definition.template-expression',
      'punctuation.section.embedded',
      'constant.character.format.placeholder',
    ], 'storage'),
    rule('Escapes and regex', [
      'constant.character.escape',
      'constant.character.entity',
      'constant.character.entity punctuation',
      'string.regexp',
      'constant.other.character-class.regexp',
    ], 'regexp'),
    rule('Regex operators', [
      'string.regexp keyword',
      'keyword.control.anchor.regexp',
      'string.regexp keyword.operator',
      'string.regexp punctuation',
      'string.regexp constant.other.character-class.set',
    ], 'regexpOperator'),

    rule('Numbers and literals', [
      'constant.numeric',
      'constant.language',
      'keyword.other.unit',
      'constant.other.color.rgb-value',
      'constant.other.color.rgb-value punctuation.definition.constant',
    ], 'number'),
    // `variable.other.constant` is every `const` binding in JS/TS, so it stays a plain variable.
    rule('Constants', ['constant.other', 'variable.other.enummember', 'support.constant'], 'constant'),

    rule('Variables', ['variable', 'variable.other', 'variable.other.readwrite'], 'variable'),
    rule('Parameters', ['variable.parameter', 'meta.parameters variable'], 'parameter'),
    rule('Properties', [
      'variable.other.property',
      'variable.other.object.property',
      'meta.object-literal.key',
      'support.variable.property',
      'support.type.property-name',
      'meta.attribute.python',
      'entity.name.tag.yaml',
    ], 'property'),

    rule('Tags', ['entity.name.tag'], 'tag'),
    rule('Components', ['support.class.component', 'entity.name.tag.component'], 'component'),
    rule('Attributes', ['entity.other.attribute-name'], 'property'),
    rule('CSS selectors', ['entity.other.attribute-name.class', 'entity.other.attribute-name.id'], 'func'),
    rule('CSS pseudo selectors', ['entity.other.attribute-name.pseudo-class', 'entity.other.attribute-name.pseudo-element'], 'storage'),
    rule('Decorators', ['meta.decorator', 'punctuation.decorator', 'entity.name.function.decorator'], 'decorator'),

    rule('Markdown headings', ['markup.heading', 'markup.heading entity.name'], 'keyword'),
    rule('Markdown bold', ['markup.bold'], 'keyword'),
    rule('Markdown italic', ['markup.italic'], 'func', 'italic'),
    rule('Markdown strikethrough', ['markup.strikethrough'], 'comment', 'strikethrough'),
    rule('Markdown code', ['markup.inline.raw', 'markup.fenced_code'], 'string'),
    rule('Markdown link text', ['string.other.link'], 'func', 'underline'),
    rule('Markdown link URLs', ['markup.underline.link'], 'string', 'underline'),
    rule('Markdown quotes', ['markup.quote'], 'comment'),

    rule('Diff inserted', ['markup.inserted'], 'func'),
    rule('Diff deleted', ['markup.deleted'], 'comment', 'strikethrough'),
    rule('Diff changed', ['markup.changed'], 'func', 'italic'),

    rule('Invalid', ['invalid', 'invalid.illegal'], 'invalid'),
  ];
}

export function buildSemanticTokenColors(s) {
  const token = (role) => {
    const [foreground, style] = s[role];
    return {
      foreground,
      bold: style.includes('bold'),
      italic: style.includes('italic'),
      underline: style.includes('underline'),
      strikethrough: style.includes('strikethrough'),
    };
  };

  return {
    namespace: token('type'),
    class: token('type'),
    interface: token('type'),
    type: token('type'),
    typeParameter: token('typeParameter'),
    enum: token('type'),
    enumMember: token('constant'),
    function: token('func'),
    method: token('func'),
    'function.declaration': token('funcDefinition'),
    'method.declaration': token('funcDefinition'),
    'class.declaration': token('typeDefinition'),
    'interface.declaration': token('typeDefinition'),
    'type.declaration': token('typeDefinition'),
    'enum.declaration': token('typeDefinition'),
    'function.defaultLibrary': token('func'),
    decorator: token('decorator'),
    macro: token('func'),
    parameter: token('parameter'),
    variable: token('variable'),
    'variable.readonly': token('variable'),
    'variable.readonly.defaultLibrary': token('constant'),
    'variable.constant': token('constant'),
    property: token('property'),
    'property.readonly': token('property'),
    keyword: token('keyword'),
    selfParameter: token('storage'),
    // Deprecated APIs are struck through whatever their role; only the line is added.
    '*.deprecated': { strikethrough: true },
  };
}
