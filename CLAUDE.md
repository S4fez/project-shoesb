# Claude Code Instructions for project-shoesb

## Project Overview
This is an Angular 17 e-commerce application for a shoe business. The project uses Bootstrap for styling, JWT for authentication, and SweetAlert2 for alerts.

**Project Name:** my-finallproject
**Framework:** Angular 17.1.0
**Language:** TypeScript 5.2.2
**Primary Language:** Thai (UI text and some variable names)

## Project Structure

```
src/app/
├── api.service.ts          # Main API service for HTTP requests
├── auth.service.ts         # Authentication service (JWT handling)
├── authGuard.service.ts    # Route guards for protected routes
├── app-routing.module.ts   # Main routing configuration
├── brand/                  # Brand management component
├── cart/                   # Shopping cart component
├── contact/                # Contact page component
├── home/                   # Home page component
├── login/                  # Login/authentication component
├── navbar/                 # Navigation bar component
├── payment-popup/          # Payment popup component
├── product.ts              # Product model/interface
├── promotion/              # Promotion management component
├── service/                # Additional services
├── shopping-cart-popup/    # Shopping cart popup component
├── stock.ts                # Stock model/interface
└── userprofile/           # User profile component (with image upload)
```

## Key Features

1. **User Authentication**
   - JWT-based authentication
   - Auth guard for protected routes
   - User profile management with image upload

2. **E-commerce Functionality**
   - Product catalog
   - Shopping cart
   - Brand management
   - Stock management
   - Payment processing
   - Promotion system

3. **UI/UX**
   - Bootstrap 5.3.3 for responsive design
   - SweetAlert2 for user-friendly alerts
   - Image upload with preview functionality

## Development Commands

```bash
npm run dev        # Start development server (ng serve)
npm run build      # Build for production
npm run test       # Run unit tests
npm run watch      # Build with watch mode
```

## Coding Conventions

### File Naming
- Components: kebab-case (e.g., `user-profile.component.ts`)
- Services: camelCase with `.service.ts` suffix
- Models: camelCase (e.g., `product.ts`, `stock.ts`)

### Language Mixing
- **Backend/API communication:** Uses Thai variable names in some cases
- **UI text:** Primarily Thai language
- **Code comments:** Mix of Thai and English
- When working on this codebase, maintain consistency with existing naming patterns

### Component Structure
- Components follow standard Angular structure:
  - `.component.ts` - Component logic
  - `.component.html` - Template
  - `.component.scss` - Styles
  - `.component.spec.ts` - Tests

## API Integration

- Base API URL is configured and accessed via `baseApiUrl` in components
- API calls are handled through `api.service.ts`
- Authentication tokens are managed by `auth.service.ts`
- JWT tokens are decoded using the `jwt-decode` library

## Image Handling
ด
The user profile component includes image upload functionality:
- File selection with custom button styling
- Image preview before upload
- Popup-based upload interface
- Images are stored on the backend and referenced via `baseApiUrl + user_img`

## Authentication Flow

1. User logs in through login component
2. JWT token is received and stored
3. `authGuard.service.ts` protects routes that require authentication
4. `auth.service.ts` handles token validation and refresh

## Current Status (from git status)

Modified files:
- `package-lock.json` - Dependency updates
- `package.json` - Package configuration changes
- `src/app/userprofile/user-profile.component.html` - User profile template
- `src/app/userprofile/user-profile.component.scss` - User profile styles

Recent work focus: User profile improvements and upload functionality

## Important Notes for Claude

1. **Language Context:** This project uses Thai language for UI and some variables. Don't translate or change existing Thai text unless specifically requested.

2. **Image Uploads:** When working with image upload features, note that the system uses:
   - File input with custom styling
   - Preview functionality before upload
   - Backend API endpoint for file storage

3. **Angular Version:** This is Angular 17, which uses standalone components capability but this project uses NgModule approach. Maintain consistency with the existing module structure.

4. **Bootstrap Integration:** The project uses Bootstrap 5.3.3. When adding new components or styling, use Bootstrap classes where appropriate.

5. **State Management:** No dedicated state management library (NgRx/Akita) is used. State is managed through services and component communication.

6. **Routing:** Route configuration is in `app-routing.module.ts` with additional routes defined in `routes.ts`.

7. **Database:** There's a `databasepg.js` file in the root, suggesting PostgreSQL database usage on the backend.

## When Making Changes

- Always check existing patterns in similar components before implementing new features
- Maintain consistency with Thai language usage in UI
- Use Bootstrap classes for styling when possible
- Follow Angular 17 best practices
- Test authentication flows if modifying auth-related code
- Ensure responsive design with Bootstrap grid system
- Use SweetAlert2 for user notifications and confirmations

## Testing

- Run `npm test` before committing changes
- Ensure all existing functionality works after modifications
- Test authentication flows if auth-related changes are made
- Verify responsive design on different screen sizes

## Git Workflow

Main branch: `main`
- Commit messages have been in Thai
- Recent focus: User profile features and upload functionality
