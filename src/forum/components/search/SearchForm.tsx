import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Autocomplete } from "@mui/material";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { zhTW } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";

import { NumberInput } from "@/forum/components/search/NumberInput";
import { useUrl } from "@/forum/hooks/url";
import { useUsers } from "@/forum/hooks/user";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const formSchema = z.object({
  all: z.string().min(1, "請輸入搜尋關鍵字"),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  likeCounts: z.number().int().nonnegative("請輸入正整數"),
  viewCounts: z.number().int().nonnegative("請輸入正整數"),
  startDate: z
    .any()
    .nullable()
    .refine((val) => val === null || (dayjs.isDayjs(val) && val.isValid()), "必須是有效的日期"),
  endDate: z
    .any()
    .nullable()
    .refine((val) => val === null || (dayjs.isDayjs(val) && val.isValid()), "必須是有效的日期"),
});

export type FormField = z.infer<typeof formSchema>;

const isError = (value: unknown[]) => value.length > 0 && value[0] !== null && value[0] !== undefined;
const getErrorMessage = (value: ({ message: string } | undefined)[]) =>
  isError(value)
    ? value
        .filter((e) => e !== undefined)
        .map(({ message }) => message)
        .join(", ")
    : null;

const SearchForm = () => {
  const { searchParams, updateSearchParams } = useUrl();

  const getDate = (type: "startDate" | "endDate") => {
    const date = searchParams.get(type);
    const dateObj = date ? dayjs(date) : null;
    return dateObj && dateObj.isValid() ? dateObj : null;
  };

  const defaultValues: FormField = {
    all: searchParams.get("all") || "",
    title: searchParams.get("title") || "",
    content: searchParams.get("content") || "",
    author: searchParams.get("author") || "all",
    likeCounts: Number(searchParams.get("likeCounts")) || 0,
    viewCounts: Number(searchParams.get("viewCounts")) || 0,
    startDate: getDate("startDate"),
    endDate: getDate("endDate"),
  };

  const form = useForm({
    defaultValues,
    validators: { onChange: formSchema },
    onSubmit: ({ value }) => {
      updateSearchParams(
        Object.fromEntries(Object.entries(value).map(([key, value]) => [key, value === null ? null : value.toString()]))
      );
    },
    onSubmitInvalid: () => {
      console.error("請檢查表單是否填寫正確");
    },
  });

  const { data, isFetching } = useUsers({ limit: 150, orderBy: "name", order: "asc" });

  return (
    <Accordion
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      onReset={(e) => {
        e.preventDefault();
        form.reset();
      }}
      defaultExpanded
      disableGutters
      square
      sx={{
        py: 1,
        boxShadow: 0,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        "&::before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
        <FilterAltRoundedIcon sx={{ mr: 1, color: "text.secondary" }} />
        <Typography component="span">篩選條件</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ display: "flex", gap: 3.5, flexDirection: { xs: "column", sm: "row" } }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" component="h6" sx={{ color: "text.secondary" }}>
              透過關鍵字搜尋
            </Typography>

            <Stack sx={{ gap: 0.5, mt: 2 }}>
              <form.Field
                name="all"
                children={(field) => (
                  <TextField
                    required
                    name={field.name}
                    label="所有"
                    error={isError(field.state.meta.errors)}
                    helperText={getErrorMessage(field.state.meta.errors) || "符合文章標題、內容或作者的關鍵字"}
                    variant="filled"
                    fullWidth
                    size="small"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                )}
              />
              <form.Field
                name="title"
                children={(field) => (
                  <TextField
                    name={field.name}
                    label="標題"
                    error={isError(field.state.meta.errors)}
                    helperText={getErrorMessage(field.state.meta.errors) || "符合文章標題的關鍵字"}
                    variant="filled"
                    fullWidth
                    size="small"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                )}
              />
              <form.Field
                name="content"
                children={(field) => (
                  <TextField
                    name={field.name}
                    label="內容"
                    error={isError(field.state.meta.errors)}
                    helperText={getErrorMessage(field.state.meta.errors) || "符合文章內容的關鍵字"}
                    variant="filled"
                    fullWidth
                    size="small"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                )}
              />
            </Stack>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" component="h6" sx={{ color: "text.secondary" }}>
              然後依以下條件縮小搜尋範圍...
            </Typography>

            <Stack sx={{ gap: 0.5, mt: 2 }}>
              <form.Field
                name="author"
                children={(field) => (
                  <Autocomplete
                    value={field.state.value === "all" ? null : field.state.value}
                    onChange={(_, newValue) => field.handleChange(newValue === null ? "all" : newValue)}
                    options={data?.pages[0].users?.map((author) => author.name) || []}
                    loading={isFetching}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name={field.name}
                        label={isFetching ? "載入中..." : "文章作者"}
                        variant="filled"
                        fullWidth
                        size="small"
                      />
                    )}
                    fullWidth
                    disabled={isFetching}
                    noOptionsText="無此作者"
                  />
                )}
              />

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <form.Field
                  name="likeCounts"
                  children={(field) => (
                    <NumberInput
                      name={field.name}
                      label="收獲讚數"
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      error={field.state.meta.errors.length > 0}
                      sx={{ flex: 1 }}
                    />
                  )}
                />
                <form.Field
                  name="viewCounts"
                  children={(field) => (
                    <NumberInput
                      name={field.name}
                      label="瀏覽次數"
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      error={field.state.meta.errors.length > 0}
                      sx={{ flex: 1 }}
                    />
                  )}
                />
              </Box>

              <Stack sx={{ mt: 2, gap: 1 }}>
                <Typography variant="subtitle2" component="p" sx={{ color: "text.secondary" }}>
                  發布日期
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="zh-tw"
                    localeText={zhTW.components.MuiLocalizationProvider.defaultProps.localeText}
                  >
                    <form.Subscribe
                      selector={(state) => [state.values.startDate, state.values.endDate]}
                      children={([startDate, endDate]) => {
                        return (
                          <>
                            <form.Field
                              name="startDate"
                              children={(field) => (
                                <DatePicker
                                  name={field.name}
                                  label="從..."
                                  disableFuture
                                  sx={{ width: 1 }}
                                  value={field.state.value}
                                  onChange={(newValue) => field.handleChange(newValue)}
                                  maxDate={endDate || undefined}
                                />
                              )}
                            />
                            <form.Field
                              name="endDate"
                              children={(field) => (
                                <DatePicker
                                  name={field.name}
                                  label="至..."
                                  disableFuture
                                  sx={{ width: 1 }}
                                  value={field.state.value}
                                  onChange={(newValue) => field.handleChange(newValue)}
                                  minDate={startDate || undefined}
                                />
                              )}
                            />
                          </>
                        );
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </AccordionDetails>

      <AccordionActions sx={{ mx: 2 }}>
        <Button
          size="small"
          onClick={() =>
            form.reset(
              {
                all: "",
                title: "",
                content: "",
                author: "all",
                likeCounts: 0,
                viewCounts: 0,
                startDate: null,
                endDate: null,
              },
              { keepDefaultValues: true }
            )
          }
        >
          清空所有條件
        </Button>
        <Button size="small" type="reset">
          重置至上次搜尋條件
        </Button>
        <Button size="small" type="submit" variant="outlined" color="primary">
          搜尋
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export { SearchForm };
