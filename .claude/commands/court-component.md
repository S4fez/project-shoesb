# court-component — COURT Design Angular Component Generator

Create a new Angular component following the **COURT design system** used in this project.

## Usage
```
/court-component <ComponentName> [page|widget|modal] [route?]
```

## Examples
```
/court-component OrderHistory page /orders
/court-component ProductCard widget
/court-component SizeGuide modal
```

---

## Instructions

The user wants to create a new Angular component. The argument is: **$ARGUMENTS**

Parse the argument to determine:
- **name** — PascalCase component name (e.g. `OrderHistory`)
- **type** — `page` (full routed page), `widget` (reusable UI piece), or `modal` (overlay/dialog). Default: `page`
- **route** — optional URL path (e.g. `/orders`). Only for `page` type.

### Step 1 — Read existing files for context
Read these files before generating anything:
- `src/app/app.module.ts` — to see current declarations
- `src/app/app-routing.module.ts` — to see current routes
- `src/styles.scss` — to confirm available CSS variables
- One existing component (e.g. `src/app/shop/shop.component.html`) — to match template style

### Step 2 — Generate component files

Create these 3 files:

**`src/app/{kebab-name}/{kebab-name}.component.ts`**
```typescript
import { Component, OnInit } from '@angular/core';
// import services as needed

@Component({
  selector: 'app-{kebab-name}',
  templateUrl: './{kebab-name}.component.html',
  styleUrls: ['./{kebab-name}.component.scss']
})
export class {PascalName}Component implements OnInit {
  // properties here

  ngOnInit(): void {
    // init logic
  }
}
```

**`src/app/{kebab-name}/{kebab-name}.component.html`**
- Use COURT design tokens: `--court-bg`, `--court-surf`, `--court-surf2`, `--court-line`, `--court-ink`, `--court-mute`, `--court-orange`, `--court-orange-deep`
- Heading font: `font-family: var(--font-display)` (Anton)
- Body font: `font-family: var(--font-body)` (Space Grotesk)
- For **page** type: include full-page wrapper with `background: var(--court-bg)` and `min-height: 100vh`
- For **widget** type: self-contained card/block
- For **modal** type: overlay with backdrop
- Basketball court aesthetic: use `border: 1px solid var(--court-line)`, orange accents on CTAs

**`src/app/{kebab-name}/{kebab-name}.component.scss`**
- Use only CSS custom properties (no hardcoded hex values)
- Follow BEM-lite naming: `.{kebab-name}`, `.{kebab-name}__header`, `.{kebab-name}__body`, etc.
- Include hover states for interactive elements using `--court-orange`

### Step 3 — Register the component

Edit `src/app/app.module.ts`:
- Add import statement
- Add to `declarations` array

### Step 4 — Add route (page type only)

If the component is a `page` type and a route was provided, edit `src/app/app-routing.module.ts`:
- Add route with `AuthGuard` (most pages require auth)
- Keep existing routes intact

### Step 5 — Report

List the files created/modified and the route added (if any).
