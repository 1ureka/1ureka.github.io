import {
  Box,
  Button,
  Drawer,
  Typography,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import { useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useUploadDatabase, useValidateDatabaseFile } from "@/datahub/hooks/upload";

interface DatabaseUploadDrawerProps {
  open: boolean;
  onClose: () => void;
}

const DatabaseUploadDrawer = ({ open, onClose }: DatabaseUploadDrawerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const uploadMutation = useUploadDatabase();
  const validateMutation = useValidateDatabaseFile();

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    
    // 驗證檔案
    const result = await validateMutation.mutateAsync(file);
    if (!result.valid) {
      setSelectedFile(null);
      console.error(result.error);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const result = await uploadMutation.mutateAsync(selectedFile);
    if (result.success) {
      setSelectedFile(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
            <CloudUploadIcon />
            上傳資料庫
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            選擇一個 SQLite 資料庫檔案來替換當前資料庫
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Content */}
        <Stack sx={{ flex: 1, gap: 3 }}>
          {/* Upload Area */}
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              border: `2px dashed ${dragOver ? "primary.main" : "divider"}`,
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: dragOver ? "action.hover" : "background.paper",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "action.hover",
                borderColor: "primary.main",
              },
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              {dragOver ? "放開檔案以上傳" : "點擊或拖放檔案到此處"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              支援 .db, .sqlite, .sqlite3 格式，最大 50MB
            </Typography>
          </Box>

          <input
            ref={fileInputRef}
            type="file"
            accept=".db,.sqlite,.sqlite3"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />

          {/* File Info */}
          {selectedFile && (
            <Alert
              severity={validateMutation.data?.valid ? "success" : "error"}
              icon={validateMutation.data?.valid ? <CheckCircleIcon /> : <ErrorIcon />}
              sx={{ mb: 2 }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {selectedFile.name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                    <Chip label={formatFileSize(selectedFile.size)} size="small" />
                    <Chip label={selectedFile.type || "application/x-sqlite3"} size="small" />
                  </Box>
                </Box>
              </Box>
            </Alert>
          )}

          {/* Validation Loading */}
          {validateMutation.isPending && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CircularProgress size={20} />
              <Typography variant="body2">驗證檔案中...</Typography>
            </Box>
          )}

          {/* Warning */}
          <Alert severity="warning">
            <Typography variant="body2">
              <strong>注意：</strong>上傳新的資料庫將會完全替換當前資料庫中的所有資料。此操作無法復原，請確保您已備份重要資料。
            </Typography>
          </Alert>
        </Stack>

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={handleClose} sx={{ flex: 1 }}>
            取消
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile || !validateMutation.data?.valid || uploadMutation.isPending}
            loading={uploadMutation.isPending}
            sx={{ flex: 1 }}
          >
            {uploadMutation.isPending ? "上傳中..." : "確認上傳"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export { DatabaseUploadDrawer };