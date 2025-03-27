import { Box, Stack, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { useUrl } from "@/forum/hooks/url";
import type { FetchPostsParams } from "@/forum/data/post";

type OrderBy = NonNullable<FetchPostsParams["orderBy"]>;
const orders: OrderBy[] = ["title", "createdAt", "updatedAt", "commentCount", "viewCount", "likeCount"];
const ordersTC = ["標題", "建立時間", "更新時間", "回覆數", "瀏覽數", "讚數"];

const OrderTabs = () => {
  const { searchParams, updateSearchParams } = useUrl();

  // 從 URL 獲取排序欄位，如果不存在則使用默認值
  const orderBy = searchParams.get("orderBy") || orders[0];
  const orderDesc = searchParams.get("orderDesc") === "true";

  // 根據 orderBy 找到對應的索引
  let orderId = orders.findIndex((field) => field === orderBy);
  if (orderId === -1) orderId = 1;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    updateSearchParams({
      orderBy: orders[newValue],
      orderDesc: orderDesc.toString(),
    });
  };

  const createHandleTabClick = (index: number) => () => {
    if (orderId === index) {
      updateSearchParams({
        orderBy: orders[index],
        orderDesc: (!orderDesc).toString(),
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "normal", md: "center" },
        gap: { xs: 0, md: 1.5 },
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: { xs: 1, md: 0 }, pb: 0 }}>
        <SortRoundedIcon sx={{ color: "inherit" }} />
        <Typography variant="subtitle1" component="h2" sx={{ lineHeight: 1 }}>
          排序依據
        </Typography>
      </Box>

      <Tabs
        value={orderId}
        onChange={handleTabChange}
        variant="scrollable"
        allowScrollButtonsMobile
        sx={{ "& button:hover": { bgcolor: "action.hover" } }}
      >
        {ordersTC.map((orderTC, index) => (
          <Tab
            key={index}
            onClick={createHandleTabClick(index)}
            label={
              <Tooltip title="再次點擊可以切換升冪或降冪排序" arrow placement="top">
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography variant="subtitle1" component="span">
                    {orderTC}
                  </Typography>
                  {orderId === index && (
                    <ArrowUpwardRoundedIcon
                      fontSize="small"
                      sx={{
                        transform: orderDesc ? "rotate(180deg)" : "none",
                        transition: "all 0.2s ease",
                      }}
                    />
                  )}
                </Stack>
              </Tooltip>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};

export { OrderTabs };
