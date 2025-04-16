import { useSession } from "@/forum/hooks/session";
import { useUrl } from "@/forum/hooks/url";
import { FormControlLabel, Switch } from "@mui/material";

const FilterMenu = () => {
  const { authenticated } = useSession();
  const { searchParams, updateSearchParams } = useUrl();
  const followPrior = searchParams.get("followPrior") === "true";

  const handleSwitchFollowPrior = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    updateSearchParams({ followPrior: checked.toString() });
  };

  const checked = authenticated && followPrior;

  return (
    <FormControlLabel
      disabled={!authenticated}
      control={<Switch size="small" checked={checked} onChange={handleSwitchFollowPrior} />}
      sx={{ m: 0, "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
      label={authenticated ? "優先顯示追蹤者" : "登入後可優先顯示追蹤對象"}
    />
  );
};

export { FilterMenu };
