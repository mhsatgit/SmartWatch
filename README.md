
# Smart Watch Simulation

**A reference-based, interactive smartwatch demo for the browser.**

**Fastrack FT_A9508 Watch Replica.**

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Frontend only](https://img.shields.io/badge/Frontend-only-222222)](#scope-and-simulation)




> An unofficial visual replica inspired by the Fastrack FT_A9508 (firmware v6.7.16) reference photos and videos. It does not connect to a real watch or provide real health measurements.

## At a glance

| | |
| --- | --- |
| **Built with** | React, TypeScript, Vite, CSS, SVG |
| **Starting screen** | Analog always-on display (AOD) |
| **Interaction** | Pointer and touch gestures, mouse wheel, keyboard arrows |
| **Data** | Local demo state; settings persist in browser storage |

## Explore the watch

- Wake the AOD with the side MENU button to reveal the green X face.
- Swipe left from the face through **Activity → Recent Multisport → Heart Rate → Sleep → SpO₂ → Stress**.
- Swipe right from the face to open the **Good Evening** feed.
- Swipe down for two quick-settings pages; swipe up for notifications.
- Open the app drawer from the face and browse the 21 icons documented in the video references.
- Use Recent Multisport to explore workout setup, goal selection, and the simulated workout session.

### Controls

| Input | Action |
| --- | --- |
| Click or tap the side MENU button | Wake the AOD, open the app drawer from the face, or go back from a subpage |
| Click or tap the side SPORTS button | Open Recent Multisport |
| Drag or swipe left/right | Move through adjacent pages |
| Drag or swipe down/up from the watch face | Open quick settings / notifications |
| Arrow keys | Perform the matching swipe direction |
| Up/Down arrows on scrollable screens | Scroll the current list or feed |
| Mouse wheel or vertical drag | Scroll content |
| Tap an icon or control | Open or operate that feature |

## Run locally

### Requirements

[![Node.js](https://img.shields.io/badge/Node.js-≥20-339933?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://nodejs.org/)

[![npm](https://img.shields.io/badge/npm-latest-CB3837?logo=npm&logoColor=white&style=for-the-badge)](https://www.npmjs.com/)

### Clone
```sh
git clone https://github.com/mhsatgit/SmartWatch.git
cd SmartWatch
```

### Install and start
**Windows Command Prompt**
Run these commands from the project root:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite, usually `http://127.0.0.1:5173/`. Keep the terminal open while the development server is running; press `Ctrl+C` to stop it.


### Production build

```sh
npm run build
npm run preview
```

The production bundle is written to `dist/`. The preview command serves that bundle locally.

## Project map

```text
src/
├── app/          Screen IDs, navigation reducer, and shared watch state
├── components/   Watch icons and reusable interface pieces
├── data/         App catalog and navigation definitions
├── hooks/        Clock and pointer gesture handling
└── styles/       Watch shell and screen styling

public/references/
├── raw/          Extracted source photos and videos
└── processed/   Selected frames and contact sheets

docs/             Screen inventory, navigation map, manifest, visual notes
```
