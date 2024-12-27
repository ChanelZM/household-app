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

## How to remove locale prefixes from url:

When using only one language in the project, you might want to remove locale prefix from url. In order to do that, do following steps:

- Go to `routes` folder and remove the `[locale]` folder (keep all the pages in the `routes` folder except the `+layout.svelte` file inside of the `[locale]`. This one needs to be merged with the one directly in the `routes` folder)
- Do a search in your IDE for `/en` and replaces the instances with `/` in the `examples/playwright` folder.
- Remove `+layout.ts` file in `src/routes`.
- Remove `import "../../i18n";` in the `+layout.svelte` file.
- Remove language switcher from navbar
