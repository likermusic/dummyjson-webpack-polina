# AGENTS.md

This document defines implementation rules for this repository based on the current codebase.

## 1. Project Snapshot (Current State)

- Stack: React 19 + TypeScript + Redux Toolkit + React Router + Axios + Tailwind CSS.
- Bundler: Webpack (`webpack.config.cjs`), not Vite.
- Package manager lock: npm (`package-lock.json`, lockfileVersion `3`).
- Lint/format: ESLint flat config + Prettier (`.prettierrc` is empty object).
- Git hooks: Husky pre-commit runs `npm run lint`.
- Tests: no Jest/Vitest/Playwright/Cypress config and no `*.test.*`/`*.spec.*` files.
- CI: no root `.github/workflows` or `.gitlab-ci.yml`.
- Env files: no `.env*` files.

## 2. Architecture Rules and Folder Responsibilities

## Current `src` layout

```text
src/
  app/
    index.tsx
    AppRouter.tsx
    store.ts
    style.css
  pages/
    auth/
    product/
    products/
  components/
    auth-form/
      api/
      model/
      ui/
      index.ts
      types.ts
  shared/
    api/
    hoc/
    layouts/
    routes.ts
```

## Layer responsibilities

- `app/`: application composition only.
- Router setup.
- Redux store setup.
- Global providers/styles.
- No feature-specific business logic.

- `pages/`: route-level screens.
- Compose widgets/components.
- Minimal page-local logic.
- No shared infrastructure definitions.

- `components/`: reusable business UI blocks.
- Keep vertical slice structure: `ui/`, `model/`, `api/`, `types.ts`, `index.ts`.
- Export public API from `index.ts` only.

- `shared/`: cross-cutting low-level modules.
- Generic API client(s), route constants, layouts, HOCs.
- Must avoid coupling to specific feature/component slices (see boundary notes below).

## Import boundaries

### Current observed flow (allowed)

- `app` imports from `pages`, `components`, `shared`.
- `pages` import from `components`, `shared`.
- `components` import from `shared`.

### Boundary issue currently present (must be fixed gradually)

`src/shared/api/client.ts` imports:
- `@/components/auth-form/types`
- `@/components/auth-form/model/authSlice`
- `@/app/store`

This creates reverse dependency from `shared` to upper layers.

`TODO/Recommendation`:
- Move auth-refresh orchestration out of `shared/api/client.ts` into an auth-specific module (for example under `components/auth-form/api` or future `features/auth`).
- Keep `shared/api` framework-level only.

## 3. Naming and Component Conventions

- Path alias: always use `@/` for internal imports (configured in `tsconfig.json` + webpack alias).
- File naming:
- React components: PascalCase files (`AuthForm.tsx`, `AppRouter.tsx`).
- Hooks/util modules: camelCase (`useAuthForm.ts`, `authSlice.ts`).
- Re-export barrels: `index.ts` per page/component module.

- Component pattern:
- Place presentational code in `ui/`.
- Place state/thunks/hooks in `model/`.
- Place endpoint wrappers in local `api/` when tied to the component/feature.

## TS/React style examples

```ts
// good: strongly typed thunk return
const onSubmit =
  (credentials: AuthCredentials): AppThunk<Promise<void>> =>
  async (dispatch) => {
    // ...
  };
```

```tsx
// good: conditional rendering without nested ternary
{errors.root ? <ErrorBanner text={errors.root.message} /> : null}
```

```ts
// good: route constants from shared/routes.ts
navigate(routes.products, { replace: true });
```

## 4. Configuration and Meta Rules (From Existing Files)

- `package.json`
- `start`: runs webpack dev server + `tsc --watch` concurrently.
- `build`: webpack production build.
- `lint`: `eslint src`.
- `typecheck`: `tsc --noEmit`.
- `test`: placeholder only (currently fails intentionally).

- `tsconfig.json`
- `strict: true`, `moduleResolution: bundler`, `jsx: react-jsx`.
- Alias `@/* -> src/*`.
- `include: ["src"]`.

- `eslint.config.js`
- Flat config is present.
- Ignores `dist`, `node_modules`, `*.config.js`, `*.config.cjs`.
- Important gap: no TypeScript parser/plugin configured.
`TODO/Recommendation`: add `typescript-eslint` config so `.ts/.tsx` are linted robustly.

- `.prettierrc`
- Currently `{}` (default Prettier behavior).
`Recommendation`: define explicit formatting options if team wants deterministic style.

- `webpack.config.cjs`
- Entry: `src/app/index.tsx`.
- Alias `@ -> src`.
- Dev server with HMR and `historyApiFallback: true`.
- Production minimizers: CSS + Terser.

- `postcss.config.js` + `tailwind.config.js`
- Tailwind is active through PostCSS.
- Global stylesheet imports Tailwind via `@import "tailwindcss";`.

- Husky
- `.husky/pre-commit` runs `npm run lint`.

- Tests / E2E / CI / env
- No test runner configs, no E2E configs, no CI config, no env files.
- Treat these as missing, not implicit.

## 5. API Layer Rules

## Current implementation

- Base URL is hardcoded in `src/shared/api/baseUrl.ts`:
- `API_BASE_URL = "https://dummyjson.com"`
- Axios instances:
- `api` (public)
- `protectedApi` (adds `Authorization: Bearer <accessToken>` from Redux state)

## Rules

- Keep endpoint contracts typed with request/response TypeScript types.
- API functions should return `response.data` only.
- Do not call `axios` directly in UI components; use module API wrappers.
- Centralize cross-cutting concerns (headers, token attach, retries) in client/interceptor layer.

## Error handling rules

Current behavior:
- UI-level auth submission catches any error and shows generic message.
- Interceptor retries once on 401 using `x-retry` header guard.

Required practice:
- Map known backend error shapes to user-safe messages in feature `api/model` layer.
- Keep raw transport details out of presentational UI.

## Cancellation and retries

Current state:
- No cancellation strategy.
- No generic retry/backoff policy except auth 401 refresh retry.

`TODO/Recommendation`:
- Use `AbortController`/axios `signal` for request cancellation in long-running or unmounted flows.
- Add explicit retry policy only for idempotent requests.

## 6. Auth Rules and 401 Handling

## Current auth model

- `accessToken`: stored in Redux state (`auth.accessToken`).
- `refreshToken`: stored in `localStorage`.
- Login endpoint: `/auth/login`.
- Refresh endpoint: `/auth/refresh` with `{ refreshToken }` body.
- Me endpoint: `/auth/me` via `protectedApi`.
- Router loaders (`AppRouter.tsx`) use `getMe()` to guard auth/protected routes.

## 401 flow (current)

1. `protectedApi` request gets 401.
2. If `x-retry` header absent, set `x-retry: 1`.
3. Call refresh endpoint using stored `refreshToken`.
4. On success, dispatch `setAccessToken`, optionally rotate refresh token in localStorage.
5. Replay original request.
6. On refresh failure, dispatch `signOut` and reject.

## Security rule for future

Current project uses localStorage for refresh token.
`Recommendation`:
- Prefer HttpOnly secure refresh cookie + short-lived access token in memory for production-grade security.
- If backend cannot support cookies yet, keep current approach but document XSS risk.

## 7. State Management Rules

## Current state management

- Redux Toolkit with one slice: `auth`.
- Thunk typing is centralized in `AppThunk` from `app/store.ts`.
- Async form submit dispatches thunk from `useAuthForm`.

## Rules

- Keep global Redux state minimal (cross-page/session concerns only).
- Prefer local component state for transient UI-only flags unless shared.
- Define typed selectors/hooks when store grows.

`TODO/Recommendation`:
- Add `useAppDispatch` / `useAppSelector` wrappers in `shared/lib` when more slices appear.
- Decide and document whether future server-state should remain manual Axios + Redux thunks or move to RTK Query.

## 8. Testing Strategy and Minimum Required Tests

## Current state

- No test tooling configured.

## Minimum required tests (Recommendation)

- Unit:
- `authSlice` reducers (`signIn`, `signOut`, `setAccessToken`).
- `useAuthForm` behavior (success path, invalid credentials path).

- Integration:
- `protectedApi` interceptor flow:
- attaches bearer token
- retries once on 401
- signs out on refresh failure

- Routing:
- `AppRouter` loaders:
- unauthenticated user redirected from protected routes to `/auth`
- authenticated user redirected away from `/auth` to `/products`

- E2E (once tooling is added):
- login success and access to protected page
- token refresh scenario

`TODO`: choose runner (Vitest + Testing Library recommended for current stack).

## 9. PR Checklist / Definition of Done

Before merge, every PR should satisfy:

- Architecture
- Changes follow layer responsibilities (`app/pages/components/shared`).
- No new reverse dependency from `shared` to feature/page/app modules.

- Typing and API
- New/changed API contracts are typed.
- UI does not call transport client directly.
- Error states are handled and user-visible where relevant.

- Auth/security
- 401 behavior preserved.
- Token handling remains consistent with current model (or migration is fully documented).

- Quality gates
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run build` passes.
- Added/updated tests for behavior change (if test stack exists).

- DX/docs
- Update this `AGENTS.md` if architecture or conventions change.
- Keep route constants centralized in `src/shared/routes.ts`.

## 10. Known Gaps to Address

- Add TypeScript-aware ESLint config.
- Add test runner and baseline tests.
- Add CI pipeline for lint/typecheck/build/test.
- Move auth-specific logic out of `shared/api/client.ts` to remove layer inversion.
- Move `API_BASE_URL` to env-based configuration with `.env.example` once env pipeline is introduced.
