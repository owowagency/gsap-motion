module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['@owowagency/eslint-config-ts'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [],
    rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        eqeqeq: 'off',
        'no-void': 'off',
        'no-useless-call': 'off',
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: 'multiline-expression', next: '*' },
            { blankLine: 'always', prev: '*', next: 'multiline-expression' },
        ],
    },
};
