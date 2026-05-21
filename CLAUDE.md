# CLAUDE.md — project-shoesb (Angular Frontend)

## Project Overview

Angular 17 e-commerce frontend for a shoe store. Communicates with the `s4fez/-node.js-backend` Express API. Users browse products by brand, manage a shopping cart, and checkout. Supports role-based access control (Customer / Staff / Admin).

- **Framework:** Angular 17.1.0 (NgModule-based — not standalone components)
- **Language:** TypeScript 5.2.2
- **Styling:** SCSS + Bootstrap 5.3.3
- **UI libraries:** SweetAlert2 (alerts/confirmations), jwt-decode (token decoding)
- **Dev server port:** 4200 (proxies `/api` → `http://localhost:3000`)
- **UI language:** Thai (ภาษาไทย) — preserve existing Thai text
- **Branch:** `main`

## Repository Structure

```
project-shoesb/
├── src/
│   ├── main.ts                         # Angular bootstrap
│   ├── index.html
│   ├── styles.scss                     # Global styles
│   ├── proxy.conf.json                 # Dev proxy: /api → localhost:3000
│   └── app/
│       ├── app.module.ts               # Root NgModule — all component declarations
│       ├── app-routing.module.ts       # Active routing configuration (with guards)
│       ├── routes.ts                   # Legacy routing file — NOT used by app.module.ts
│       ├── app.component.ts/html/scss
│       │
│       ├── models/
│       │   └── role.model.ts           # UserRole enum: CUSTOMER | STAFF | ADMIN
│       │
│       ├── interceptors/
│       │   └── token.service.ts        # AuthInterceptor — attaches Bearer JWT to requests
│       │
│       ├── guards/
│       │   └── role.guard.ts           # RoleGuard — role-based route protection
│       │
│       ├── auth.service.ts             # Auth state: isAuthenticated, getUserRole, logout
│       ├── authGuard.service.ts        # AuthGuard — redirects to /login if not authenticated
│       ├── api.service.ts              # Base API service (baseApiUrl)
│       │
│       ├── product.ts                  # Product interface/model
│       ├── stock.ts                    # Stock interface/model
│       │
│       ├── home/                       # Home page
│       ├── navbar/                     # Navigation bar
│       ├── login/                      # Login form
│       ├── contact/                    # Contact page
│       ├── brand/                      # Brand listing + sub-brand components
│       │   ├── brand.component.*
│       │   ├── nike/
│       │   ├── puma/
│       │   ├── adidas/
│       │   ├── li-ning/
│       │   ├── anta/
│       │   ├── converse/
│       │   └── detailpd/               # Product detail page (/detailpd/:id)
│       ├── cart/                       # Shopping cart
│       ├── shopping-cart-popup/        # Cart popup overlay
│       ├── payment-popup/             # Payment confirmation popup
│       ├── promotion/                  # Promotions page
│       ├── userprofile/                # User profile with image upload
│       ├── environment/               # Environment config
│       └── service/                   # Additional services
├── src/scss/                          # Shared SCSS partials
├── src/assets/
├── src/img/
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── databasepg.js                      # Standalone PG connection file (root-level, not used by Angular)
└── package.json
```

## Development Commands

```bash
npm run dev        # ng serve — dev server at http://localhost:4200
npm run build      # ng build — production build
npm run test       # ng test — Karma/Jasmine unit tests
npm run watch      # ng build --watch (dev config)
```

The dev server is configured with `src/proxy.conf.json` to forward `/api/*` requests to `http://localhost:3000`, so the backend must be running locally.

## Authentication & Authorization

### Token Storage
- JWT token: `localStorage.getItem('token')`
- User profile: `localStorage.getItem('userProfile')` (JSON object with `sys_role` field)

### Services & Guards
| File | Purpose |
|------|---------|
| `auth.service.ts` | `isAuthenticated()`, `getUserRole()`, `hasRole()`, `isAdmin()`, `isStaff()`, `isCustomer()`, `logout()` |
| `authGuard.service.ts` | Redirects unauthenticated users to `/login` |
| `guards/role.guard.ts` | Blocks routes based on `UserRole`; uses `route.data.roles` |
| `interceptors/token.service.ts` | `AuthInterceptor` — adds `Authorization: Bearer <token>` to every outgoing request |

### UserRole Enum (`models/role.model.ts`)
```typescript
enum UserRole {
  CUSTOMER = 'customer',
  STAFF    = 'staff',
  ADMIN    = 'admin',
}
```

## Routing (`app-routing.module.ts`)

> **Important:** `routes.ts` is a legacy file. The active routing is in `app-routing.module.ts`.

| Path | Component | Guard(s) |
|------|-----------|----------|
| `/` | → redirects to `/login` | — |
| `/login` | `LoginComponent` | — |
| `/home` | `HomeComponent` | `AuthGuard` |
| `/brand` | `BrandComponent` | `AuthGuard` |
| `/brand/nike` | `NikeComponent` | `AuthGuard` |
| `/brand/puma` | `PumaComponent` | `AuthGuard` |
| `/brand/adidas` | `AdidasComponent` | `AuthGuard` |
| `/brand/li-ning` | `LiNingComponent` | `AuthGuard` |
| `/brand/anta` | `AntaComponent` | `AuthGuard` |
| `/brand/converse` | `ConverseComponent` | `AuthGuard` |
| `/detailpd/:id` | `DetailpdComponent` | `AuthGuard` |
| `/cart` | `CartComponent` | `AuthGuard` + `RoleGuard` (CUSTOMER only) |
| `/contact` | `ContactComponent` | `AuthGuard` |
| `/profile` | `UserProfileComponent` | `AuthGuard` |

Future admin routes (`/admin/orders`, `/admin/inventory`, etc.) are already outlined as commented-out stubs in the routing file.

## API Integration

- Dev proxy: `src/proxy.conf.json` routes `/api` to `http://localhost:3000`.
- `api.service.ts` exposes `baseApiUrl` used by components for constructing image URLs.
- HTTP calls use Angular's `HttpClient`. The `AuthInterceptor` automatically attaches the JWT.
- Backend login response includes `{ token, userId }` — the token is stored to `localStorage`.

## Module Structure (NgModule)

This project uses the **NgModule pattern** — all components must be declared in `app.module.ts`.
- **Do not** use Angular standalone components without converting the project first.
- Always add new components to the `declarations` array in `app.module.ts`.
- `AppRoutingModule` is imported in `AppModule`; it uses `RouterModule.forRoot(routes)`.

## Coding Conventions

### Language
- UI-facing text is in **Thai**. Do not translate or change existing Thai text unless explicitly asked.
- Code (variable names, function names, TypeScript interfaces) is in English.
- Comments may be in Thai or English — maintain consistency with the surrounding code.

### File Naming
- Components: `kebab-case.component.{ts,html,scss,spec.ts}`
- Services: `camelCase.service.ts` (but guard files use `camelCase.service.ts` or `role.guard.ts`)
- Models: `kebab-case.model.ts`

### Styling
- Use Bootstrap 5 classes for layout and utilities wherever possible.
- Component-level styles go in the `.component.scss` file.
- Shared SCSS partials live in `src/scss/`.

### Alerts / Notifications
- Use **SweetAlert2** (`sweetalert2`) for all user-facing alerts, confirmations, and toasts.
- Do not use `window.alert()` or `window.confirm()`.

### No State Management Library
- There is no NgRx or other state management library. State is kept in services and passed between components via `@Input`/`@Output` or shared services.

## Image Handling

- Profile images are uploaded via `POST /api/uploads` (multipart `image` field).
- Images are stored on the backend and referenced as `baseApiUrl + user_img`.
- The user profile component provides file selection, preview, and upload UI.

## Testing

- Framework: Karma + Jasmine.
- Run: `npm test`.
- Spec files live alongside source files (`.component.spec.ts`).
- Always run tests before committing changes that touch auth, routing, or shared services.

## Git Workflow

- Main branch: `main`
- Commit messages have historically been in Thai.
- The `.claude/` directory contains Claude Code project settings.

## Important Notes for Claude

1. **Do not use standalone components.** The project is NgModule-based. Always declare new components in `app.module.ts`.

2. **`routes.ts` is legacy.** All routing changes go in `app-routing.module.ts`.

3. **Preserve Thai language.** Never modify existing Thai UI strings unless explicitly asked.

4. **RBAC is in place.** When adding new protected routes, apply `AuthGuard`. If the route should be role-restricted, also apply `RoleGuard` and pass `data: { roles: [UserRole.XXX] }`.

5. **The `databasepg.js` file in the root** is a standalone PostgreSQL connection helper — it belongs to the backend, not Angular. It is not imported by any Angular code.

6. **Two routing files exist** — `app-routing.module.ts` (active) and `routes.ts` (legacy duplicate). Changes should only go into `app-routing.module.ts`.

7. **Backend connection** — The frontend assumes the backend runs at `http://localhost:3000` in development. In production, the `baseApiUrl` in `api.service.ts` must point to the deployed backend.
