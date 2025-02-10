# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```
frontend
├─ .dockerignore
├─ .eslintrc.cjs
├─ Dockerfile
├─ electron
│  ├─ electron-env.d.ts
│  ├─ main.ts
│  └─ preload.ts
├─ electron-builder.json5
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  └─ pose_landmarker_full.task
├─ README.md
├─ src
│  ├─ App.tsx
│  ├─ AppLayout.tsx
│  ├─ AppLayoutStyle.ts
│  ├─ assets
│  │  ├─ fonts
│  │  │  └─ PretendardVariable.woff2
│  │  ├─ icons
│  │  │  ├─ arrow-down.svg
│  │  │  ├─ bell.svg
│  │  │  ├─ docs.svg
│  │  │  ├─ hamburger.svg
│  │  │  ├─ help.svg
│  │  │  ├─ my-page.svg
│  │  │  ├─ record.svg
│  │  │  ├─ recording-stop.svg
│  │  │  ├─ recording.svg
│  │  │  ├─ report.svg
│  │  │  └─ setting.svg
│  │  └─ images
│  │     ├─ mock-profile.jpg
│  │     └─ report
│  │        ├─ leftShoulder.svg
│  │        ├─ neck.svg
│  │        ├─ rightShoulder.svg
│  │        └─ waist.svg
│  ├─ components
│  │  ├─ Calendar
│  │  │  ├─ CalendarSection.tsx
│  │  │  └─ CalendarSectionStyle.ts
│  │  ├─ common
│  │  │  ├─ Header
│  │  │  │  ├─ Header.tsx
│  │  │  │  └─ HeaderStyle.ts
│  │  │  ├─ ReportTab
│  │  │  │  ├─ ReportTab.tsx
│  │  │  │  └─ ReportTabStyle.ts
│  │  │  └─ SideBar
│  │  │     ├─ SideBar.tsx
│  │  │     └─ SideBarStyle.ts
│  │  ├─ DailyStats
│  │  │  ├─ DailyStatsSection.tsx
│  │  │  └─ DailyStatsSectionStyle.ts
│  │  ├─ PostureWarning
│  │  │  ├─ PostureWarningSection.tsx
│  │  │  └─ PostureWarningSectionStyle.ts
│  │  ├─ SessionLog
│  │  │  ├─ SessionLogSection.tsx
│  │  │  └─ SessionLogSectionStyle.ts
│  │  └─ WebCam
│  │     ├─ WebCam.tsx
│  │     └─ WebCamStyle.ts
│  ├─ constants
│  │  ├─ constants.ts
│  │  └─ errorConnections.ts
│  ├─ GlobalStyle.ts
│  ├─ hooks
│  │  └─ useWebRTC.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ HelpPage
│  │  │  └─ HelpPage.tsx
│  │  ├─ HomePage
│  │  │  ├─ HomePage.tsx
│  │  │  └─ HomePageStyle.ts
│  │  ├─ ProfilePage
│  │  │  └─ ProfilePage.tsx
│  │  ├─ ReportPage
│  │  │  ├─ ReportPage.tsx
│  │  │  └─ ReportPageStyle.ts
│  │  └─ SettingPage
│  │     └─ SettingPage.tsx
│  ├─ Router.tsx
│  ├─ store
│  │  └─ useMeasurementStore.ts
│  ├─ types
│  │  ├─ calendar.ts
│  │  ├─ index.ts
│  │  └─ type.ts
│  ├─ utils
│  │  └─ formatTime.ts
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
```
frontend
├─ .dockerignore
├─ .eslintrc.cjs
├─ Dockerfile
├─ electron
│  ├─ electron-env.d.ts
│  ├─ main.ts
│  └─ preload.ts
├─ electron-builder.json5
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  └─ pose_landmarker_full.task
├─ README.md
├─ src
│  ├─ App.tsx
│  ├─ AppLayout.tsx
│  ├─ AppLayoutStyle.ts
│  ├─ assets
│  │  ├─ fonts
│  │  │  └─ PretendardVariable.woff2
│  │  ├─ icons
│  │  │  ├─ arrow-down.svg
│  │  │  ├─ bell.svg
│  │  │  ├─ docs.svg
│  │  │  ├─ hamburger.svg
│  │  │  ├─ help.svg
│  │  │  ├─ my-page.svg
│  │  │  ├─ record.svg
│  │  │  ├─ recording-stop.svg
│  │  │  ├─ recording.svg
│  │  │  ├─ report.svg
│  │  │  └─ setting.svg
│  │  └─ images
│  │     ├─ mock-profile.jpg
│  │     └─ report
│  │        ├─ leftShoulder.svg
│  │        ├─ neck.svg
│  │        ├─ rightShoulder.svg
│  │        └─ waist.svg
│  ├─ components
│  │  ├─ Calendar
│  │  │  ├─ CalendarSection.tsx
│  │  │  └─ CalendarSectionStyle.ts
│  │  ├─ common
│  │  │  ├─ Header
│  │  │  │  ├─ Header.tsx
│  │  │  │  └─ HeaderStyle.ts
│  │  │  ├─ ReportTab
│  │  │  │  ├─ ReportTab.tsx
│  │  │  │  └─ ReportTabStyle.ts
│  │  │  └─ SideBar
│  │  │     ├─ SideBar.tsx
│  │  │     └─ SideBarStyle.ts
│  │  ├─ DailyStats
│  │  │  ├─ DailyStatsSection.tsx
│  │  │  └─ DailyStatsSectionStyle.ts
│  │  ├─ PostureWarning
│  │  │  ├─ PostureWarningSection.tsx
│  │  │  └─ PostureWarningSectionStyle.ts
│  │  ├─ SessionLog
│  │  │  ├─ SessionLogSection.tsx
│  │  │  └─ SessionLogSectionStyle.ts
│  │  └─ WebCam
│  │     ├─ WebCam.tsx
│  │     └─ WebCamStyle.ts
│  ├─ constants
│  │  ├─ constants.ts
│  │  └─ errorConnections.ts
│  ├─ GlobalStyle.ts
│  ├─ hooks
│  │  └─ useWebRTC.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ HelpPage
│  │  │  └─ HelpPage.tsx
│  │  ├─ HomePage
│  │  │  ├─ HomePage.tsx
│  │  │  └─ HomePageStyle.ts
│  │  ├─ ProfilePage
│  │  │  └─ ProfilePage.tsx
│  │  ├─ ReportPage
│  │  │  ├─ ReportPage.tsx
│  │  │  └─ ReportPageStyle.ts
│  │  └─ SettingPage
│  │     └─ SettingPage.tsx
│  ├─ Router.tsx
│  ├─ store
│  │  └─ useMeasurementStore.ts
│  ├─ types
│  │  ├─ calendar.ts
│  │  ├─ index.ts
│  │  └─ type.ts
│  ├─ utils
│  │  └─ formatTime.ts
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```