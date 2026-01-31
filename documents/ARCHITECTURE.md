# Frenzo Architecture & Coding Standards

## 1. Architectural Pattern: Feature-Sliced Design (Hybrid)

We will move away from a pure "Layered" structure (`/components`, `/pages`) towards a **Feature-Based** structure for complex logic. This ensures "Screaming Architecture"—the folder structure tells you what the app _does_.

### Folder Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Shared "dumb" UI components (Design System)
│   ├── ui/          # Atoms: Button, Input, Card, Modal
│   ├── layout/      # Organisms: Navbar, Footer, Section
├── config/          # Global configuration (constants, environment)
├── features/        # Business Logic & Complex Features
│   ├── pricing/     # FEATURE: Pricing Engine
│   │   ├── hooks/   # Logic (usePricingCalculator)
│   │   ├── components/ # Sub-components (PricingCard, Calculator)
│   │   ├── constants.js # Configuration
│   │   └── index.js # Public API
│   ├── contact/     # FEATURE: Contact Forms & Logic
│   └── solutions/   # FEATURE: Services & Use Cases
├── hooks/           # Shared global hooks (useScroll, useWindowSize)
├── lib/             # Utilities and helpers (date formatting, currency)
├── pages/           # Page Routings (Page-level composition only)
└── styles/          # Global styles
```

## 2. Design Patterns

### A. Custom Hooks (Logic/UI Separation)

**Rule**: Components should not contain complex logic.

- **Bad**: `Pricing.jsx` having `calculateTotal()` and `useEffect` inside.
- **Good**: `const { total, subtotal } = usePricingCalculator();`
- **Why**: Follows **Single Responsibility Principle (SRP)**. The Component handles _Rendering_, the Hook handles _Logic_.

### B. Compound Components

For complex UI elements (like the Calculator or Tabs), use Compound Components to avoid "Prop Drilling".

### C. Container/Presentational

- **Container**: Fetches data, executes logic (often a Page or Feature Root).
- **Presentation**: Pure UI receives props and renders.

## 3. SOLID Principles in React

1.  **SRP (Single Responsibility)**: A file/component should do one thing.
    - _Action_: Split `Pricing.jsx` into `PricingHooks`, `PricingUI`, `PricingConfig`.
2.  **OCP (Open/Closed)**: Open for extension, closed for modification.
    - _Action_: Configuration (like Pricing Rates) should be explicitly separated in a `constants` file so adding a new tier doesn't risk breaking the UI.
3.  **LSP (Liskov Substitution)**: UI components (buttons, cards) should behave predictably and accept standard DOM props.
4.  **ISP (Interface Segregation)**: Don't pass massive objects to small components. Pass only what they need.
5.  **DIP (Dependency Inversion)**: High-level modules should not depend on low-level modules. Use abstractions (hooks/configs).

## 4. Coding Standards

- **Files**: PascalCase for Components (`PricingCard.jsx`), camelCase for helpers/hooks (`usePricing.js`).
- **CSS**: Styled Components or CSS Modules preferred over inline styles for complex components. (We are currently using inline/global CSS, which we will gradually structure).
- **Exports**: Use Named Exports for better tree-shaking and predictability.
- **No Magic Numbers**: hardcoded values like `25000` must be in a constants file.
