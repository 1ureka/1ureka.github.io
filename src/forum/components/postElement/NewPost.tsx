import { Box, Button, Chip, Divider, Skeleton } from "@mui/material";
import { IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { BoxM } from "@/components/Motion";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useState } from "react";
import { useSession } from "@/forum/hooks/session";
import { TopicPicker } from "./shared/TopicPicker";
import { EmojiMenu } from "./shared/EmojiMenu";

import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { useCreatePost, useUpdatePost } from "@/forum/hooks/post";
import { getFormIsError } from "@/forum/utils/form";

import { toEntries } from "@/utils/typedBuiltins";
import { uniqueByField } from "@/utils/array";
import { formatFileSize } from "@/utils/formatters";

const formElementsSchema = {
  title: z.string().trim().min(1, "標題不能為空").max(100, "標題最多 100 個字元"),
  content: z.string().trim().min(1, "內容不能為空").max(5000, "內容最多 5000 個字元"),
  tags: z
    .array(z.string().trim().min(1, "標籤不能為空"))
    .min(1, "至少選擇一個標籤")
    .max(8, "最多選擇 8 個標籤")
    .refine((tags) => new Set(tags).size === tags.length, {
      message: "標籤不能重複",
    }),
  photos: z
    .array(z.instanceof(File))
    .max(10, "最多上傳 10 張圖片")
    .refine((files) => files.every((file) => file.type.startsWith("image/")), {
      message: "附圖僅允許上傳圖片檔案，其他類型檔案請用附件功能",
    })
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "每個附件不得超過 5MB",
    })
    .refine(
      (files) => {
        const fileNames = files.map((file) => file.name);
        return new Set(fileNames).size === fileNames.length;
      },
      { message: "不允許上傳重複的圖片檔案" }
    ),
  attachments: z
    .array(z.instanceof(File))
    .max(10, "最多上傳 10 個附件")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "每個附件不得超過 5MB",
    })
    .refine(
      (files) => {
        const fileNames = files.map((file) => file.name);
        return new Set(fileNames).size === fileNames.length;
      },
      { message: "不允許上傳重複的附件檔案" }
    ),
};

const formSchema = z.object(formElementsSchema);

const defaultValues: z.infer<typeof formSchema> = {
  title: "",
  content: "",
  tags: [],
  photos: [],
  attachments: [],
};

type NewPostProps =
  | {
      mode?: "create";
      initialValues?: Partial<typeof defaultValues>;
      postId?: never;
    }
  | {
      mode: "edit";
      initialValues: Partial<typeof defaultValues>;
      postId: number;
    };

const NewPost = ({ mode = "create", initialValues = {}, postId }: NewPostProps) => {
  const { mutateAsync: createPost, isPending: isPendingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isPendingUpdate } = useUpdatePost();
  const isPending = isPendingCreate || isPendingUpdate;
  const { user, authenticated, loading } = useSession();

  const form = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      if (isPending) return;

      const payload = {
        ...value,
        photos: value.photos.map((file) => ({ name: file.name, size: file.size, url: "" })),
        attachments: value.attachments.map((file) => ({ name: file.name, size: file.size, url: "" })),
      };

      if (mode === "edit") {
        if (!postId) return console.error("編輯模式需要提供 postId");
        const result = await updatePost({ ...payload, id: postId });
        if (result === null) {
          window.location.reload();
          return;
        }
        if (result.error) console.error(`貼文更新失敗：${result.error}`);
      }

      if (mode === "create") {
        const result = await createPost(payload);
        if (typeof result === "number") {
          form.reset();
          return console.log("發佈成功，貼文 ID：", result);
        }
        if (result.error) console.error(`貼文發佈失敗：${result.error}`);
      }
    },
  });

  const handleSubmit = async () => {
    if (!form.state.canSubmit) {
      toEntries(form.getAllErrors().fields).forEach(([fieldName, fieldErrors]) => {
        fieldErrors.errors.forEach((error) => {
          if (!error || typeof error !== "object") return;
          if (!("message" in error)) return;
          console.error(`${fieldName}: ${error.message}`);
        });
      });

      console.error("請檢查表單是否填寫正確");
      return;
    }
    form.handleSubmit();
  };

  // 處理附件上傳
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const newFiles = Array.from(event.target.files);
    form.setFieldValue("photos", (prev) => [...prev, ...newFiles]);
    form.validateField("photos", "change");
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const newFiles = Array.from(event.target.files);
    form.setFieldValue("attachments", (prev) => [...prev, ...newFiles]);
  };

  // 移除附件
  const removePhoto = (fileName: string) => {
    form.setFieldValue("photos", (prev) => prev.filter((file) => file.name !== fileName));
    form.validateField("photos", "change");
  };
  const removeAttachment = (fileName: string) => {
    form.setFieldValue("attachments", (prev) => prev.filter((file) => file.name !== fileName));
    form.validateField("attachments", "change");
  };

  // 標籤相關狀態
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleAddTagClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleAddTagClose = () => setAnchorEl(null);

  const handleAddTag = (value: string | null) => {
    if (!value || !value.trim()) return console.error("請輸入標籤名稱");
    if (value === "顯示全部") return console.error("該標籤名稱無效");
    form.setFieldValue("tags", (prev) => Array.from(new Set([...prev, value.trim()])));
    form.validateField("tags", "change");
    handleAddTagClose();
  };
  const handleDelTag = (tag: string) => {
    form.setFieldValue("tags", (prev) => prev.filter((t) => t !== tag));
    form.validateField("tags", "change");
  };

  // 插入表情符號到內容中
  const handleEmojiInsert = (emoji: string) => {
    form.setFieldValue("content", (prevContent) => {
      const textField = document.querySelector('textarea[placeholder="分享你的想法..."]') as HTMLTextAreaElement;

      if (textField) {
        const start = textField.selectionStart || 0;
        const end = textField.selectionEnd || 0;

        // 在光標位置插入表情符號
        const newContent = prevContent.substring(0, start) + emoji + prevContent.substring(end);

        // 在下一個更新後設置光標位置
        setTimeout(() => {
          textField.focus();
          textField.setSelectionRange(start + emoji.length, start + emoji.length);
        }, 0);

        return newContent;
      }

      // 如果無法獲取光標位置，則直接附加到文本末尾
      return prevContent + emoji;
    });
  };

  return (
    <>
      {mode === "create" && (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", px: 3 }}>
          <PeopleRoundedIcon
            className="mode-light"
            sx={{
              fontSize: 48,
              mr: 1,
              bgcolor: "primary.main",
              borderRadius: 1,
              color: "background.default",
              p: 1,
              opacity: 0.8,
            }}
          />
          {authenticated ? (
            <>
              <Typography variant="h5" component="h2" color="primary" sx={{ opacity: 0.8 }}>
                {user.name}
              </Typography>
              <Typography variant="h5" component="h2">
                ，你在想些什麼？
              </Typography>
            </>
          ) : loading ? (
            <Skeleton variant="rounded" animation="wave">
              <Typography variant="h5" component="h2">
                登入就能分享你的想法喔 ✨
              </Typography>
            </Skeleton>
          ) : (
            <Typography variant="h5" component="h2">
              登入就能分享你的想法喔 ✨
            </Typography>
          )}
        </Box>
      )}

      {mode === "create" && <Divider sx={{ my: 2 }} />}

      <Box sx={{ px: 3 }}>
        <form.Field
          name="title"
          validators={{ onSubmit: formElementsSchema.title }}
          children={(field) => (
            <TextField
              name={field.name}
              fullWidth
              label="標題"
              variant="filled"
              sx={{ mb: 0.5 }}
              disabled={!authenticated || loading}
              type="text"
              error={getFormIsError(field.state.meta.errors)}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        />
        <form.Field
          name="content"
          validators={{ onSubmit: formElementsSchema.content }}
          children={(field) => (
            <TextField
              name={field.name}
              multiline
              fullWidth
              placeholder="分享你的想法..."
              variant="filled"
              minRows={6}
              maxRows={12}
              size="small"
              sx={{ mb: 1 }}
              disabled={!authenticated || loading}
              type="text"
              error={getFormIsError(field.state.meta.errors)}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        />

        <form.Field
          name="photos"
          validators={{ onChange: formElementsSchema.photos }}
          children={(field) =>
            field.state.value.length > 0 && (
              <Box sx={{ mb: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {uniqueByField(field.state.value, "name").map((file, i) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <BoxM
                      key={file.name}
                      layout
                      sx={{ position: "relative", width: 100, height: 100, borderRadius: 1, overflow: "hidden" }}
                    >
                      <img
                        src={url}
                        alt={`上傳的圖片 ${i + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onLoad={() => URL.revokeObjectURL(url)}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            "data:image/svg+xml;base64," +
                            btoa(
                              `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="gray"/></svg>`
                            );
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removePhoto(file.name)}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          bgcolor: "divider",
                          color: "white",
                          "&:hover": { bgcolor: "error.main" },
                          p: 0.5,
                        }}
                      >
                        <CloseRoundedIcon fontSize="small" />
                      </IconButton>
                    </BoxM>
                  );
                })}
              </Box>
            )
          }
        />

        <form.Field
          name="attachments"
          validators={{ onChange: formElementsSchema.attachments }}
          children={(field) =>
            field.state.value.length > 0 && (
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                  附件檔案：
                </Typography>
                {uniqueByField(field.state.value, "name").map((file) => (
                  <BoxM key={file.name} layout sx={{ mr: 1, mb: 1, display: "inline-block" }}>
                    <Chip
                      label={`${file.name} (${formatFileSize(file.size)})`}
                      onDelete={() => removeAttachment(file.name)}
                    />
                  </BoxM>
                ))}
              </Box>
            )
          }
        />

        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
          <Typography variant="body2" component="span" sx={{ color: "text.secondary" }}>
            標籤：
          </Typography>
          <form.Field name="tags" validators={{ onChange: formElementsSchema.tags }} children={() => null} />
          <form.Subscribe
            selector={(state) => state.values.tags}
            children={(tags) => (
              <>
                {[...new Set(tags)].map((tag) => (
                  <Tooltip title="刪除" arrow placement="top" key={tag}>
                    <Chip label={tag} clickable onClick={() => handleDelTag(tag)} />
                  </Tooltip>
                ))}
              </>
            )}
          />

          <Chip
            label="新增標籤"
            clickable
            icon={<AddRoundedIcon />}
            variant="outlined"
            onClick={handleAddTagClick}
            disabled={!authenticated || loading}
          />
          <TopicPicker
            type="add"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleAddTagClose}
            onConfirm={handleAddTag}
          />
        </Box>
      </Box>

      <Divider sx={{ mt: 1 }} />

      <Box
        sx={{
          position: "relative",
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          py: 1,
          px: 3,
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <EmojiMenu onEmojiClick={handleEmojiInsert} disabled={!authenticated || loading} />

          <Tooltip title="插入照片" arrow>
            <span>
              <IconButton
                size="small"
                onClick={() => document.getElementById("photo-upload")?.click()}
                disabled={!authenticated || loading}
              >
                <InsertPhotoRoundedIcon fontSize="small" />
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handlePhotoUpload}
                />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="附加檔案" arrow>
            <span>
              <IconButton
                size="small"
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={!authenticated || loading}
              >
                <AttachFileRoundedIcon fontSize="small" />
                <input type="file" id="file-upload" multiple style={{ display: "none" }} onChange={handleFileUpload} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            variant="outlined"
            onClick={() => form.reset()}
            disabled={!authenticated || loading}
            loading={isPending}
          >
            取消
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<PublishRoundedIcon />}
            onClick={handleSubmit}
            disabled={!authenticated || loading}
            loading={isPending}
          >
            發佈
          </Button>
        </Box>
      </Box>
    </>
  );
};

export { NewPost };
