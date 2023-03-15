module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // we use 2 spaces to indent our code
    indent: ["error", 2],
    // we want to avoid extraneous spaces
    "no-multi-spaces": ["error"],
  },
};
