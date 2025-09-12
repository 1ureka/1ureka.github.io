# AI Agent Coding Standards & Patterns

This document outlines the development standards, patterns, and conventions used in the 1ureka.github.io.source project. **All AI coding agents must follow these patterns to maintain consistency with the existing codebase.**

## 🏗️ Project Architecture

### Multi-Demo Structure
The project contains 5 independent demo modules under `/src/`:
- `home/` - Landing page demo
- `assistant/` - AI assistant demo  
- `datahub/` - Data management demo
- `forum/` - Forum/community demo
- `photos/` - Photo gallery demo

### Consistent Module Structure
Each demo module follows this exact structure:
```
demo_name/
├── components/        # React components specific to this demo
├── data/             # "Backend" simulation - raw API functions
├── hooks/            # React Query hooks wrapping data functions
├── pages/            # Page components with HTML entry points
├── utils/            # Demo-specific utilities
└── assets/           # Demo-specific assets (if needed)
```

### Shared Resources
```
src/
├── utils/            # Shared utilities across all demos
├── hooks/            # Shared hooks (URL management, etc.)
├── components/       # Shared React components
├── routes.json       # Route definitions for all demos
├── routes.ts         # Environment-aware route resolution
└── assets/          # Shared assets (databases, images, etc.)
```

## 🗄️ Database Schema & Access Patterns

### SQLite.js Integration
- **Core Class**: Use `SQLiteClient` from `/src/utils/SQLiteClient.ts`
- **Database Files**: Store SQLite files in `/src/assets/db/[demo_name].db`
- **IndexedDB Caching**: Automatic caching with timestamp-based invalidation
- **Network Simulation**: 500ms artificial delay (`TEST_DELAY`) to simulate real API calls

### Client Setup Pattern
Every demo must have `data/client.ts`:
```typescript
import DB_PATH from "@/assets/db/[demo_name].db?url";
import { SQLiteClient } from "@/utils/SQLiteClient";

export const sqlite = new SQLiteClient({
  dbPath: DB_PATH,
  storageKey: "sqlite-db-[demo_name]",
});
```

### Database Operations
- **Foreign Keys**: Always enable with `PRAGMA foreign_keys = ON;`
- **Error Handling**: Use `tryCatch` wrapper for all database operations
- **Query Results**: Parse using the built-in `parse()` method
- **Transactions**: Handle within single `exec()` calls when possible

### SQL Patterns
```typescript
// ✅ CORRECT: Parameterized queries with proper error handling
const result = await sqlite.exec(
  "SELECT * FROM users WHERE id = $userId",
  { $userId: userId }
);

// ❌ INCORRECT: String interpolation (security risk)
const result = await sqlite.exec(`SELECT * FROM users WHERE id = ${userId}`);
```

## 🔄 Dynamic Content & API Simulation

### Data Layer Pattern (`data/` folder)
- **Pure Functions**: All functions in `data/` are pure, async functions
- **No React Dependencies**: Never import React hooks in `data/` files
- **Standardized Returns**: Use consistent return patterns
- **Server Simulation**: Optional `server` parameter for server-side simulation

### API Function Signatures
```typescript
// ✅ CORRECT: Standardized pattern
type FetchUser = (params: { id: number }) => Promise<User | null>;
type CreatePost = (params: CreatePostParams) => Promise<{
  success: boolean;
  error: string | null;
  data?: Post;
}>;

// Session-aware operations
type EditProfile = (params: EditProfileParams) => Promise<Session>;
```

### Query Layer Pattern (`hooks/` folder)
- **React Query Wrappers**: All hooks use `@tanstack/react-query`
- **Import from Data**: Import raw functions from corresponding `data/` files
- **Standard Naming**: `use[EntityName]` for queries, `use[Action][EntityName]` for mutations

### React Query Conventions
```typescript
// ✅ CORRECT: Standard query pattern
export const usePosts = (filters: PostFilters) => {
  return useQuery({
    queryKey: ["posts", filters],
    queryFn: () => fetchPosts(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes - STANDARD
  });
};

// ✅ CORRECT: Standard mutation pattern
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
```

### Query Key Conventions
- **Simple Arrays**: `["entity"]`, `["entity", id]`, `["entity", filters]`
- **Consistent Naming**: Use singular entity names
- **Filter Objects**: Include filter objects as second array element
- **Hierarchical**: `["parent", "child"]` for related entities

## 📝 React Query & TanStack Form Patterns

### Form Schema Definition
```typescript
// ✅ CORRECT: Zod schemas with element-level and form-level validation
const formElementsSchema = {
  username: z
    .string()
    .trim()
    .min(4, "使用者名稱至少 4 個字元")
    .max(20, "使用者名稱最多 20 個字元")
    .regex(/^[a-zA-Z0-9 ]+$/, "使用者名稱只能包含英文字母與數字"),
  email: z.string().email("請輸入有效的電子郵件"),
};

const formSchema = z.object(formElementsSchema);
```

### Form Implementation Pattern
```typescript
const form = useForm({
  defaultValues: { username: "", email: "" },
  validators: { onSubmit: formSchema },
  onSubmit: async ({ value }) => {
    if (isPending) return;
    const result = await mutateAsync(value);
    if (result.error) return console.error(result.error);
    // Handle success (navigation, etc.)
  },
  onSubmitInvalid: () => {
    console.error("請檢查表單是否填寫正確");
  },
});
```

### Field Implementation
```typescript
<form.Field
  name="fieldName"
  validators={{ onChange: formElementsSchema.fieldName }}
  children={(field) => (
    <TextField
      name={field.name}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={getFormIsError(field.state.meta.errors)}
      helperText={getFormErrorHelperText(field.state.meta.errors)}
      // ... other props
    />
  )}
/>
```

### Form Error Handling
Use the standardized helpers from `/src/forum/utils/form.ts`:
```typescript
import { getFormIsError, getFormErrorHelperText } from "@/forum/utils/form";
```
**TODO**: These helpers should be moved to shared `/src/utils/` for cross-demo usage.

## 🧭 Routing Management & URL Utils

### Route Definition (`/src/routes.json`)
```json
{
  "demo_page": {
    "dev": "/src/demo/pages/page/index.html",
    "prod": "/demo/page"
  }
}
```

### Route Resolution (`/src/routes.ts`)
```typescript
import { routes } from "@/routes";
// Automatically selects dev/prod based on environment
window.location.href = routes.demo_page;
```

### URL State Management (`/src/hooks/url.ts`)
The custom `useUrl()` hook provides reactive URL management:

```typescript
const { pathname, searchParams, update, updatePath, updateSearchParams } = useUrl();

// Read URL state (reactive)
const currentPath = pathname.get(); // "/current/path"
const pathParts = pathname.getParts(); // ["current", "path"]
const userId = searchParams.get("userId"); // "123" or null

// Update URL state
update("/new/path", { userId: "456" }); // Update both path and params
updatePath("/new/path"); // Update only path
updateSearchParams({ userId: "456" }); // Update only search params
```

### URL Update Options
```typescript
// Available options for all update methods
const options = {
  skipTransition: boolean;      // Skip view transition animation
  clearSearchParams: boolean;   // Clear all search params
};
```

### View Transitions
- **Automatic**: Uses `document.startViewTransition()` when available
- **Fallback**: Graceful degradation for unsupported browsers
- **Skip Option**: Use `skipTransition: true` to disable

## 🛠️ Shared Utils & Common Patterns

### Error Handling (`/src/utils/tryCatch.ts`)
**ALWAYS** use `tryCatch` for async operations that might fail:

```typescript
import { tryCatch } from "@/utils/tryCatch";

// ✅ CORRECT: Standardized error handling
const { data, error } = await tryCatch(someAsyncOperation());
if (error) {
  console.error("Operation failed", error);
  return handleError(error);
}
// Use data safely
```

### Type-Safe Object Operations (`/src/utils/typedBuiltins.ts`)
Replace standard Object methods with type-safe versions:

```typescript
import { fromEntries, toEntries, toKeys } from "@/utils/typedBuiltins";

// ✅ CORRECT: Type-safe object operations
const entries = toEntries(routesJson);
const keys = toKeys(someObject);
const object = fromEntries(someEntries);

// ❌ INCORRECT: Losing type safety
const entries = Object.entries(routesJson); // Type is [string, unknown][]
```

### Selection Management (`/src/hooks/select.ts`)
For table/list selection interfaces:

```typescript
const {
  useRowSelection,
  useAllSelections,
  useSelectedCount,
  useSubmit,
  useReset
} = createUseDynamicSelect();

// In components
const { checked, toggle } = useRowSelection(itemId);
const { checked, indeterminate, toggle } = useAllSelections(totalRows);
const selectedCount = useSelectedCount(totalRows);
const submit = useSubmit();
const reset = useReset();
```

### Formatters (`/src/utils/formatters.ts`)
Standardized formatting functions:

```typescript
import { formatNumber, formatFileSize, formatRelativeTime } from "@/utils/formatters";

formatNumber(1234567); // "1,234,567"
formatFileSize(1024 * 1024); // "1 MB"
formatRelativeTime(new Date(Date.now() - 60000)); // "1 minute ago"
```

### Async Utilities (`/src/utils/async.ts`)
```typescript
import { createDeferred } from "@/utils/async";

const { promise, resolve } = createDeferred<string>();
// Use for manual Promise control
```

## 🎨 Component Patterns & Styling

### Material-UI Integration
- **Theme System**: Use MUI's theme system consistently
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Component Props**: Leverage MUI's `sx` prop for styling
- **Dark/Light Mode**: Support both modes with `className="mode-dark"`

### Component Organization
```
components/
├── feature/           # Group by feature/domain
│   ├── FeatureList.tsx
│   ├── FeatureItem.tsx
│   └── FeatureForm.tsx
├── shared/           # Shared within demo
└── layout/           # Layout components
```

### Common Styling Patterns
```typescript
// ✅ CORRECT: Use shared styling utilities
import { commonSx } from "@/demo/utils/commonSx"; // or similar

// ✅ CORRECT: Responsive patterns
<Container maxWidth="lg">
  <Stack direction={{ xs: "column", md: "row" }}>
    <Box sx={{ flex: 1 }}>...</Box>
  </Stack>
</Container>
```

### Error Boundaries
Wrap page-level components with error boundaries:
```typescript
import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponent />
</ErrorBoundary>
```

## 🛎️ Logging & Notifications (Critical Project Rule)

⚠️ This project uses a **custom unified logging system** where  
`console.log`, `console.error`, `console.warn` is automatically intercepted and shown as **toast notifications**.

### Rules
- ❌ DO NOT call `toast.success()`, `toast.error()`, or `toast.*` directly.  
- ✅ ALWAYS use `console.log("...")` for user-facing notifications.  
- ✅ Messages must be **clear to both developers and end users**.  
- ❌ Never log raw debug info (e.g., `"fetching data..."`).  
- ✅ Instead, use semantic messages (e.g., `"載入留言失敗，請稍後再試"`).

### Implementation Details
The unified logging system is implemented in `/src/components/Toast.tsx`:
- `console.log()` → Shows as info toast (green, 10 seconds)
- `console.error()` → Shows as error toast (red, 15 seconds)  
- `console.warn()` → Shows as warning toast (orange, 10 seconds)

### Correct Usage Examples
```typescript
// ✅ CORRECT: User-friendly messages
console.log("成功標記為已讀");
console.error("登入失敗，請檢查用戶名稱與密碼");
console.warn("此操作無法復原，請確認後再繼續");

// ❌ INCORRECT: Direct toast calls
toast.success("操作成功");
toast.error("操作失敗");

// ❌ INCORRECT: Debug messages for users
console.log("Fetching user data...");
console.error(error.stack);
```

## 🔧 Build System & Development

### Entry Points
Each demo page has its own HTML entry point:
```
demo/pages/page_name/
├── index.html        # Vite entry point
├── main.tsx         # React root setup
└── App.tsx          # Page component
```

### Import Paths
Use consistent import aliases:
```typescript
import { utils } from "@/utils/utils";           // Shared utilities
import { component } from "@/demo/components/component"; // Demo-specific
import { routes } from "@/routes";               // Route definitions
```

### TypeScript Configuration
- **Strict Mode**: All demos use strict TypeScript
- **Path Mapping**: Use `@/` prefix for src/ imports
- **Type Safety**: Prefer type-safe utilities over generic ones

### Build Scripts
```bash
npm run dev              # Development server
npm run lint             # ESLint checking  
npm run build:type       # TypeScript compilation check
npm run build:analyze    # Production build for analysis
npm run build:deploy     # Production build with deployment prep
```

## ⚠️ Critical Don'ts

### Database Security
- ❌ **NEVER** use string interpolation in SQL queries
- ❌ **NEVER** skip parameter binding
- ❌ **NEVER** disable foreign keys without good reason

### Error Handling
- ❌ **NEVER** ignore errors from database operations
- ❌ **NEVER** throw unhandled errors in React components
- ❌ **NEVER** skip error logging

### Performance
- ❌ **NEVER** skip React Query stale time configuration
- ❌ **NEVER** fetch data in render functions
- ❌ **NEVER** ignore cache invalidation after mutations

### Code Organization
- ❌ **NEVER** mix React hooks in `data/` layer functions
- ❌ **NEVER** import demo-specific code in shared utilities
- ❌ **NEVER** hardcode routes (always use `routes` object)

## 🚧 TODOs & Known Gaps

### Shared Utilities
- **TODO**: Move form validation helpers from `/src/forum/utils/form.ts` to `/src/utils/`
- **TODO**: Standardize theme/styling utilities across all demos
- **TODO**: Create shared component library for common UI patterns

### Documentation
- **TODO**: Document database schema patterns and relationships
- **TODO**: Create migration patterns for database schema changes
- **TODO**: Document testing patterns (currently no test infrastructure identified)

### Error Handling
- **TODO**: Standardize error logging and user feedback patterns
- **TODO**: Create global error boundary configuration
- **TODO**: Document offline handling patterns for IndexedDB

### Performance
- **TODO**: Document lazy loading patterns for large datasets
- **TODO**: Create guidelines for query optimization
- **TODO**: Document caching strategies beyond React Query

### Authentication/Session
- **TODO**: Document session management patterns in detail
- **TODO**: Create guidelines for permission handling
- **TODO**: Standardize logout/cleanup procedures

---

## 📋 Quick Reference Checklist

When implementing new features, ensure:

- [ ] **Use `console.log("...")` for user notifications, NEVER `toast.*()` directly**
- [ ] Database operations use `SQLiteClient` with `tryCatch`
- [ ] React Query hooks follow naming conventions
- [ ] Forms use Zod validation with standardized error handling
- [ ] Routes are defined in `routes.json` and accessed via `routes` object
- [ ] Error handling follows `{data, error}` pattern
- [ ] Components use MUI theming and responsive patterns
- [ ] Import paths use consistent `@/` aliases
- [ ] New utilities are placed in appropriate shared folders
- [ ] TypeScript strict mode requirements are met
- [ ] No hardcoded strings for routes or error messages

**Remember**: This project simulates dynamic websites using static technologies. Always maintain the illusion of a real backend while keeping the frontend-only nature transparent to users.