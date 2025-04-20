import { useUrl } from "@/hooks/url";
import { useCallback, useMemo } from "react";
import { z } from "zod";

const orderBySchema = z.enum(["time", "title", "progress"]);
const orderSchema = z.enum(["asc", "desc"]);

export const useOrderState = () => {
  const { searchParams, updateSearchParams } = useUrl();

  const orderState = useMemo(() => {
    const { data: orderBy } = orderBySchema.safeParse(searchParams.get("orderBy"));
    const { data: order } = orderSchema.safeParse(searchParams.get("order"));
    return { orderBy: orderBy ?? "time", order: order ?? "asc" };
  }, [searchParams]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (orderBySchema.safeParse(value).success) updateSearchParams({ orderBy: value }, { skipTransition: true });
    },
    [updateSearchParams]
  );

  const createChangeOrderHandler = useCallback(
    (order: string) => () => {
      if (orderState.order === order) return;
      updateSearchParams({ order }, { skipTransition: true });
    },
    [orderState, updateSearchParams]
  );

  return { orderState, handleChange, createChangeOrderHandler };
};

export const filterSchema = z.enum(["all", "desktop", "rwd"]);

export const useFilterState = () => {
  const { searchParams, updateSearchParams } = useUrl();

  const filter = useMemo(() => {
    const { data: filter } = filterSchema.safeParse(searchParams.get("filter"));
    return filter ?? "all";
  }, [searchParams]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (filterSchema.safeParse(value).success) updateSearchParams({ filter: value }, { skipTransition: true });
    },
    [updateSearchParams]
  );

  return { filter, handleChange };
};
