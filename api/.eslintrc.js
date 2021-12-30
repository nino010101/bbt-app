module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-unsafe-call': 1,
    '@typescript-eslint/no-unsafe-assignment': 1,
    '@typescript-eslint/no-unsafe-member-access': 1,
    '@typescript-eslint/no-unsafe-return': 1,
  },
};
