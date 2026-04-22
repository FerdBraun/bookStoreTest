# Architecture Documentation

## Technology Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Directory Structure
```
frontend/
├── src/
│   ├── api/            # Axios instance and API calls
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components (routed)
│   ├── store/          # Zustand stores for state management
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Helper functions and validation
│   ├── App.tsx         # Main application component & routes
│   └── index.tsx       # Application entry point
```

## Key Modules

### Authentication
Handled via `authStore` (Zustand). Authenticates against `/api/auth/user`. The backend uses session cookies (`us`) for state. The store keeps track of the user's `login` and `role`.

### Book Management
Data fetching and caching managed by TanStack Query. Fields: `name`, `description`, `publisher`, `created_at`. Sorting supported by `name` and `created_at`.

### Validation
Custom validation logic in `src/utils/validation.ts` implementing requirements from `docs/use-cases.md`. It ensures non-empty fields and allowed characters (Russian, Latin, punctuation).

### Styling
Utility-first styling with Tailwind CSS. Theme variables defined in `src/index.css`.
