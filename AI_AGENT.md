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

### Project Philosophy: UI = f(state) + f(url)

This project follows a core UI philosophy:

```
UI = f(state) + f(url)
```

**Key Principles:**
- Any UI state that needs to be shared across components (and is not from data sources) should be semantically mapped to URLs
- URLs serve as the single source of truth for shareable application state
- This enables deep linking, bookmarking, and consistent state management across page refreshes
- Component state should derive from URL parameters when applicable

**Examples in Practice:**
```typescript
// ✅ CORRECT: Reading UI state from URL
const { searchParams } = useUrl();
const topic = searchParams.get("topic") ?? undefined;
const orderBy = searchParams.get("orderBy") ?? "title";
const orderDesc = searchParams.get("orderDesc") === "true";
const followPrior = searchParams.get("followPrior") === "true";

// ✅ CORRECT: Updating URL to reflect UI state changes
const handleFilterChange = (newTopic: string) => {
  updateSearchParams({ topic: newTopic });
};

// ❌ INCORRECT: Using local state for shareable UI state
const [currentFilter, setCurrentFilter] = useState("all"); // Should be in URL
```

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

### Multi-Theme Architecture
Each demo has its own theme configuration with consistent patterns but different color schemes:

**Theme Location Pattern**: `/src/[demo]/utils/theme.ts`
- **Forum**: Orange/blue theme (#FF772E, #2f5d6f)
- **Assistant**: Purple theme (#8179d2) with extended palette (`border`, `bgOpacity`)
- **Datahub**: Teal theme (#66cccc) with custom breakpoints (`ml: 1440`)
- **Photos**: Individual theme configuration
- **Home**: Landing page theme

**Common Theme Features**:
```typescript
const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: { fontFamily: `Comfortaa, "jf openhuninn"` },
  colorSchemes: { light: { /* ... */ }, dark: { /* ... */ } },
  components: {
    MuiInputBase: { 
      defaultProps: { 
        sx: { "&.Mui-disabled::before": { borderBottomStyle: "solid" } } 
      } 
    },
  },
  spacing: "0.5rem",
});
```

### Font Loading Pattern
Each demo loads fonts via its own `app.css`:
```css
/* /src/[demo]/utils/app.css */
@font-face {
  font-family: "Comfortaa";
  src: url("../../assets/fonts/Comfortaa-VariableFont_wght.ttf") format("truetype");
  font-weight: 300 700;
  font-display: block;
}

@font-face {
  font-family: "jf openhuninn";
  src: url("../../assets/fonts/jf-openhuninn-2.1.ttf") format("truetype");
  font-display: swap;
}
```

### AppWrapper Pattern
**CRITICAL**: Every demo uses the `AppWrapper` component for consistent setup:

```typescript
// /src/[demo]/components/AppWrapper.tsx
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { theme } from "../utils/theme";
import { Toaster } from "@/components/Toast";
import { AppError } from "./AppError";

const queryClient = new QueryClient();

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="bottom-right" />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallbackRender={(props) => <AppError {...props} />}>
          {children}
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
```

**Exception**: The `home` demo uses a simplified AppWrapper without QueryClient/ErrorBoundary.

### Responsive Font Size Pattern
Every demo implements responsive font sizing:

```typescript
// Pattern used in all demos
const useResponsiveFontSize = () => {
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isLg) document.documentElement.style.fontSize = "16px";
    else if (isMd) document.documentElement.style.fontSize = "15px";
    else document.documentElement.style.fontSize = "13px";
  }, [isLg, isMd, isSm]);

  return { isLg, isMd, isSm };
};
```

### Component Organization
```
components/
├── AppWrapper.tsx    # Required: Theme + providers setup
├── AppError.tsx      # Required: Error boundary fallback
├── feature/          # Group by feature/domain
│   ├── FeatureList.tsx
│   ├── FeatureItem.tsx
│   └── FeatureForm.tsx
├── shared/           # Shared within demo
└── layout/           # Layout components (appbar, sidebar, etc.)
```

### Styling Utilities
**Shared utilities** (`/src/utils/commonSx.ts`):
```typescript
export const ellipsisSx = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-all",
} as const;

export const underlineSx = {
  "&:hover": { textDecoration: "underline" },
  cursor: "pointer",
} as const;

export const generateMuiColorMix = (color1: string, color2: string, percentage: number) => {
  return `color-mix(in srgb, var(--mui-palette-${color1}) ${percentage}%, var(--mui-palette-${color2}) ${100 - percentage}%)`;
};
```

**Demo-specific utilities**: Each demo may have additional styling utilities in their own `utils/commonSx.ts` for specialized patterns.

### Common Layout Patterns
```typescript
// ✅ CORRECT: Responsive container patterns
<Container
  maxWidth={false}
  sx={{
    maxWidth: 1400,
    flexDirection: { xs: "column-reverse", md: "row" },
  }}
>
  <Box sx={{ flex: 1 }}>
    <Paper sx={{ py: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
      {/* Content */}
    </Paper>
  </Box>
  
  <Stack sx={{ gap: { xs: 1, md: 4 }, maxWidth: { xs: 1, md: 400 } }}>
    {/* Sidebar */}
  </Stack>
</Container>

// ✅ CORRECT: Responsive component rendering
const { isMd } = useResponsiveFontSize();
return isMd ? <DesktopComponent /> : <MobileComponent />;
```

### Theme Extension Patterns
For demos requiring custom theme properties:

```typescript
// Extend MUI theme types
declare module "@mui/material/styles" {
  interface Palette {
    border: Palette["primary"];
    bgOpacity: Palette["primary"];
  }
  interface PaletteOptions {
    border?: PaletteOptions["primary"];
    bgOpacity?: PaletteOptions["primary"];
  }
}

// Use in theme configuration
const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        border: { main: "var(--mui-palette-divider)" },
        bgOpacity: { main: "0.45" },
      },
    },
  },
});
```

### Error Boundaries
Error boundaries are automatically configured in `AppWrapper`:
- **Automatic**: All demos use ErrorBoundary via AppWrapper
- **Fallback**: Each demo has its own `AppError.tsx` component
- **Exception**: Home demo doesn't use ErrorBoundary (landing page)

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
npm run stat             # Code statistics and analysis
```

### Build & Deployment Pipeline
The build system includes specialized scripts for production deployment:

**`/src/build.js`** - Post-build processing:
- Reorganizes built files from dev paths to production paths
- Moves HTML files based on `routes.json` mapping
- Cleans up temporary `/dist/src` directory
- Prepares `/deploy` directory for GitHub Pages deployment
- Preserves `.git` directory in deployment folder

**`/src/stat.js`** - Project analysis:
- Counts lines of code and non-empty characters
- Analyzes file structure across allowed extensions
- Identifies empty directories
- Provides development insights and project metrics

**Build Flow:**
1. `tsc -b` - TypeScript compilation
2. `vite build` - Production bundle creation  
3. `node src/build.js` - Post-build file organization
4. Output ready in `/deploy` directory for deployment

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

### URL State Management
- ❌ **NEVER** use local component state for shareable UI state that should persist across navigation
- ❌ **NEVER** hardcode URL paths in components (use `routes` object)
- ❌ **NEVER** ignore URL state when implementing filters, pagination, or navigation state

### Form & UI Patterns  
- ❌ **NEVER** call `toast.success()`, `toast.error()`, etc. directly (use `console.log/error/warn`)
- ❌ **NEVER** skip form validation with Zod schemas
- ❌ **NEVER** implement responsive layouts without using `useResponsiveFontSize()` hook

---

## 📋 Quick Reference Checklist

When implementing new features, ensure:

- [ ] **Use `console.log("...")` for user notifications, NEVER `toast.*()` directly**
- [ ] **Use `AppWrapper` component for all demo page setup (theme, providers, error boundary)**
- [ ] **Implement `useResponsiveFontSize()` hook in each demo's main App component**
- [ ] **Follow UI = f(state) + f(url) philosophy: map shareable UI state to URL parameters**
- [ ] Database operations use `SQLiteClient` with `tryCatch`
- [ ] React Query hooks follow naming conventions
- [ ] Forms use Zod validation with standardized error handling
- [ ] Routes are defined in `routes.json` and accessed via `routes` object
- [ ] Error handling follows `{data, error}` pattern
- [ ] Components use MUI theming and responsive patterns with demo-specific theme
- [ ] Import paths use consistent `@/` aliases
- [ ] New utilities are placed in appropriate shared folders (or demo-specific if needed)
- [ ] TypeScript strict mode requirements are met
- [ ] No hardcoded strings for routes or error messages
- [ ] Each demo has its own `theme.ts` with consistent structure but demo-specific colors
- [ ] Font loading via demo-specific `app.css` files
- [ ] Use shared styling utilities from `/src/utils/commonSx.ts` when possible
- [ ] URL state management for filters, pagination, and navigation state (not local component state)

**Remember**: This project simulates dynamic websites using static technologies. Always maintain the illusion of a real backend while keeping the frontend-only nature transparent to users.
