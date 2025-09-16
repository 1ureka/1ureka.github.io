import {
  Box,
  Button,
  Drawer,
  Typography,
  Stack,
  Divider,
  TextField,
  Alert,
  FormHelperText,
} from "@mui/material";
import { useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useInsertRow } from "@/datahub/hooks/update";
import type { TableControlParams } from "@/datahub/hooks/tableControl";

interface AddDataDrawerProps {
  open: boolean;
  onClose: () => void;
  params: TableControlParams;
}

const AddDataDrawer = ({ open, onClose, params }: AddDataDrawerProps) => {
  const insertMutation = useInsertRow();

  // 建立表單欄位的驗證規則
  const fieldValidators = useMemo(() => {
    const validators: Record<string, z.ZodType<any>> = {};
    
    params.columns.forEach(column => {
      let validator: z.ZodType<any>;
      
      switch (column.type) {
        case "integer":
          validator = z.string().refine(val => val === "" || !isNaN(Number(val)), "請輸入有效的整數");
          break;
        case "real":
          validator = z.string().refine(val => val === "" || !isNaN(Number(val)), "請輸入有效的數字");
          break;
        case "boolean":
          validator = z.string().refine(val => ["", "0", "1", "true", "false"].includes(val.toLowerCase()), "請輸入 true/false 或 0/1");
          break;
        case "date":
          validator = z.string().refine(val => val === "" || !isNaN(Date.parse(val)), "請輸入有效的日期格式");
          break;
        default:
          validator = z.string();
      }
      
      validators[column.name] = validator;
    });
    
    return validators;
  }, [params.columns]);

  // 初始化表單
  const defaultValues = useMemo(() => {
    const values: Record<string, string> = {};
    params.columns.forEach(column => {
      values[column.name] = "";
    });
    return values;
  }, [params.columns]);

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (insertMutation.isPending) return;
      
      // 轉換資料型別
      const processedData: Record<string, any> = {};
      for (const [key, val] of Object.entries(value)) {
        const column = params.columns.find(c => c.name === key);
        if (!column) continue;
        
        if (val === "") {
          processedData[key] = null;
          continue;
        }
        
        switch (column.type) {
          case "integer":
            processedData[key] = parseInt(val, 10);
            break;
          case "real":
            processedData[key] = parseFloat(val);
            break;
          case "boolean":
            processedData[key] = val.toLowerCase() === "true" || val === "1" ? 1 : 0;
            break;
          case "date":
            processedData[key] = val;
            break;
          default:
            processedData[key] = val;
        }
      }
      
      const result = await insertMutation.mutateAsync({
        table: params.table,
        data: processedData,
      });
      
      if (result.success) {
        form.reset();
        onClose();
      }
    },
    onSubmitInvalid: () => {
      console.error("請檢查表單是否填寫正確");
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const getFieldHelper = (type: string) => {
    switch (type) {
      case "integer":
        return "請輸入整數，例如：123";
      case "real":
        return "請輸入數字，例如：123.45";
      case "boolean":
        return "請輸入 true/false 或 0/1";
      case "date":
        return "請輸入日期，例如：2024-01-01";
      default:
        return "請輸入文字";
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      slotProps={{ 
        paper: { 
          sx: { 
            width: { xs: "100%", sm: 480, md: 600 }, 
            maxWidth: "90vw" 
          } 
        } 
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AddIcon />
            新增資料 - {params.table}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            在表格中新增一筆資料
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Stack sx={{ flex: 1, gap: 2, overflowY: "auto", mb: 3 }}>
            {params.columns.map((column) => (
              <form.Field
                key={column.name}
                name={column.name}
                validators={{
                  onChange: fieldValidators[column.name],
                }}
                children={(field) => (
                  <Box>
                    <TextField
                      fullWidth
                      name={field.name}
                      label={`${column.name} (${column.type.toUpperCase()})`}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.length > 0}
                      helperText={
                        field.state.meta.errors.length > 0
                          ? field.state.meta.errors[0]?.toString()
                          : getFieldHelper(column.type)
                      }
                      required={column.pk >= 1 && !column.name.toLowerCase().includes("id")}
                      disabled={insertMutation.isPending}
                      size="small"
                    />
                    {column.pk >= 1 && (
                      <FormHelperText sx={{ color: "primary.main" }}>
                        主鍵欄位
                      </FormHelperText>
                    )}
                  </Box>
                )}
              />
            ))}
            
            {insertMutation.isError && (
              <Alert severity="error">
                新增資料失敗，請檢查輸入的資料格式是否正確
              </Alert>
            )}
          </Stack>

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handleClose} 
              sx={{ flex: 1 }}
              disabled={insertMutation.isPending}
            >
              取消
            </Button>
            <Button
              type="submit"
              variant="contained"
              loading={insertMutation.isPending}
              sx={{ flex: 1 }}
            >
              {insertMutation.isPending ? "新增中..." : "確認新增"}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export { AddDataDrawer };