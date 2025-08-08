import antfu from "@antfu/eslint-config";

export default antfu({
  rules: {
    "no-console": "off",
    "style/semi": ["error", "always"],
    "style/quotes": ["error", "double"],
    "style/comma-dangle": ["error", "always-multiline"],
    "node/prefer-global/process": "off",
  },
});
