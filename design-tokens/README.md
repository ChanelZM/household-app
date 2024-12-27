# Design tokens

This project uses [Style Dictionary](https://styledictionary.com/info/tokens/) as a build-system to parse and transform the design tokens to CSS and JavaScript specific files.

## Configuration

Style dictionaries are [configuration](https://styledictionary.com/reference/config/) driven. Your configuration lets Style Dictionary know:

- Where to find your design tokens
- How to transform and format them to generate output files

The configuration is located in the `build.mjs` file next to this file. You can tweak this file based on your project needs.

## Tokens

Design tokens are the platform-agnostic way to define design decisions, and are the main input for Style Dictionary. Write your tokens in a json format based on the needs of your project. All global tokens should be placed in the `globals` folder. The file and folder structure is up to you. Use `$value` and `$type` to define a token. A token's type can be set directly by giving it a `$type` property specifying the chosen type. Alternatively, it can inherit a type from one of its parent groups, or be an alias of a token that has the desired type. The `$type` is used to define which transformer to use for the parsing the value during build. More information about token types can be found [here](https://tr.designtokens.org/format/#types) and [here](https://tr.designtokens.org/format/#composite-types).

```json
{
    // Single value tokens
    "color": {
        "neutral": {
            "$type": "color",
            "100": { "$value": "#eee" },
            "500": { "$value": "#ddd" },
            "800": { "$value": "#ccc" }
        },
        "white": { "$value": "#ffffff", "$type": "color" },
        "black": { "$value": "#000000", "$type": "color" }
    },
    // Composite token
    "shadow": {
        "$type": "shadow",
        "$value": {
        "color": "#00000080",
        "offsetX": "0.5rem",
        "offsetY": "0.5rem",
        "blur": "1.5rem",
        "spread": "0rem"
    }
}
```

## Referencing / Aliasing tokens

You can reference (alias) existing values by using the dot-notation object path (the fully articulated design token name) in curly brackets. Note that this only applies to values; referencing a non-value design token will cause unexpected results in your output.

```json
{
  "size": {
    "font": {
      "$type": "dimension",
      "small": { "$value": "10" },
      "medium": { "$value": "16" },
      "large": { "$value": "24" },
      "base": { "$value": "{size.font.medium.value}" }
    }
  }
}
```

## Theme tokens

Theme related tokens should be placed in the `themes` folder. For each theme file within this folder a css file is generated. Within these theme files you can reference tokens defined in the `globals` folder.

## Transforms

[Transforms](https://styledictionary.com/reference/hooks/transforms/) are functions that modify a token so that it can be understood by a specific platform. It can modify the name, value, or attributes of a token - enabling each platform to use the design token in different ways. A simple example is changing the name of a token to PascalCase for use in JavaScript and changing it to kebab-case for use within css. Style Dictionary comes with a lot of [build-in](https://styledictionary.com/reference/hooks/transforms/predefined/) transforms but you can also write your [own](https://styledictionary.com/reference/hooks/transforms/#defining-custom-transforms) based on your project needs.

## Formats

[Formats](https://styledictionary.com/reference/hooks/formats/) define the output of your created files. For example, to use your styles in CSS you use the `css/variables` format. This will create a CSS file containing the variables from your tokens. Style Dictionary comes with a lot of [build-in](https://styledictionary.com/reference/hooks/formats/predefined/) formats but you can also write your [own](https://styledictionary.com/reference/hooks/formats/#custom-formats) based on your project needs.
