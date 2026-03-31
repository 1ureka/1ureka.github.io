import {
  Box,
  Button,
  Drawer,
  Typography,
  Stack,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { useDeleteRowsByIds } from "@/datahub/hooks/update";
import { useTableSelectCount } from "@/datahub/hooks/tableSelect";
import type { TableControlParams } from "@/datahub/hooks/tableControl";

interface DeleteConfirmDrawerProps {
  open: boolean;
  onClose: () => void;
  params: TableControlParams;
  selectedRowIds: string[];
}

const DeleteConfirmDrawer = ({ open, onClose, params, selectedRowIds }: DeleteConfirmDrawerProps) => {
  const deleteMutation = useDeleteRowsByIds();
  const selectedCount = useTableSelectCount(params.totalRows);

  const handleDelete = async () => {
    if (deleteMutation.isPending || selectedRowIds.length === 0) return;

    const result = await deleteMutation.mutateAsync({
      table: params.table,
      rowIds: selectedRowIds,
    });

    if (result.success) {
      onClose();
    }
  };

  const handleClose = () => {
    if (!deleteMutation.isPending) {
      onClose();
    }
  };

  // 解析選中的行資料以顯示預覽
  const previewData = selectedRowIds.slice(0, 5).map((rowId, index) => {
    try {
      const rowData = JSON.parse(rowId);
      return { index, rowData };
    } catch {
      return { index, rowData: {} };
    }
  });

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
            <DeleteIcon color="error" />
            確認刪除資料
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            此操作將永久刪除選中的資料，無法復原
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Content */}
        <Stack sx={{ flex: 1, gap: 3, overflowY: "auto" }}>
          {/* Warning Alert */}
          <Alert 
            severity="error" 
            icon={<WarningIcon />}
            sx={{ 
              "& .MuiAlert-message": { 
                width: "100%" 
              } 
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                警告：此操作無法復原
              </Typography>
              <Typography variant="body2">
                您即將刪除 <strong>{selectedCount}</strong> 筆資料，刪除後將無法恢復。請確認您真的要執行此操作。
              </Typography>
            </Box>
          </Alert>

          {/* Summary */}
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              刪除摘要
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 1 }}>
              <Chip 
                label={`表格: ${params.table}`} 
                variant="outlined" 
                size="small" 
              />
              <Chip 
                label={`資料筆數: ${selectedCount}`} 
                color="error" 
                variant="outlined" 
                size="small" 
              />
            </Stack>
          </Paper>

          {/* Data Preview */}
          {previewData.length > 0 && (
            <Paper variant="outlined" sx={{ overflow: "hidden" }}>
              <Box sx={{ p: 2, bgcolor: "action.hover" }}>
                <Typography variant="subtitle2">
                  資料預覽 {selectedCount > 5 && `(顯示前 5 筆，共 ${selectedCount} 筆)`}
                </Typography>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {params.columns.slice(0, 3).map((column) => (
                      <TableCell key={column.name} sx={{ fontWeight: 600 }}>
                        {column.name}
                      </TableCell>
                    ))}
                    {params.columns.length > 3 && (
                      <TableCell sx={{ fontWeight: 600 }}>...</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {previewData.map(({ index, rowData }) => (
                    <TableRow key={index}>
                      {params.columns.slice(0, 3).map((column) => (
                        <TableCell key={column.name}>
                          <Typography variant="body2" sx={{ 
                            maxWidth: 150,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                          }}>
                            {rowData[column.name] !== undefined 
                              ? String(rowData[column.name]) 
                              : "N/A"
                            }
                          </Typography>
                        </TableCell>
                      ))}
                      {params.columns.length > 3 && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            ...
                          </Typography>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}

          {/* Additional Warning */}
          <Alert severity="warning">
            <Typography variant="body2">
              請確保您已經備份重要資料。刪除操作完成後，這些資料將無法從資料庫中恢復。
            </Typography>
          </Alert>

          {deleteMutation.isError && (
            <Alert severity="error">
              刪除失敗，請稍後再試或檢查資料是否被其他表格引用
            </Alert>
          )}
        </Stack>

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={handleClose} 
            sx={{ flex: 1 }}
            disabled={deleteMutation.isPending}
          >
            取消
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            loading={deleteMutation.isPending}
            disabled={selectedRowIds.length === 0}
            sx={{ flex: 1 }}
            startIcon={<DeleteIcon />}
          >
            {deleteMutation.isPending ? "刪除中..." : `確認刪除 (${selectedCount})`}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export { DeleteConfirmDrawer };