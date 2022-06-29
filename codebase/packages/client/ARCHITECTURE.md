# Feature based structure

```
src/
|-- assets/
|   |-- img/
|-- components/
|   |-- Avatar/
|   |   |-- Avatar.tsx
|   |   |-- Avatar.test.tsx
|   |-- Button/
|   |   |-- Button.tsx
|   |   |-- Button.test.tsx
|   |-- TextField/
|   |   |-- TextField.tsx
|   |   |-- TextField.test.tsx
|-- configs/
|   |-- some-common-config.ts
|-- contexts/
|   |-- UserContext/
|   |   |-- UserContext.ts
|-- hooks/
|   |-- useMediaQuery/
|   |   |-- useMediaQuery.ts
|-- pages/
|   |-- general/
|   |   |-- index.ts/
|   |   |-- index.test.ts
|-- types/
|   |-- general.d.ts
|-- utils/
|   |-- some-common-util/
|   |   |-- index.ts/
|   |   |-- index.test.ts
|-- features/
|   |-- general/
|   |   |-- MainMenu/
|   |   |   |-- components/
|   |   |   |   |-- MenuItemComponent/
|   |   |   |   |   |-- MenuItemComponent.tsx
|   |   |   |   |   |-- MenuItemComponent.test.tsx
|   |   |   |   |-- types/
|   |   |   |   |-- utils/
|   |   |   |   |-- configs/
|   |   |   |   |-- constants/
|   |   |   |   |-- hooks/
|   |   |   |   |-- contexts/
|   |   |   |   |-- widgets/
|   |   |   |-- MainMenu.tsx
|   |   |   |-- index.ts
|-- index.ts
```

- **src** - main project directory
  - **assets** - directory for static assets
  - **locales** - directory for localization
  - **components** - directory for common components
  - **configs** - directory for common configs
  - **contexts** - directory for common contexts
  - **hooks** - directory for common hooks
  - **pages** - directory for pages
    - <**tenant**> - type of page (general or bank)
  - **utils** - directory for common utils
  - **types** - directory for general types
  - **features** - directory for features
    - <**tenant**> - type of features (general or bank)
      - **feature** - folder for separate feature
        - **components** - features components
        - **utils** - feature utils
        - **configs** - feature configs
        - **constants** - feature constants
        - **widgets** - feature widgets
        - **hooks** - feature hooks
        - **contexts** - feature context
        - <**feature name**> - component container with business logic
  - **index.tsx** - main App file
