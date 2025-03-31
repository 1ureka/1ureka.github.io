import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPosts, type SearchPostsParams } from "../data/postSearch";

const staleTime = 1 * 60 * 1000;

const useSearchPosts = (searchParams: SearchPostsParams = {}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["infinitePosts", ...Object.values(searchParams)],
    queryFn: ({ pageParam: page }) => searchPosts({ ...searchParams, page }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime,
  });

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-area");
    if (!scrollContainer) return;

    const scrollHandler = () => {
      const scrollHeight = scrollContainer.scrollHeight;
      const scrollTop = scrollContainer.scrollTop;
      const clientHeight = scrollContainer.clientHeight;
      const margin = 350;

      if (scrollTop + clientHeight >= scrollHeight - margin && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    scrollContainer.addEventListener("scroll", scrollHandler);
    return () => scrollContainer.removeEventListener("scroll", scrollHandler);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage };
};

export { useSearchPosts };
