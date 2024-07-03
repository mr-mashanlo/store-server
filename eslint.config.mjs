import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
  {
    rules: {
      indent: [
        'error',
        2
      ],
      semi: [
        'error',
        'always'
      ],
      quotes: [
        'error',
        'single'
      ],
      'object-curly-spacing': [
        'error',
        'always'
      ],
      'array-bracket-spacing': [
        'error',
        'always'
      ],
      'space-in-parens': [
        'error',
        'always'
      ],
      'comma-spacing': [
        'error',
        { 'before': false, 'after': true }
      ],
      'no-trailing-spaces': [
        'error'
      ],
      'eol-last': [
        'error',
        'never'
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'jsx-quotes': [
        'error',
        'prefer-double'
      ],
      'comma-dangle': [
        'error',
        { arrays: 'never', objects: 'never', imports: 'never', exports: 'never', functions: 'never' }
      ]
    }
  },
  { files: [ '**/*.js' ], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended
];