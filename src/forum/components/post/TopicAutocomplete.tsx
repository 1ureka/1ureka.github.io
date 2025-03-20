import { useTags } from "@/forum/hooks/post";
import { Autocomplete, Box, CircularProgress, Menu, TextField } from "@mui/material";
import type { MenuProps } from "@mui/material";

type InputProps =
  | {
      type: "query";
    }
  | {
      type: "add";
      onAdd: (value: string) => void;
    };

const createAddHandler =
  (onAdd: (value: string) => void) => (_: React.SyntheticEvent<Element, Event>, value: string | null) => {
    if (value === null || !value.trim()) return console.error("請輸入標籤名稱");
    if (value === "顯示全部") return console.error("該標籤名稱無效");
    onAdd(value.trim());
  };

const handleQuery = (_: React.SyntheticEvent<Element, Event>, value: string | null) => {
  if (value === null || !value.trim()) return;
  if (value === "顯示全部") return (window.location.href = "?");
  window.location.href = `?topic=${value.trim()}`;
};

const Input = (props: InputProps) => {
  const { data, isFetching } = useTags();
  const { type } = props;

  const tags = Array.from(data ?? []);
  const options = type === "query" ? ["顯示全部", ...tags] : tags;
  const value = type === "query" ? new URLSearchParams(window.location.search).get("topic") ?? "" : "";
  const handleChange = type === "query" ? handleQuery : createAddHandler(props.onAdd);

  return (
    <>
      <Autocomplete
        freeSolo={type === "add"}
        disabled={isFetching}
        options={options}
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} autoFocus label="主題" variant="standard" size="small" sx={{ minWidth: 150 }} />
        )}
      />

      {isFetching && (
        <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <CircularProgress size="1.5rem" />
        </Box>
      )}
    </>
  );
};

const TopicAutocomplete = (props: MenuProps & InputProps) => {
  const { type, ...remain } = props;
  const menuProps = type === "add" ? (({ onAdd, ...rest }) => rest)(remain as any) : remain;

  return (
    <Menu
      slotProps={{
        paper: { sx: { borderRadius: 3, scale: "0.9" } },
        list: {
          disablePadding: true,
          dense: true,
          component: "div",
          sx: { p: 1, pl: 1.5, pt: 0 },
        },
      }}
      {...menuProps}
    >
      {type === "query" ? <Input type="query" /> : <Input type="add" onAdd={props.onAdd} />}
    </Menu>
  );
};

export { TopicAutocomplete };
