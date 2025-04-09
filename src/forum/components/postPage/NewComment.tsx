import { useSession } from "@/forum/hooks/session";
import { Avatar, Box, Button, TextField, type BoxProps } from "@mui/material";
import { EmojiMenu } from "../postElement/shared/EmojiMenu";
import { UserAvatar } from "../userElement/UserAvatar";

import { z } from "zod";
import { useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { useCreateComment, useUpdateComment } from "@/forum/hooks/comment";
import { getFormIsError, getFormErrorHelperText } from "@/forum/utils/form";
import { toEntries } from "@/utils/typedBuiltins";

const formElementsSchema = {
  content: z.string().min(1, { message: "請輸入留言內容" }).max(250, { message: "留言內容過長" }),
};

const formSchema = z.object(formElementsSchema);
const defaultValues: z.infer<typeof formSchema> = { content: "" };

type NewCommentBaseProps = { onCancel?: () => void; postId: number; parentId?: number; hideAvator?: boolean };

type NewCommentProps = NewCommentBaseProps &
  (
    | { type: "create"; initialValues?: never; commentId?: never }
    | { type: "edit"; initialValues: z.infer<typeof formSchema>; commentId: number }
  );

const NewComment = ({
  type,
  hideAvator,
  sx,
  onCancel,
  postId,
  parentId,
  commentId,
  initialValues,
  ...props
}: BoxProps & NewCommentProps) => {
  const { mutateAsync: createComment, isPending: isPendingCreate } = useCreateComment();
  const { mutateAsync: updateComment, isPending: isPendingUpdate } = useUpdateComment();
  const isPending = isPendingCreate || isPendingUpdate;
  const { user, authenticated, loading } = useSession();

  const form = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      if (isPending) return;

      if (type === "create") {
        const result = await createComment({ ...value, postId, parentId });
        if (typeof result === "number") {
          form.reset();
          return console.log("發佈成功，留言 ID：", result);
        }
        if (result.error) console.error(`留言發佈失敗：${result.error}`);
      }

      if (type === "edit") {
        const result = await updateComment({ ...value, commentId });
        if (result === null) {
          form.reset();
          return console.log("更新留言成功");
        }
        if (result.error) console.error(`留言更新失敗：${result.error}`);
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

  const ref = useRef<HTMLInputElement | null>(null);

  // 插入表情符號到內容中
  const handleEmojiInsert = (emoji: string) => {
    form.setFieldValue("content", (prevContent) => {
      const textField = ref.current;

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
    <Box sx={{ position: "relative", py: 1, px: 2, ...sx }} {...props}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
        {!hideAvator ? (
          authenticated && user ? (
            <UserAvatar name={user.name} sx={{ mt: 1.5 }} />
          ) : (
            <Avatar sx={{ width: "2rem", height: "2rem", mt: 1.5 }} />
          )
        ) : null}

        <Box sx={{ flex: 1 }}>
          <form.Field
            name="content"
            validators={{ onSubmit: formElementsSchema.content }}
            children={(field) => (
              <TextField
                inputRef={ref}
                name={field.name}
                variant="standard"
                size="small"
                label={authenticated ? "發表你的想法" : "登入後即可發表留言"}
                fullWidth
                type="text"
                disabled={!authenticated || loading}
                error={getFormIsError(field.state.meta.errors)}
                helperText={getFormErrorHelperText(field.state.meta.errors)}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            )}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, alignItems: "center", gap: 1 }}>
            <EmojiMenu onEmojiClick={handleEmojiInsert} disabled={!authenticated || loading} />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                disabled={!authenticated || loading}
                sx={{ color: "text.secondary" }}
                loading={isPending}
                onClick={() => {
                  form.reset();
                  if (onCancel !== undefined) onCancel();
                }}
              >
                取消
              </Button>
              <form.Subscribe
                selector={(state) => state.values.content}
                children={(value) => (
                  <Button
                    size="small"
                    disabled={!authenticated || loading || value.trim().length === 0}
                    variant="contained"
                    onClick={handleSubmit}
                    loading={isPending}
                  >
                    留言
                  </Button>
                )}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { NewComment };
