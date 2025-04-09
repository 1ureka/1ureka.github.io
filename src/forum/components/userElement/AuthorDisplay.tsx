import { Box, Chip, Skeleton, Typography } from "@mui/material";
import type { FetchUserByNameResult } from "@/forum/data/user";
import { SmallFollowButton } from "./FollowButton";
import { routes } from "@/routes";
import { ellipsisSx } from "@/utils/commonSx";
import { UserAvatar, UserAvatarSkeleton } from "./UserAvatar";

const AuthorLoadingDisplay = () => {
  return (
    <>
      <UserAvatarSkeleton />
      <Box>
        <Skeleton variant="rounded" animation="wave">
          <Typography
            variant="subtitle1"
            sx={{
              textWrap: "nowrap",
              color: "text.primary",
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            作者名稱
          </Typography>
        </Skeleton>
        <Skeleton variant="text" animation="wave">
          <Typography variant="body2" component="p" sx={{ color: "text.secondary" }}>
            作者描述載入中...
          </Typography>
        </Skeleton>
      </Box>
      <Chip variant="outlined" label="追蹤" clickable disabled />
    </>
  );
};

const AuthorDisplay = ({ id, name, description, ellipsis }: { ellipsis?: boolean } & FetchUserByNameResult) => {
  return (
    <>
      <UserAvatar name={name} />
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            textWrap: "nowrap",
            color: "text.primary",
            cursor: "pointer",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
          component="a"
          href={`${routes.forum_users}?user=${name}`}
        >
          {name}
        </Typography>
        <Typography variant="body2" component="p" sx={{ color: "text.secondary", ...(ellipsis && ellipsisSx) }}>
          {description || "這個使用者很懶，什麼都沒寫"}
        </Typography>
      </Box>
      <SmallFollowButton targetId={id} />
    </>
  );
};

export { AuthorLoadingDisplay, AuthorDisplay };
