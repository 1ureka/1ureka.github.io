import { useUrl } from "@/hooks/url";
import { useObjects } from "./read";
import { useMemo } from "react";
import { createUseDynamicSelect } from "@/hooks/select";

const {
  useRowSelection: useTableRowSelect,
  useAllSelections: useTableAllSelect,
  useSelectedCount: useTableSelectCount,
  useReset,
} = createUseDynamicSelect();

const useCurrentTable = () => {
  const { data: options, isFetching } = useObjects({ types: ["table", "view"] });
  const { searchParams } = useUrl();

  const selectedOption = useMemo(() => {
    if (!options) return null;

    const selectedName = searchParams.get("table");
    const selectedOption = options.find((option) => option.name === selectedName) ?? options[0];

    return selectedOption;
  }, [options, searchParams]);

  return { options, selectedOption, isFetching };
};

const useTablePicker = () => {
  const { updateSearchParams } = useUrl();
  const { options, selectedOption, isFetching } = useCurrentTable();
  const resetRowSelection = useReset();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!options) return;
    const { name } = options.find((option) => option.name === e.target.value) ?? options[0];
    resetRowSelection();
    updateSearchParams({ table: name, hiddenColumns: null, orderBy: null, order: null, page: null });
  };

  return { options, selectedOption, handleChange, isFetching };
};

export { useTablePicker, useCurrentTable, useTableRowSelect, useTableAllSelect, useTableSelectCount };
