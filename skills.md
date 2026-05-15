# 🛠 Repository Skills & Standards

This document defines the architectural patterns, engineering standards, and "skills" required to maintain and extend the **Thermax Refactor** project. It serves as the primary source of truth for all developers and AI assistants.

---

## 🏗 1. Architecture & Organization

The project follows a **Feature-First** modular architecture. Each feature is self-contained, promoting scalability and clear ownership boundaries.

### Project Structure
- `src/pages/[feature]/`: UI components, views, and feature-specific logic.
- `src/services/query/[feature]/`: Data fetching logic, types, and API mappers.
- `src/routes/config/`: Route definitions for each feature module.
- `src/components/ui/`: Shared, low-level UI primitives (Shadcn/UI).
- `src/lib/`: Core utilities and shared business logic.

### 🔒 Module Boundary Rules
- **Strict Isolation**: Features must not directly depend on internal files of other features.
- **Shared Resources**: Reusable logic, hooks, or components must be moved to global directories (`src/lib`, `src/hooks`, `src/components`).
- **Avoid**: `import { InternalLogic } from "@/pages/chat/lib/internal";`
- **Prefer**: `import { formatCurrency } from "@/lib/formatters";`

---

## 📛 2. Naming & Code Style

### Naming Conventions
- **Components**: `PascalCase` inside code (e.g., `UserCard`), but filenames must be `kebab-case` (e.g., `user-card.tsx`).
- **Hooks**: `camelCase` inside code (e.g., `useGetUsers`), but filenames must be `kebab-case` (e.g., `use-get-users.ts`).
- **Files/Folders**: Always `kebab-case` (e.g., `member-list-view.tsx`, `chat-message-card.tsx`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_UPLOAD_SIZE`).
- **Types/Interfaces**:
    - API Responses: `[Name]Response` (e.g., `UserResponse`).
    - UI Models: `[Name]Model` (e.g., `UserModel`).

### 🧹 Code Quality Standards
- **Component Limits**: Keep components under ~300 lines.
- **Hook Limits**: Keep hooks under ~200 lines.
- **Single Responsibility**: Extract complex business logic into custom hooks.
- **Import Order**: 1. React, 2. Third-party, 3. Shared/Internal, 4. Relative, 5. Styles.

---

## 🔄 3. Data Management

### API Normalization Pattern
Never expose raw backend responses directly to UI components.
1. **Raw Types**: Define `[Name]Response` for backend-oriented data.
2. **Frontend Models**: Define `[Name]Model` for UI-friendly consumption.
3. **Mappers**: All transformation logic must live in mapper functions.
4. **React Query**: Always use the `select` option for final transformations.

```ts
useQuery({
  queryKey: ["users"],
  queryFn: getUsers,
  select: (data) => data.map(mapUser), // mapUser converts Response -> Model
});
```

### 🧠 React Query Standards
- **Query Keys**: Centralize keys in a constant object.
  ```ts
  export const userKeys = {
    all: ["users"] as const,
    detail: (id: string) => ["users", id] as const,
  };
  ```
- **Mutations**: Always invalidate affected queries after a successful mutation.

### 🔒 Environment Variables
- All client-side variables must use the `VITE_` prefix.
- Access variables through a centralized config helper, never hardcoded.

---

## 🛡 4. Quality & Safety

### ❌ Error Handling
- **User-Friendly**: Never swallow API errors; show meaningful messages via toast notifications.
- **Axios Interceptor**: Responsible for token injection, 401 redirects, and generic error formatting.

### 🛡 Type Safety
- **Strict Typing**: Always ensure strict type safety. Do NOT use `any` or `unknown`. Always define explicit types or interfaces.
- **React Query Mutations**: Use `void` if there is no return type needed for a mutation.
  ```ts
  useMutation<void, AxiosError<ApiError>, FormData>
  ```
- **Zod Validation**: Use Zod to validate API payloads and form inputs.

### 🧪 Testing Standards
- **Stack**: Vitest + React Testing Library + MSW.
- **Rules**: Test behavior over implementation; mock API layers, not UI components.

---

## ⚡ 5. Performance & Optimization

- **Lazy Loading**: All feature routes must be lazy-loaded in `src/routes/lazy-imports.tsx`.
- **Derived State**: Prefer derived state (e.g., `const isFull = items.length > 10`) over duplicated `useState`.
- **Memoization**: Use `useMemo` for expensive calculations and `memo` for heavy re-rendering components.
- **Virtualization**: Use `TanStack Virtual` for large tables or long lists.

---

## 📋 6. Common Playbooks

### "How to add a new API-driven page"
1. Define types and mappers in `src/services/query/[feature]/`.
2. Centralize query keys in that feature's service layer.
3. Create the UI view in `src/pages/[feature]/views/`.
4. Register the lazy import and route config in `src/routes/`.

### "How to fix a 'Not Found' API error"
1. Verify the service prefix (e.g., `/doctor_conbot` vs `/dr_conbot`).
2. Check the centralized environment config.
3. Ensure the backend route matches the prefix.

---

## ✅ 7. Verification & CI/CD

### Pull Request Checklist
- [ ] `npm run format` and `npm run lint` pass.
- [ ] `tsc -b` passes with no type errors.
- [ ] No `console.log` or unused imports remaining.
- [ ] Loading and Error states are handled gracefully.
- [ ] UI is responsive and verified on mobile/desktop.

### CI/CD Command sequence
```bash
npm run format
npm run lint
tsc -b
# npm run test (when tests are available)
```
