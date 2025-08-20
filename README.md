# Battery Monitoring Dashboard

## Overview

This project is a **Battery Monitoring Dashboard** built with Vue 3 and TypeScript. It visualizes device battery readings from a `battery.json` file and includes:

- Analytics summary cards (`StatsCard`)
- Table and grid views (`BatteryTable` & `DeviceGrid`)
- Filtering, sorting, and search (`FilterSection`)
- Pagination (`Pagination`)
- View mode toggle (grid/table)
- Responsive UI with TailwindCSS
- Icons from `lucide-vue-next`

## Project Structure

```
src/
|-- components/ # Reusable components like StatsCard, Pagination,
|-- views/ # Page-level views like Home.vue
|-- utils/ # Helper functions like getBatteryStatus, formatTimestamp
|-- tests/ # Unit and integration tests
|-- data/ # Static data like battery.json
|-- types/ # TypeScript types and interfaces
|-- assets/ # Images, icons, fonts, or other static assets
|-- config/ # App-wide configuration files, constants, env setups
|-- router/ # Vue Router setup files
```

## Setup

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Run unit tests

```bash
npm run test
```

### Assumptions

- Battery levels in battery.json are fractions (0–1) and displayed as percentages.
- Dataset is large, so filtering and pagination are done client-side.
- TailwindCSS is used for styling; no additional CSS frameworks.

### Usage

- Toggle between Grid and Table views using the buttons at the top.
- Filter devices by battery status using the dropdown.
- Search devices by Employee ID or Serial Number.
- Paginate through readings with the pagination controls at the bottom.
- Click on page numbers or "Prev"/"Next" to navigate pages.

## Testing

Components are tested using Vitest + @vue/test-utils.

Unit tests include:

- StatsCard.spec.ts
- Pagination.spec.ts
- BatteryTable.spec.ts
- DeviceGrid.spec.ts
- Header.spec.ts
- FilterSection.spec.ts

Integration tests include

- Home.spec.ts

### Architecture & Design Decisions

The project is structured to scale gracefully as new features are added:

- Components (components/)
  - Reusable building blocks like StatsCard, BatteryTable, DeviceGrid, Pagination, and FilterSection.
  - Each component is self-contained and manages its own props, state, and events, making it easy to reuse or extend in other views.

- Views (views/)
  - High-level page components like Home.vue that compose multiple components.
  - Separating views from components allows clean separation of layout vs functionality, simplifying routing and future pages.

- Utils (utils/)
  - Helper functions like getBatteryStatus and formatTimestamp.
  - Centralizing utilities avoids code duplication and makes updates consistent across components.

- Types (types/)
  - TypeScript interfaces like DeviceData define data contracts between components.
  - Strong typing prevents runtime errors and helps developers understand what data each component expects.

- Data (data/)
  - Static source (battery.json) separated from the UI logic.
  - Makes it easy to replace or expand the dataset without touching component logic.

- Tests (tests/)
  - Unit and integration tests for components ensure robustness.
  - Testing in isolation means future changes are less likely to introduce regressions.

- Router (router/) & Config (config/)
  - Centralized routing and configuration settings allow flexible scaling for multiple pages, environments, or feature flags.

  ### View Modes: Grid & Table

The dashboard provides both **grid** and **table** views to improve usability and flexibility:

- **Grid View (`DeviceGrid`)**
  - Displays devices as cards with key information at a glance.
  - Ideal for quick scanning and visual comparison.
  - Mobile-friendly with responsive column layout.

- **Table View (`BatteryTable`)**
  - Displays devices in a structured row format with full details.
  - Better suited for detailed inspection, sorting, and scanning large datasets.
  - Includes consistent headers and alignment for easy reference.

**Decision Rationale:**  
Providing both views allows users to **choose the view that best fits their workflow**—grid for visual summary, table for detailed data—without duplicating business logic. Both views share the same computed data (`filteredData` and `paginatedData`) to maintain consistency.

### Why this structure is future-proof:

- Clear separation of concerns makes it easy to add new components, views, or utilities without affecting existing code.
- Modular design simplifies testing, debugging, and maintenance.
- Using TypeScript and Vue 3 Composition API improves developer confidence and reduces runtime issues.
- Styling with TailwindCSS ensures consistent UI patterns that can grow as the app evolves.

### Notes for Further Development

- Pagination and filtering could be moved server-side.
- Add user authentication and role-based dashboards for multi-user scenarios.
- Implement real-time battery monitoring with WebSockets or polling for live updates.
- Add charts for historical trends and analytics.
