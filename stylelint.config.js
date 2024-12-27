/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-html/svelte",
    "stylelint-config-clean-order",
    "stylelint-config-prettier-scss",
  ],

  ignoreFiles: [
    "node_modules",
    "build/**/*",
    "src/styles/themes/**/*",
    "src/styles/base/root-variables.scss",
    "src/styles/abstracts/variables.scss",
  ],

  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
  },
};
