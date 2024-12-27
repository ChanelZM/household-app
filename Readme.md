# Svelte Project Template

[Svelte](https://svelte.dev/) project preconfigured with:

- [SvelteKit](https://kit.svelte.dev/) ([Vite](https://vitejs.dev/))
- [TypeScript](http://typescriptlang.org/)
- [Sass](https://sass-lang.com/) & [PostCSS Preset Env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) ( which includes [Autoprefixer](https://github.com/postcss/autoprefixer))
- [Prettier](https://prettier.io/), [Eslint](https://eslint.org/) & [Stylelint](https://stylelint.io/)
- [Husky](https://typicode.github.io/husky/) & [Lint-staged](https://github.com/okonet/lint-staged)
- [Vitest](https://vitest.dev/) \*1
- [Playwright](https://playwright.dev/) \*1
- [Storybook](https://storybook.js.org/docs/svelte/writing-stories/introduction) \*1

\*1: To keep the installation speedy Vitest, Playwright and Storybook are disabled by default.

## Initial setup

```sh
npx tiged "github.com/bfanger/svelte-project-template#main" my-svelte-project
cd my-svelte-project
git init --initial-branch main
git add .
pnpm install     # or  npm install
cp -n env.example .env
pnpm dev --open  # or  npm run dev -- --open
```

## Enabling Testing & Storybook

```sh
node ./enable-testing.js
pnpm install  # or  npm install
```

- Creates the configuration files
- Creates an example unittest
- Creates an example e2e test
- Creates an example storybook story
- node_modules grows from ~240M to ~475M.

## Linting

```sh
pnpm lint  # or  npm run lint
```

I'd recommend enabling format-on-save in your editor, but to apply all auto fixes manually:

```sh
pnpm format  # or  npm run format
```

## Build

```sh
pnpm build             # or  npm run build
npx serve@latest build # or  npm run preview
```

## Examples folder

To give an example of how some integrations of libraries work, there is an examples folder in the root of the folder that is being used for all example related stuff. There is also an `examples` route in `src` to showcase the example.

If you want to **add** an example yourself, follow these steps:

1. Add a folder to the `examples` folder in the root with a fitting name (e.g. if you're adding a Storybook example, call it `storybook`).
2. Do an `npm init` inside of that folder and use the defaults.
3. Add a `tsconfig.json` with the following contents:

```json
{
  "extends": "../../tsconfig.eslint.json"
}
```

4. Add all necessary files there.
5. If you add a package to the boilerplate, install it in the root of the folder but also add it to the `package.json` of the example folder.
6. Add a folder to the `examples` folder in the `routes` folder in `src` specifically for your example and use the files from the root `examples` folder to show off the work.

If you want to implement one of the examples inside of your project:

1. Copy everything accept the `tsconfig.json` and `package.json`, from the example folder you want to use, and put it into the right folders inside the `src` folder.
2. Verify if it works.
3. Remove example folder from `examples`.
4. Remove route from `src/routes/[local]/examples`.

### Playwright

if you want to **remove** Playwright:

1. Uninstall all packages mentioned in the `package.json` of the `examples/playwright` folder.
2. Remove the `examples/playwright` folder in the root of the project
3. Remove the following scripts from the `package.json` in the root of this project:
   - `test:e2e`
   - `test:ui`
   - `test:headed`
   - `test:tag`
   - `show-report`
4. Remove the `BASE_URL` from your `.env` file

### Svelte Query

If you want to **remove** Svelte Query:

1. Uninstall all packages mentioned in the package.json of the `examples/svelte-query` folder.
2. Remove the `examples/svelte-query` folder in `/src/routes/[locale]`
3. Remove the `examples/svelte-query` folder in the root of the project

## Playwright framework:

1. Prepare local env file: `cp .env.example .env`
2. Copy application main URL as value of `BASE_URL` variable in `.env` file

Our automation framework follows specific coding standards and tracks significant architectural and technical decisions. You can find detailed information in the following files located in the `playwright/docs` folder:

1. **CODING_STANDARDS.md**:

   - This document outlines the coding standards and best practices we follow in our project. It includes guidelines on code formatting, naming conventions, and other important practices to ensure code quality and consistency.
   - Location: `playwright/docs/CODING_STANDARDS.md`

2. **DECISION_LOG.md**:
   - This document maintains a log of major decisions made throughout the project. It includes entries detailing the context, proposed solutions, pros and cons, and the final decision for various technical and architectural choices.
   - Location: `playwright/docs/DECISION_LOG.md`

## How to remove locale prefixes from url:

When using only one language in the project, you might want to remove locale prefix from url. In order to do that, do following steps:

- Go to `routes` folder and remove the `[locale]` folder (keep all the pages in the `routes` folder except the `+layout.svelte` file inside of the `[locale]`. This one needs to be merged with the one directly in the `routes` folder)
- Do a search in your IDE for `/en` and replaces the instances with `/` in the `examples/playwright` folder.
- Remove `+layout.ts` file in `src/routes`.
- Remove `import "../../i18n";` in the `+layout.svelte` file.
- Remove language switcher from navbar
