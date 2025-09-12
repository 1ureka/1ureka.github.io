# AI Agent Development Guidelines for DataHub

本文檔為未來的 AI coding agent 提供開發 `./src/datahub/` 功能時需要遵循的代碼風格、架構模式和開發規範。

## 🏗️ 架構概覽

### 目錄結構
```
src/datahub/
├── components/          # UI 組件
│   ├── appbar/         # 應用程式頂部導航列
│   ├── aside/          # 側邊欄組件
│   ├── home/           # 首頁相關組件
│   ├── schema/         # 資料庫架構可視化組件
│   ├── tables/         # 資料表格相關組件
│   ├── AppError.tsx    # 錯誤邊界組件
│   ├── AppWrapper.tsx  # 應用程式包裝器
│   └── ThemeMenu.tsx   # 主題切換組件
├── data/               # 資料層
│   ├── client.ts       # SQLite 客戶端狀態管理
│   ├── read.ts         # 資料讀取操作
│   ├── select.ts       # 資料查詢操作
│   └── update.ts       # 資料更新操作
├── hooks/              # 自定義 React Hooks
│   ├── init.ts         # 初始化相關 hooks
│   ├── read.ts         # 資料讀取 hooks
│   ├── search.ts       # 搜尋功能 hooks
│   ├── tableControl.ts # 表格控制 hooks
│   ├── tableRows.ts    # 表格行資料 hooks
│   ├── tableSelect.ts  # 表格選擇 hooks
│   └── update.ts       # 資料更新 hooks
├── pages/              # 頁面組件
│   ├── schema/         # 架構頁面
│   ├── tables/         # 表格頁面
│   ├── App.tsx         # 主應用程式組件
│   ├── Page.tsx        # 頁面路由組件
│   ├── index.html      # HTML 模板
│   └── main.tsx        # 應用程式入口點
└── utils/              # 工具函數
    ├── app.css         # 應用程式樣式
    ├── array.ts        # 陣列處理工具
    └── theme.ts        # 主題配置
```

## 📚 技術棧

### 核心技術
- **React 19**: 使用函數組件和 Hooks
- **TypeScript**: 嚴格類型檢查，所有代碼必須有正確的類型定義
- **Material-UI v7**: UI 組件庫，使用 `sx` prop 進行樣式設定
- **TanStack Query**: 資料獲取、緩存和同步
- **Zustand**: 輕量級狀態管理
- **sql.js**: SQLite 資料庫操作
- **Vite**: 建置工具
- **ESLint**: 代碼品質檢查

### 開發工具
- **TypeScript**: `tsc -b` 進行類型檢查
- **ESLint**: `npm run lint` 進行代碼品質檢查
- **Vite**: `npm run dev` 開發伺服器，`npm run build:deploy` 生產建置

## 🎨 代碼風格指南

### 檔案命名規範
- **React 組件**: PascalCase + `.tsx` 擴展名 (`AppWrapper.tsx`, `TableNode.tsx`)
- **工具函數/Hooks**: camelCase + `.ts` 擴展名 (`tableControl.ts`, `array.ts`)
- **頁面組件**: PascalCase + `.tsx` 擴展名 (`App.tsx`, `Page.tsx`)
- **樣式檔案**: camelCase + `.css` 擴展名 (`app.css`)

### Import 順序規範
```typescript
// 1. 外部庫 imports
import { Box, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

// 2. 內部模組 imports (相對路徑)
import { useResponsiveFontSize } from "../utils/theme";
import { useSqliteInitializer } from "../hooks/init";

// 3. 組件 imports (絕對路徑使用 @/ 別名)
import { AppWrapper } from "@/datahub/components/AppWrapper";
import { Appbar } from "../components/appbar/Appbar";

// 4. 類型 imports (使用 type 關鍵字)
import type { SQLiteClient } from "@/utils/SQLiteClient";
import type { TableColumnInfo } from "../data/read";
```

### 組件結構規範
```typescript
// 1. Imports
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import type { ComponentProps } from "./types";

// 2. 類型定義
interface Props {
  title: string;
  onAction?: () => void;
}

// 3. 常數定義
const DEFAULT_VALUE = "預設值";

// 4. 樣式定義 (如果需要)
const containerSx: BoxProps["sx"] = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

// 5. 主要組件
const ComponentName = ({ title, onAction }: Props) => {
  // Hooks 在最前面
  const [state, setState] = useState("");
  
  // 事件處理函數
  const handleClick = () => {
    onAction?.();
  };

  // 渲染
  return (
    <Box sx={containerSx}>
      <Typography variant="h4">{title}</Typography>
      {/* 其他 JSX */}
    </Box>
  );
};

// 6. 導出
export { ComponentName };
```

### 樣式規範
- **使用 Material-UI 的 sx prop**: 優先使用 `sx` prop 而非外部 CSS
- **響應式設計**: 使用 Material-UI 的斷點系統 (`theme.breakpoints.up()`)
- **主題系統**: 使用 `theme` 中定義的顏色和間距
- **一致的間距**: 使用 theme 中定義的 spacing 單位 (0.5rem 基準)

```typescript
// 良好的樣式實踐
<Box sx={{ 
  display: "flex", 
  gap: 3, 
  px: 2, 
  bgcolor: "primary.main",
  [theme.breakpoints.up("md")]: {
    px: 4,
  }
}}>
```

## 🔧 開發模式

### 狀態管理模式

#### Zustand Store 模式
```typescript
// 適用於全域狀態
interface StoreState {
  data: DataType | null;
  setData: (data: DataType) => void;
  resetData: () => void;
}

export const useStore = create<StoreState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  resetData: () => set({ data: null }),
}));
```

#### React Query 模式
```typescript
// 適用於伺服器狀態
const useData = (params: QueryParams) => {
  return useQuery({
    queryKey: ["dataKey", params],
    queryFn: () => fetchData(params),
    staleTime: 1 * 60 * 1000, // 1分鐘
    enabled: params !== null,
  });
};
```

### Custom Hooks 模式
```typescript
// 業務邏輯封裝
const useFeature = (params: FeatureParams) => {
  const [localState, setLocalState] = useState(initialState);
  const { data, isFetching } = useQuery(/* ... */);
  
  const processedData = useMemo(() => {
    // 資料處理邏輯
    return data ? processData(data) : null;
  }, [data]);

  return { processedData, isFetching, setLocalState };
};
```

### 錯誤處理模式
```typescript
// 使用 react-error-boundary
<ErrorBoundary fallbackRender={(props) => <AppError {...props} />}>
  {children}
</ErrorBoundary>

// 在資料獲取中使用 try-catch
const fetchData = async () => {
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    console.error("資料獲取失敗:", error);
    throw error;
  }
};
```

## 📊 資料庫操作規範

### SQLite 客戶端使用
```typescript
// 獲取客戶端實例
import { getClient } from "./client";

const performQuery = async () => {
  const client = getClient();
  const result = await client.exec(sql, params);
  return result;
};
```

### 查詢模式
```typescript
// 參數化查詢，防止 SQL 注入
const getTableData = async (tableName: string, limit: number) => {
  const sql = `SELECT * FROM $table LIMIT $limit`;
  return client.exec(sql, { $table: tableName, $limit: limit });
};
```

### 資料類型定義
```typescript
// 明確的資料庫相關類型
type SQLiteObjectType = "table" | "view" | "index" | "trigger";

interface TableColumnInfo {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: string | null;
  pk: number;
}
```

## 🎯 UI/UX 模式

### 響應式設計
```typescript
// 使用 Material-UI 斷點
const isLg = useMediaQuery(theme.breakpoints.up("lg"));
const isMd = useMediaQuery(theme.breakpoints.up("md"));

// 條件渲染
{isMd && <DesktopComponent />}
{!isMd && <MobileComponent />}
```

### 主題系統
```typescript
// 主題定義在 utils/theme.ts
const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: {
    fontFamily: `Comfortaa, "jf openhuninn"`,
  },
  colorSchemes: {
    light: { /* 淺色主題 */ },
    dark: { /* 深色主題 */ },
  },
});
```

### Loading 狀態處理
```typescript
const Component = () => {
  const { data, isFetching } = useQuery(/* ... */);
  
  if (isFetching) {
    return <CircularProgress />;
  }
  
  if (!data) {
    return <Typography>無資料</Typography>;
  }
  
  return <DataComponent data={data} />;
};
```

## ⚠️ 重要約定

### 1. 類型安全
- **所有函數參數和返回值必須有明確的類型定義**
- **使用 TypeScript 的嚴格模式**
- **避免使用 `any` 類型，優先使用 `unknown` 或具體類型**

### 2. 效能最佳化
- **使用 React.memo() 包裝純組件**
- **使用 useMemo() 和 useCallback() 最佳化重複計算**
- **React Query 的 staleTime 設定為 1 分鐘**

### 3. 國際化
- **所有顯示文字使用繁體中文**
- **錯誤訊息和日誌使用中文**
- **註釋和文檔使用中文**

### 4. 檔案組織
- **相關功能的組件放在同一個資料夾**
- **共用的工具函數放在 utils 資料夾**
- **複雜的業務邏輯封裝成 custom hooks**

### 5. 命名規範
- **組件名稱使用 PascalCase**
- **函數和變數使用 camelCase**
- **常數使用 UPPER_SNAKE_CASE**
- **檔案名稱要具有描述性**

## 🚀 開發流程

### 1. 新增功能
```bash
# 1. 確保類型檢查通過
npm run build:type

# 2. 確保代碼品質檢查通過
npm run lint

# 3. 本地開發測試
npm run dev
```

### 2. 代碼審查要點
- 類型安全性
- 效能最佳化
- 錯誤處理
- 代碼可讀性
- 符合現有模式

### 3. 測試策略
- 組件功能測試
- 資料庫操作測試
- 錯誤邊界測試
- 響應式設計測試

## 📝 範例代碼

### 完整組件範例
```typescript
import { Box, Typography, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getTableData } from "../data/read";
import type { TableData } from "../types";

interface Props {
  tableName: string;
  onDataLoad?: (data: TableData[]) => void;
}

const DataDisplay = ({ tableName, onDataLoad }: Props) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["tableData", tableName],
    queryFn: () => getTableData(tableName),
    staleTime: 60 * 1000,
    onSuccess: (data) => onDataLoad?.(data),
  });

  if (error) {
    return (
      <Box sx={{ p: 2, color: "error.main" }}>
        <Typography>載入資料時發生錯誤</Typography>
      </Box>
    );
  }

  if (isFetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {tableName} 資料
      </Typography>
      {data?.map((item, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          {/* 渲染資料項目 */}
        </Box>
      ))}
    </Box>
  );
};

export { DataDisplay };
```

---

**遵循這些指南將確保代碼的一致性、可維護性和高品質。當有疑問時，請參考現有代碼庫中的類似實現。**