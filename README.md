# Badge Generator

A TypeScript-based badge generator that creates circular badges with icons and text.

## Features

- Create circular badges with icons and text
- Choose from a cohesive color palette
- Support for custom icon fonts
- Save badges as PNG files
- Configurable dimensions and styling

```bash
$ npm start generate

✔ Enter the badge text: Example
✔ Choose an SVG icon: zap.svg
✔ Choose a color: secondary
✔ Enter the output filename (without extension): example-badge
✔ Enter the badge size (optional): 200

Generating badge...
Badge generated successfully: example-badge.png
```

![Example](./resources/example-badge.png "Example")

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Build

The build process does 2 things:

1. Download icons from the Free Icons repository
2. Compile the TypeScript code

## Usage

1. Build the project:
   ```bash
   npm run build
   ```

2. Run the generator:
   ```bash
   npm start generate
   ```

   Or in development mode:
   ```bash
   npm run dev generate
   ```

## Configuration

The badge generator accepts the following configuration options:

- `iconFont`: Path to the icon font file
- `iconChar`: The character from the icon font to use
- `text`: Text to display below the icon
- `color`: Color key from the predefined palette (primary, secondary, accent, success, warning, info, error)
- `output`: Path where the badge will be saved
- `size`: Optional badge size (defaults to 200px)

## Color Palette

The generator supports the following predefined colors:
- primary: #FF6B6B
- secondary: #4ECDC4
- accent: #45B7D1
- success: #8AC46B
- warning: #FFD66B
- info: #6B88FF
- error: #FF6B87

## License

MIT
