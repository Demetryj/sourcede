module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', 'unused-imports'],
  settings: { react: { version: 'detect' } },
  rules: {
    'no-undef': 'error',
    'react/jsx-no-undef': 'error',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
