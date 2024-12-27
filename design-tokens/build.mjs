import fs from "fs";
import path from "path";
import StyleDictionary from "style-dictionary";

// https://tr.designtokens.org/format/#types

const buildPath = "./src/";
const globalTokenPath = "./design-tokens/tokens/globals/";
const themesTokenPath = "./design-tokens/tokens/themes/";

const sd = new StyleDictionary({
  log: {
    verbosity: "verbose",
  },

  source: [`${globalTokenPath}**/*.json`],

  platforms: {
    scss: {
      transformGroup: "scss",
      transforms: ["color/hsl-4", "size/pxToRem"],
      buildPath,
      files: [
        {
          format: "scss/variables",
          destination: "styles/abstracts/variables.scss",
        },
      ],
    },

    css: {
      transformGroup: "css",
      transforms: ["color/hsl-4", "size/pxToRem"],
      buildPath,
      files: [
        {
          format: "css/variables",
          destination: "styles/base/root-variables.scss",
        },
      ],
    },

    json: {
      transforms: ["color/hex8"],
      buildPath,
      files: [
        {
          format: "json/nested",
          destination: "core/tokens.json",
        },
      ],
    },

    js: {
      transforms: ["attribute/cti", "name/constant", "color/hex8"],
      buildPath,
      files: [
        {
          format: "javascript/es6",
          destination: "core/constants/tokens.js",
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();

// Build theme files

let themeIndexContent =
  "// Do not edit directly, this file was auto-generated.\n\n";

await Promise.all(
  fs.readdirSync(themesTokenPath).map((themeFile) => {
    if (path.parse(themeFile).ext !== ".json") return Promise.resolve();

    const theme = path.parse(themeFile).name;

    const sdt = new StyleDictionary({
      log: {
        verbosity: "verbose",
      },

      source: [`${themesTokenPath}${themeFile}`],
      include: [`${globalTokenPath}**/*.json`],

      platforms: {
        theme: {
          transformGroup: "css",
          transforms: ["color/hsl-4", "size/pxToRem"],
          buildPath,
          files: [
            {
              format: "css/variables",
              destination: `styles/themes/${theme}.scss`,
              filter: (token) => token.filePath.indexOf(`themes/`) > -1,
              options: {
                selector: `.${theme}-theme`,
              },
            },
          ],
        },
      },
    });

    themeIndexContent += `@forward "${theme}";\n`;

    return sdt.buildAllPlatforms();
  }),
);

fs.writeFileSync(`${buildPath}styles/themes/index.scss`, themeIndexContent);
