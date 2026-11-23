# Smart Watch Simulation

**A reference-based, interactive smartwatch demo for the browser.**

Fastrack FT_A9508 watch replica.

[![React 19.3.0](https://img.shields.io/badge/React-19.3.0-149ECA?logo=react&logoColor=white&style=flat-square)](https://react.dev/)
[![TypeScript 5.9.3](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Vite 6.4.3](https://img.shields.io/badge/Vite-6.4.3-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vite.dev/)
[![Frontend only](https://img.shields.io/badge/Frontend-only-222222?style=flat-square)](#scope-and-simulation)

### **[SmartWatchReplicaDemo](https://mhsatgit.github.io/SmartWatch/)**

## At a glance

|                     |                                                                      |
| ------------------- | -------------------------------------------------------------------- |
| **Built with**      | React, TypeScript, Vite, CSS, and SVG                                |
| **Starting screen** | Analog always-on display (AOD)                                       |
| **Controls**        | Dashboard buttons, watch side buttons, arrow keys, and swipes        |
| **Data**            | Simulated readings and workouts, with settings saved in your browser |

## Explore the watch

- Press **MENU** to wake the analog display and reveal the green X watch face. Press it again to open the 21-app drawer.
- Move **Left** from the watch face to browse Activity, Recent Multisport, Heart Rate, Sleep, SpO₂, and Stress.
- Press **SPORTS** to choose a sport, set a goal, and try a simulated workout.

### Controls

| Input                                        | Action                                                                      |
| -------------------------------------------- | --------------------------------------------------------------------------- |
| **MENU**                                     | Wake the watch, open the app drawer from the watch face, or go back.        |
| **SPORTS**                                   | Open Recent Multisport.                                                     |
| **↑ Up**                                     | Open notifications from the watch face.                                     |
| **↓ Down**                                   | Open quick settings from the watch face. Move right to see the second page. |
| **← Left**                                   | Browse activity and health screens from the watch face.                     |
| **→ Right**                                  | Open the daily feed from the watch face.                                    |
| **Mouse wheel, vertical drag or swipe, ↑/↓** | Scroll a list or the daily feed.                                            |

Use the on-screen buttons, arrow keys, or drag or swipe in the matching direction. Hover over, focus, or tap a dashboard button to read its description.

## Run locally

### Requirements

[![Node.js 24](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white&style=flat-square)](https://nodejs.org/)
[![npm 11](https://img.shields.io/badge/npm-11-CB3837?logo=npm&logoColor=white&style=flat-square)](https://www.npmjs.com/)

Use Node.js 24 to match GitHub Actions. Node.js includes npm, and the local setup was verified with npm 11.

### Clone

```sh
git clone https://github.com/mhsatgit/SmartWatch.git
cd SmartWatch
```

### Install and start

From the project root, install the locked dependencies and start Vite.

```sh
npm ci
npm run dev
```

Open the address printed by Vite, usually `http://127.0.0.1:5173/`. Keep the terminal open while using the app and press `Ctrl+C` to stop it. If PowerShell blocks `npm.ps1`, use `npm.cmd` in place of `npm`.

### Production build

```sh
npm run build
npm run preview
```

The build runs the TypeScript checks and writes the static site to `dist/`. Open the address printed by the preview command, usually `http://127.0.0.1:4173/`.

## Project map

```text
src/
├── app/                   App, navigation, watch state, and timer logic
├── components/            Dashboard controls and shared watch icons
│   └── screens/           Watch displays grouped by feature
├── data/                  App catalog and navigation definitions
├── hooks/                 Clock updates and pointer gestures
└── styles/                Watch shell, screen, and dashboard styles

.github/workflows/deploy.yml  Builds and publishes to GitHub Pages on pushes to main
```

## Scope and simulation

This unofficial replica is based on reference photos and videos of the Fastrack FT_A9508 with firmware v6.7.16. It runs entirely in the browser, with sample data for the health screens and simulated workout sessions.
