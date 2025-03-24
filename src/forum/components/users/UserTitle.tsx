import { useUser } from "@/forum/hooks/user";

const UserTitle = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const { data: user } = useUser(urlParams.get("user"));

  // 載入完成後顯示
  if (user) {
    return <title>{`論壇樣板 | ${user.name}`}</title>;
  }

  // 以使用者名稱查詢，則載入時可以先顯示，但載入完成後會被取代
  if (urlParams.get("user") && !user) {
    return <title>{`論壇樣板 | ${urlParams.get("user")}`}</title>;
  }

  return null;
};

export { UserTitle };
