import { create } from "zustand";

type UseDynamicSelectStore = {
  selectAll: boolean;
  checked: Set<string>;
  unchecked: Set<string>;

  toggleRow: (id: string) => void;
  toggleAll: () => void;
  reset: () => void; // 重置選擇狀態

  getSelectedIds: () => string[]; // 僅 selectAll=false
  getExcludedIds: () => string[]; // 僅 selectAll=true
};

export const createUseDynamicSelect = () => {
  const useStore = create<UseDynamicSelectStore>((set, get) => ({
    selectAll: false,
    checked: new Set(),
    unchecked: new Set(),

    toggleRow: (id) => {
      const { selectAll, checked, unchecked } = get();
      if (selectAll) {
        const newUnchecked = new Set(unchecked);
        if (newUnchecked.has(id)) newUnchecked.delete(id);
        else newUnchecked.add(id);
        set({ unchecked: newUnchecked });
      } else {
        const newChecked = new Set(checked);
        if (newChecked.has(id)) newChecked.delete(id);
        else newChecked.add(id);
        set({ checked: newChecked });
      }
    },
    toggleAll: () => {
      const { selectAll: wasSelectAll, unchecked } = get();

      let selectAll = true;
      // 如果本來就是全選，且真的沒取消任何勾選 → 取消全選
      if (wasSelectAll && unchecked.size === 0) {
        selectAll = false;
      }

      set({ selectAll, checked: new Set(), unchecked: new Set() });
    },
    reset: () => {
      set({ selectAll: false, checked: new Set(), unchecked: new Set() });
    },

    getSelectedIds: () => [...get().checked],
    getExcludedIds: () => [...get().unchecked],
  }));

  const useIsRowSelected = (id: string) =>
    useStore((state) => (state.selectAll ? !state.unchecked.has(id) : state.checked.has(id)));

  const useIsAllSelected = (totalRows: number) =>
    useStore((state) => {
      if (state.selectAll) return state.unchecked.size === 0;
      else return totalRows <= 0 ? false : state.checked.size === totalRows;
    });

  const useIsIndeterminate = (totalRows: number) =>
    useStore((state) => {
      if (state.selectAll) return state.unchecked.size > 0 && state.unchecked.size < totalRows;
      else return state.checked.size > 0 && state.checked.size < totalRows;
    });

  // -------------------------------------------------------------------
  // public
  // -------------------------------------------------------------------

  const useRowSelection = (id: string) => {
    const checked = useIsRowSelected(id);
    const toggle = () => useStore.getState().toggleRow(id);

    return { checked, toggle };
  };

  const useAllSelections = (totalRows: number) => {
    const checked = useIsAllSelected(totalRows);
    const indeterminate = useIsIndeterminate(totalRows);
    const toggle = () => useStore.getState().toggleAll();

    return { checked, indeterminate, toggle };
  };

  const useSelectedCount = (totalRows: number) =>
    useStore((state) => {
      if (!state.selectAll) return Math.min(state.checked.size, totalRows);
      const count = totalRows - state.unchecked.size;
      return count < 0 ? 0 : count;
    });

  const useSubmit = () => {
    return () => {
      const { selectAll, getSelectedIds, getExcludedIds } = useStore.getState();
      if (selectAll) return { selectAll: true, excludeIds: getExcludedIds() };
      else return { selectAll: false, includeIds: getSelectedIds() };
    };
  };

  const useReset = () => {
    return useStore.getState().reset;
  };

  return { useRowSelection, useAllSelections, useSelectedCount, useSubmit, useReset };
};
