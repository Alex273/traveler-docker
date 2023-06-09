module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        project: 'tsconfig.json',
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        'eol-last': 1,
        'no-var-requires': 0,
        'newline-before-return': 0,
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowedNames: ['self'],
            },
        ],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
    ignorePatterns: ['/dist/*', 'node_modules', '.eslintrc.js'],
};
