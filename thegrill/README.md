# TheGrill

A React-based web experience for the TheGrill event. This project celebrates the 1st of May with a unique grilling experience at Delftse Hout, featuring interactive animations, an image carousel, event guidelines, and more.

## Technologies

- **React** with TypeScript
- **Vite** as the build tool
- **React Router** for routing
- **Motion & Framer Motion** for animations and transitions

## Installation

1. Clone the repository.
2. Install dependencies:

   ```sh
   npm install
   ```

## Development

To run the project in development mode:

```sh
npm run dev
```

Then browse to [http://localhost:3000](http://localhost:3000) (or the port Vite uses).

## Building for Production

Build the project by running:

```sh
npm run build
```

## Project Structure

- **[index.html](index.html)**  
  The main HTML file defining meta tags, viewport settings, and linking the entry script.

- **[package.json](package.json)**  
  Contains scripts, dependencies, and project configuration.

- **[vite.config.ts](vite.config.ts)**  
  Vite configuration including React and SVGR plugin support.

- **TypeScript Configuration Files**

  - [tsconfig.json](tsconfig.json)
  - [tsconfig.app.json](tsconfig.app.json)
  - [tsconfig.node.json](tsconfig.node.json)

- **Source Code (in [src](src/))**
  - [App.tsx](src/App.tsx): Main application component integrating components like [AboutSection](src/components/About.tsx), [EventMap](src/components/EventMap.tsx), [Guidelines](src/components/Guidelines.tsx), [ImageCarousel](src/components/ImageCarousel.tsx), and [Mouth](src/components/Mouth.tsx).
  - [main.tsx](src/main.tsx): The entry point that initializes the React application and sets up routing.
  - [components](src/components/): Reusable UI components.
  - Assets, styles, and fonts to enhance the experience.

## Linting & Code Quality

Lint your code using:

```sh
npm run lint
```

The project uses ESLint with rules configured in [eslint.config.js](eslint.config.js).

## Deployment

After running the production build (`npm run build`), deploy the generated static files following your preferred hosting solution.

## Contributing

Contributions are welcome! Please follow the coding styles and run lint checks before submitting your pull requests.

## License

This project is licensed under the MIT License.
