module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  plugins: [
    "html"
  ],
  env: {
    browser: true
  },
  extends: "standard",
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
};
