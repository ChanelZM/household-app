export default {
  "*.(js|cjs|mjs|jsx|ts|svelte)": "eslint --fix --max-warnings 0",
  "*.(ts|svelte)": () => "tsc -p tsconfig.json --noEmit",
  "*.(css|scss|svelte)": "stylelint --fix",
  "*": "prettier --write --ignore-unknown",
};
