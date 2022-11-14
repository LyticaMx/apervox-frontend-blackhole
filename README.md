# Frontend - Blackhole v3.0.0

Este proyecto tiene por objetivo la creación de un sistema de monitoreo telefónico, incluyendo análisis y clasificación de llamadas fijas y mobiles, datos de rastreo GPS, protocolos publicos y privados de red.

## Tecnologías

### Proyectos

- [Typescript](https://www.typescriptlang.org/) JavaScript with syntax for types

### Librerías

- [ReactJS](https://reactjs.org/) A JavaScript library for building user interfaces
- [Ant Design](https://ant.design/) A design system for enterprise-level products. Create an efficient and enjoyable work experience.
- [Headless UI](https://headlessui.com/) Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.
- [Heroicons](https://heroicons.com/) Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS
- [TanStack Table](https://tanstack.com/table/v8) Supercharge your tables or build a datagrid from scratch for TS/JS, React, Vue, Solid & Svelte while retaining 100% control over markup and styles.
- [Axios](https://axios-http.com/docs/intro) Promise based HTTP client for the browser and node.js
- [clsx](https://github.com/lukeed/clsx#readme) A tiny (228B) utility for constructing className strings conditionally
- [date-fns](https://date-fns.org/) Modern JavaScript date utility library
- [formik](https://formik.org/) Build forms in React, without the tears
- [lodash](https://lodash.com/) A modern JavaScript utility library delivering modularity, performance & extras.
- [PostCSS Focus Visible](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-focus-visible#readme) -ets you use the :focus-visible pseudo-class in CSS, following the Selectors Level 4 specification
- [react-dropzone](https://react-dropzone.js.org/) Simple React hook to create a HTML5-compliant drag'n'drop zone for files.
- [react-icons](https://react-icons.github.io/react-icons/) Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.
- [react-intl](https://formatjs.io/docs/react-intl/#the-react-intl-package) Internationalize your web apps on the client & server.
- [React router](https://v5.reactrouter.com/web/guides/quick-start) Is a collection of navigational components that compose declaratively with your application.
- [React Toastify](https://github.com/fkhadra/react-toastify#readme) Allows you to add notifications to your app with ease. No more nonsense!
- [wavesurfer.js](https://wavesurfer-js.org/) Is a customizable audio waveform visualization, built on top of Web Audio API and HTML5 Canvas.

## Librerías de desarrollo

- [ElectronJS](https://www.electronjs.org/) Build cross-platform desktop apps with JavaScript, HTML, and CSS
- [electron-builder](https://www.electron.build/) A complete solution to package and build a ready for distribution Electron app for macOS, Windows and Linux with “auto update” support out of the box.
- [Autoprefixer](https://github.com/postcss/autoprefixer#readme) Is a PostCSS plugin which parses your CSS and adds vendor prefixes
- [ESLint](https://eslint.org/) Find and fix problems in your JavaScript code
- [postcss](https://postcss.org/) A tool for transforming CSS with JavaScript
- [TailwindCSS](https://tailwindcss.com/) A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.
- [Prettier](https://prettier.io/) An opinionated code formatter

## Requisitos de desarrollo

- [NodeJS](https://nodejs.org/download/release/latest-v16.x/)  16.18.1
- [Yarn](https://yarnpkg.com/) 1.22.19

## Iniciar el proyecto

Para ejecutar el proyecto sigue los siguientes pasos

Clona el repositorio en tu maquina local:

```bash
git clone git@github.com:LyticaMx/apervox-frontend-blackhole.git
```

Instala las dependencias del  proyecto:

``` bash
yarn install
```

Configura las variables de entorno:

```bash
# Este es un ejemplo, necesitas configurar todas las variables de entorno.
...
DEPLOY_PORT=8000
...
```

Inicia el proyecto:

```bash
yarn start
```

## Variables de entorno

El proyecto cuenta con un archivo de variables de entorno
**.env**

|Nombre|Tipo|Descripción
|------|----|-----------|
|GENERATE_SOURCEMAP|boolean|Generación de los sourcemaps de las gráficas de ant design
