import type { FetchTagsResult } from "@/forum/data/post";
import { useTags } from "@/forum/hooks/post";
import { useSearch } from "@/hooks/fuse";
import { Badge, Box, Button, IconButton, InputAdornment } from "@mui/material";
import { Chip, CircularProgress, Divider, Popover, Stack, TextField, Typography } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import type { PopoverProps } from "@mui/material";
import { memo, useMemo, useState } from "react";

type SelectContentBlockProps = {
  title: string;
  hint: string;
  tags: FetchTagsResult;
  onSelect: (tag: string) => void;
};

const CustomBadge = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      borderRadius: 99,
      bgcolor: "primary.main",
      width: "0.9rem",
      aspectRatio: "1/1",
      display: "grid",
      placeItems: "center",
    }}
  >
    <Typography variant="caption" sx={{ position: "absolute", color: "background.paper", fontSize: "0.6rem" }}>
      {children}
    </Typography>
  </Box>
);

const SelectContentBlock = memo(({ title, hint, tags, onSelect }: SelectContentBlockProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, justifyContent: "space-between" }}>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {`${title}:`}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Badge badgeContent={10} color="primary" variant="dot" overlap="circular">
            <Box sx={{ width: 0, height: 0 }} />
          </Badge>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`為${hint}`}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
        {tags.map(({ name, count }) => (
          <Chip
            size="small"
            key={name}
            label={name}
            clickable
            onClick={() => onSelect(name)}
            deleteIcon={<CustomBadge>{count}</CustomBadge>}
            onDelete={count > 1 ? () => onSelect(name) : undefined}
          />
        ))}
      </Box>
    </Box>
  );
});

const LoadingDisplay = () => (
  <Box sx={{ height: 300, display: "grid", placeItems: "center" }}>
    <CircularProgress size="1.5rem" sx={{ color: "divider" }} />
  </Box>
);

type SelectContentProps = {
  type: "add" | "query";
  onConfirm: (value: string | null) => void;
  onClose: () => void;
};

const TopicSelectContent = ({ type, onConfirm, onClose }: SelectContentProps) => {
  const { data, isFetching } = useTags();
  const isLoading = isFetching || !data;

  const [value, setValue] = useState<string>("");
  const search = useSearch(data?.map((item) => ({ ...item, count: item.count.toString() })) ?? [], ["name"]);

  const contents = useMemo(() => {
    if (!data) return [];

    let filteredData = data;
    if (value.trim()) {
      filteredData = search(value).map((result) => ({ ...result.item, count: Number(result.item.count) }));
    }

    const self: Omit<SelectContentBlockProps, "onSelect"> = {
      title: "最近使用的標籤",
      hint: "你使用過的次數",
      tags: filteredData.slice(0, 6),
    };

    const others: Omit<SelectContentBlockProps, "onSelect">[] = [
      { title: "A ~ Z", hint: "總使用次數", tags: filteredData.filter((tag) => /^[a-zA-Z]/.test(tag.name)) },
      { title: "0 ~ 9", hint: "總使用次數", tags: filteredData.filter((tag) => /^[0-9]/.test(tag.name)) },
      { title: "中文", hint: "總使用次數", tags: filteredData.filter((tag) => !/^[a-zA-Z0-9]/.test(tag.name)) },
    ];

    if (type === "add") return [self, ...others];
    return others;
  }, [data, type, search, value]);

  const disableConfirm =
    isLoading || value.trim() === "" || (type === "query" && !data.map(({ name }) => name).includes(value.trim()));

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disableConfirm) return;
    if (event.key === "Enter") onConfirm(value);
  };

  return (
    <Stack onKeyDown={handleKeyDown}>
      <Box sx={{ p: 2, pt: 1 }}>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
          size="small"
          label="選擇主題"
          variant="standard"
          fullWidth
          autoFocus
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setValue("")} disabled={!value}>
                    <ClearRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Divider />

      {isLoading ? (
        <LoadingDisplay />
      ) : (
        <Box sx={{ maxHeight: 300, overflowY: "auto", overflowX: "hidden" }}>
          <Stack sx={{ gap: 2, p: 2 }}>
            {type === "query" && <Chip label={"全部主題"} clickable onClick={() => onConfirm(null)} />}

            {contents.map(
              (content, index) =>
                content.tags.length > 0 && (
                  <SelectContentBlock
                    key={index}
                    title={content.title}
                    hint={content.hint}
                    tags={content.tags}
                    onSelect={onConfirm}
                  />
                )
            )}
          </Stack>
        </Box>
      )}

      <Divider />

      <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 1, justifyContent: "flex-end" }}>
        <Button size="small" variant="outlined" disabled={isLoading} onClick={onClose}>
          取消
        </Button>
        <Button size="small" variant="contained" disabled={disableConfirm} onClick={() => onConfirm(value)}>
          {type === "add" ? "新增" : "前往"}
        </Button>
      </Box>
    </Stack>
  );
};

// 多格一層以善用 Popover 的 keepMounted={false}，實現 useTags 的 lazy loading
const TopicPicker = ({ type, onConfirm, onClose, ...props }: SelectContentProps & PopoverProps) => {
  return (
    <Popover
      {...props}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      elevation={6}
      slotProps={{ paper: { sx: { borderRadius: 2, width: 320 } } }}
      onClose={onClose}
    >
      <TopicSelectContent type={type} onConfirm={onConfirm} onClose={onClose} />
    </Popover>
  );
};

export { TopicPicker };
