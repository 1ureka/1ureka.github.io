// TODO: 用 zustand 管理狀態，維持 store 只讀的寫法，由 action.ts 直接使用並更新他，讓 UI 只直接引用 action 的函數作為 event handler，並且直接從 store 讀取狀態，達到 UI = f(store)，讓 UI 不需要關心狀態的更新邏輯，達到更好的分離和可維護性。
