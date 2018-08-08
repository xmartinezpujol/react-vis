# react-vis
A set of components for Data Visualization + other things

![React Vis](graphscover.png?raw=true "React Vis")

### Client localhost (http://localhost:3001)
Node/NPM required to install dependencies.

Clone rep
``` shell
git clone https://github.com/xmartinezpujol/react-vis.git
```

Install dependencies
``` shell
npm install
```

Start development
``` shell
npm start
```

Run Storybook (UI Explorer) at http://localhost:6006
``` shell
npm run storybook
```

Build Storybook Static
``` shell
npm run build-storybook
```

Make Production Bundle
``` shell
npm run build
```

### Testing

* Integration/E2E tests done in Cypress. 

``` shell
npm run teste2e
```

### Workflow

1) Dev/Prod environment setup.
2) Storybook up & running + first stateless components. Mocked info.
3) Proptypes.
4) Cypress setup.
5) Client-side routing with React Router.
6) Test some ideas for pricing graphs in Storybook.
7) Responsive/Compatibility check.
8) Animations.
9) Add E2E tests in Cypress + Refactoring.

### Notes

* ESLint + AirnBnB Styleguide is used for code linting.

* Storybook is used for component development, following the Component Driven Design (CDD) mindset. Snapshots and UI testing could be added there also. This is a common ground with designers also to improve the companies visual Styleguide and use it as a UI Explorer.

* Cypress has automated tests for both components, start the client first (the localhost:3001), then Cypress. I've tested rendering and state. That could be done also in Jest/Enzyme, but I had some problems running snapshots with Victory lib, so ended up doing everything in Cypress. I followed some Cypress best practices attaching data-cy to test elements.

## Refactoring / Improvements

* Texts should be FormattedMessages from react-intl (or similar intl libs) to support multilingual functionality.

* Dev environment could be done in Docker containers.

### Tech Stack
ReactJS, Router, Glamorous, Storybook, Webpack4, Cypress.
