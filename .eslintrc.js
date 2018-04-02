
// Inspired by https://github.com/airbnb/javascript but less opinionated.

// This is why we only use "WARNING" level for potential errors and we don't use "ERROR" level at all.
// In the future, we might create a separate list of rules for production. It would probably be more strict.

// For basic rules check out http://eslint.org/docs/rules/
// To change default react rules (https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules)

var OFF = 0, WARNING = 1, ERROR = 3;

module.exports = {

    parser: 'babel-eslint',

    plugins: ['react', 'react-native', 'promise'],

    env: {
        es6: true,
        node: true,
        browser: true
    },

    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:promise/recommended'],

    settings: {
        'react': {
            'createClass': 'createReactClass',
            'pragma': 'React',
            'version': '16.0'
        }
    },

    rules: {
        'array-callback-return': OFF,
        'comma-dangle': [WARNING, 'never'],
        'comma-spacing': [WARNING, { 'before': false, 'after': true }],
        'comma-style': [WARNING, 'last'],
        'curly': WARNING,
        'default-case': [WARNING, { commentPattern: '^no default$' }],
        'dot-location': [WARNING, 'property'],
        'eqeqeq': [WARNING, 'allow-null'],
        'eol-last': WARNING,
        'guard-for-in': WARNING,
        'key-spacing': [WARNING, { 'beforeColon': false, 'afterColon': true }],
        'max-len': [WARNING, { 'code': 220, 'tabWidth': 4, 'ignoreComments': true, 'ignoreTrailingComments': true, 'ignoreUrls': true }],
        'new-cap': [WARNING, { newIsCap: true, capIsNew: false }],
        'new-parens': WARNING,
        'no-array-constructor': WARNING,
        'no-caller': WARNING,
        'no-cond-assign': [WARNING, 'always'],
        'no-console': OFF,
        'no-const-assign': WARNING,
        'no-control-regex': WARNING,
        'no-delete-var': WARNING,
        'no-dupe-args': WARNING,
        'no-dupe-class-members': WARNING,
        'no-dupe-keys': WARNING,
        'no-duplicate-case': WARNING,
        'no-empty-character-class': WARNING,
        'no-empty-pattern': WARNING,
        'no-eval': WARNING,
        'no-ex-assign': WARNING,
        'no-extend-native': WARNING,
        'no-extra-bind': WARNING,
        'no-extra-label': WARNING,
        'no-extra-parens': [WARNING, 'functions'],
        'no-fallthrough': WARNING,
        'no-func-assign': WARNING,
        'no-implied-eval': WARNING,
        'no-invalid-regexp': WARNING,
        'no-iterator': WARNING,
        'no-label-var': WARNING,
        'no-labels': [WARNING, { allowLoop: false, allowSwitch: false }],
        'no-lone-blocks': WARNING,
        'no-loop-func': WARNING,
        'no-mixed-operators': [WARNING, {
            groups: [
                ['+', '-', '*', '/', '%', '**'],
                ['&', '|', '^', '~', '<<', '>>', '>>>'],
                ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                ['&&', '||'],
                ['in', 'instanceof']
            ],
            allowSamePrecedence: false
        }],
        'no-multi-str': WARNING,
        'no-native-reassign': WARNING,
        'no-negated-in-lhs': WARNING,
        'no-new-func': WARNING,
        'no-new-object': WARNING,
        'no-new-symbol': WARNING,
        'no-new-wrappers': WARNING,
        'no-obj-calls': WARNING,
        'no-octal': WARNING,
        'no-octal-escape': WARNING,
        'no-redeclare': WARNING,
        'no-regex-spaces': WARNING,
        'no-restricted-syntax': [WARNING, 'LabeledStatement', 'WithStatement' ],
        'no-return-assign': WARNING,
        'no-script-url': WARNING,
        'no-self-assign': WARNING,
        'no-self-compare': WARNING,
        'no-sequences': WARNING,
        'no-shadow-restricted-names': WARNING,
        'no-sparse-arrays': WARNING,
        'no-this-before-super': WARNING,
        'no-throw-literal': WARNING,
        'no-undef': WARNING,
        'no-unexpected-multiline': WARNING,
        'no-unreachable': WARNING,
        'no-unused-expressions': OFF,
        'no-unused-labels': WARNING,
        'no-unused-vars': [WARNING, { vars: 'local', args: 'none' }],
        'no-use-before-define': OFF,
        'no-useless-computed-key': WARNING,
        'no-useless-concat': WARNING,
        'no-useless-constructor': WARNING,
        'no-useless-escape': WARNING,
        'no-useless-rename': [WARNING, { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }],
        'no-with': WARNING,
        'no-whitespace-before-property': WARNING,
        'operator-assignment': [WARNING, 'always'],
        'radix': [WARNING, 'as-needed'],
        'require-yield': WARNING,
        'rest-spread-spacing': [WARNING, 'never'],
        'strict': [WARNING, 'never'],
        'unicode-bom': [WARNING, 'never'],
        'use-isnan': WARNING,
        'valid-typeof': WARNING,

        // change default react rules (https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules)
        'react/display-name': OFF,
        'react/jsx-equals-spacing': [WARNING, 'never'],
        'react/jsx-first-prop-new-line': [WARNING, 'multiline'],
        'react/jsx-no-duplicate-props': [WARNING, { ignoreCase: true }],
        'react/jsx-no-undef': WARNING,
        'react/jsx-pascal-case': [WARNING, { allowAllCaps: true, ignore: [] }],
        'react/jsx-uses-react': WARNING,
        'react/jsx-uses-vars': WARNING,
        'react/no-danger': OFF,
        'react/no-deprecated': WARNING,
        'react/no-direct-mutation-state': WARNING,
        'react/no-is-mounted': WARNING,
        'react/prop-types': [OFF, { ignore: ['children', 'dispatch'] }],
        'react/react-in-jsx-scope': WARNING,
        'react/require-render-return': WARNING,
        'react/sort-comp': [WARNING, {
            order: [
                'static-methods', 'lifecycle', 'everything-else', 'render'
            ]
        }]
    }
};
