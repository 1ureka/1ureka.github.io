import { useUser } from "@/forum/hooks/user";

const UserTitle = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const { data: user, isFetching } = useUser(urlParams.get("user"));

  if (!isFetching && user === null) {
    window.location.replace("/404");
    return null;
  }

  // 以使用者名稱查詢，則載入時可以先顯示，但載入完成後會被取代
  if (urlParams.get("user") && isFetching) {
    return <title>{`論壇樣板 | ${urlParams.get("user")}`}</title>;
  }

  // 載入完成後顯示
  if (user) {
    return <title>{`論壇樣板 | ${user.name}`}</title>;
  }

  return null;
};

export { UserTitle };
