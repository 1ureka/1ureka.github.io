import { memo, useMemo, useState } from "react";
import { useSearch, type Highlight } from "@/hooks/fuse";

import { Badge, Box, Button, IconButton, InputAdornment } from "@mui/material";
import { Chip, Divider, Stack, TextField, Typography } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const tags = [
  { name: "React", count: 7 },
  { name: "Web 開發", count: 4 },
  { name: "Tailwind", count: 3 },
  { name: "前端工具", count: 3 },
  { name: "效能優化", count: 3 },
  { name: "JavaScript", count: 2 },
  { name: "SSR", count: 2 },
  { name: "Webpack", count: 2 },
  { name: "shadcn/ui", count: 2 },
  { name: "前端開發", count: 2 },
  { name: "效能", count: 2 },
  { name: "效能提升", count: 2 },
  { name: "身份驗證", count: 2 },
  { name: "API 處理", count: 1 },
  { name: "Bun", count: 1 },
  { name: "CDN", count: 1 },
  { name: "CSS", count: 1 },
  { name: "JWT", count: 1 },
  { name: "MUI", count: 1 },
  { name: "Next.js", count: 1 },
  { name: "Node.js", count: 1 },
  { name: "React Query", count: 1 },
  { name: "SWR", count: 1 },
  { name: "Server Components", count: 1 },
  { name: "Session", count: 1 },
  { name: "Supabase", count: 1 },
  { name: "Turbopack", count: 1 },
  { name: "UI 元件", count: 1 },
  { name: "Vite", count: 1 },
  { name: "WASM", count: 1 },
  { name: "Zustand", count: 1 },
  { name: "並發模式", count: 1 },
  { name: "前端最佳化", count: 1 },
  { name: "前端框架", count: 1 },
  { name: "前端設計", count: 1 },
  { name: "前端趨勢", count: 1 },
  { name: "安全性", count: 1 },
  { name: "後端", count: 1 },
  { name: "後端開發", count: 1 },
  { name: "新技術", count: 1 },
  { name: "狀態管理", count: 1 },
  { name: "資料庫", count: 1 },
];

const userTags = [
  { name: "React", count: 1 },
  { name: "Tailwind", count: 1 },
  { name: "Web 開發", count: 1 },
  { name: "shadcn/ui", count: 1 },
];

type SelectContentBlockProps = {
  title: string;
  hint: string;
  tags: typeof tags;
  hightlight: Record<string, Highlight[]>;
  onSelect: (tag: string) => void;
  showAfter?: number;
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
      mr: 0.5,
    }}
  >
    <Typography variant="caption" sx={{ position: "absolute", color: "background.paper", fontSize: "0.6rem" }}>
      {children}
    </Typography>
  </Box>
);

const HightLights = ({ highlights }: { highlights: Highlight[] }) => {
  return (
    <>
      {highlights.map(({ text, highlight }, index) => (
        <span
          key={index}
          style={{
            color: highlight
              ? "color-mix(in srgb, var(--mui-palette-primary-main) 80%, var(--mui-palette-text-primary) 20%)"
              : undefined,
          }}
        >
          {text}
        </span>
      ))}
    </>
  );
};

const SelectContentBlock = memo(
  ({ title, hint, tags, hightlight, onSelect, showAfter = 1 }: SelectContentBlockProps) => {
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
              label={hightlight[name] ? <HightLights highlights={hightlight[name]} /> : name}
              clickable
              onClick={() => onSelect(name)}
              deleteIcon={<CustomBadge>{count}</CustomBadge>}
              onDelete={count > showAfter ? () => onSelect(name) : undefined}
            />
          ))}
        </Box>
      </Box>
    );
  }
);

type SelectContentProps = {
  type: "add" | "query";
  onConfirm: (value: string | null) => void;
};

const TopicSelectContent = ({ type, onConfirm }: SelectContentProps) => {
  const [value, setValue] = useState<string>("");
  const searchTags = useSearch(tags.map((item) => ({ ...item, count: item.count.toString() })) ?? [], ["name"]);
  const searchUserTags = useSearch(userTags.map((item) => ({ ...item, count: item.count.toString() })) ?? [], ["name"]);

  const contents = useMemo(() => {
    let allTags = tags;
    let usedTags = userTags ?? [];
    const allTagsHightlight: Record<string, Highlight[]> = {};
    const usedTagsHightlight: Record<string, Highlight[]> = {};
    if (value.trim()) {
      allTags = searchTags(value).map((result) => {
        allTagsHightlight[result.item.name] = result.highlights.name;
        return { ...result.item, count: Number(result.item.count) };
      });
      usedTags = searchUserTags(value).map((result) => {
        usedTagsHightlight[result.item.name] = result.highlights.name;
        return { ...result.item, count: Number(result.item.count) };
      });
    }

    const self: Omit<SelectContentBlockProps, "onSelect"> = {
      title: "最近使用",
      hint: "你使用次數",
      tags: usedTags,
      hightlight: usedTagsHightlight,
      showAfter: 0,
    };

    const others: Omit<SelectContentBlockProps, "onSelect">[] = [
      {
        title: "A ~ Z",
        hint: "總使用次數",
        tags: allTags.filter((tag) => /^[a-zA-Z]/.test(tag.name)),
        hightlight: allTagsHightlight,
      },
      {
        title: "0 ~ 9",
        hint: "總使用次數",
        tags: allTags.filter((tag) => /^[0-9]/.test(tag.name)),
        hightlight: allTagsHightlight,
      },
      {
        title: "中文",
        hint: "總使用次數",
        tags: allTags.filter((tag) => !/^[a-zA-Z0-9]/.test(tag.name)),
        hightlight: allTagsHightlight,
      },
    ];

    if (type === "add") return [self, ...others];
    return others;
  }, [type, searchTags, searchUserTags, value]);

  const disableConfirm =
    value.trim() === "" || (type === "query" && !tags.map(({ name }) => name).includes(value.trim()));

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disableConfirm) return;
    if (event.key === "Enter") onConfirm(value);
  };

  return (
    <Stack onKeyDown={handleKeyDown}>
      <Box sx={{ p: 1 }}>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          placeholder={type === "add" ? "查詢或新增標籤" : "查詢標籤"}
          variant="standard"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
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

      <Box sx={{ height: 200, overflowY: "auto", overflowX: "hidden" }}>
        <Stack sx={{ gap: 2, p: 1 }}>
          {type === "query" && <Chip label={"全部主題"} clickable onClick={() => onConfirm(null)} />}

          {contents.map(
            (content, index) =>
              content.tags.length > 0 && (
                <SelectContentBlock key={index} {...content} onSelect={(value) => setValue(value)} />
              )
          )}
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", alignItems: "center", p: 1, gap: 1, justifyContent: "flex-end" }}>
        <Button size="small" variant="outlined" onClick={() => setValue("")}>
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
const PickerDemo = () => {
  const type = "add" as SelectContentProps["type"];

  const handleConfirm = (value: string | null) => {
    if (value && type === "add") return console.log(`你新增了標籤: ${value}`);
    if (value && type === "query") return console.log(`你選擇了標籤: ${value}`);
    if (value === null && type === "query") return console.log(`你選擇了全部主題`);
  };

  return <TopicSelectContent type={type} onConfirm={handleConfirm} />;
};

export { PickerDemo };
