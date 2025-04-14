import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import { lgSpace, mdSpace, smSpace } from "./commonSx";
import { TableSelect } from "./TableSelect";
import { ColumnSelect } from "./ColumnSelect";
import { TableHeader } from "./TableHeader";

const secondaryButtonSx: (color: string) => ButtonProps["sx"] = (color) => ({
  "--temporary-color": color,
  bgcolor: "color-mix(in srgb, var(--temporary-color) 30%, transparent 70%)",
  "&:hover": { bgcolor: "color-mix(in srgb, var(--temporary-color) 40%, transparent 60%)" },
  color: "color-mix(in srgb, var(--temporary-color) 40%, var(--mui-palette-text-primary) 60%)",
  px: 1.5,
});

const primaryButtonSx: (color: string) => ButtonProps["sx"] = (color) => ({
  "--temporary-color": color,
  bgcolor: "color-mix(in srgb, var(--temporary-color) 90%, var(--mui-palette-text-primary) 10%)",
  "&:hover": { bgcolor: "color-mix(in srgb, var(--temporary-color) 80%, var(--mui-palette-text-primary) 20%)" },
  color: "color-mix(in srgb, var(--temporary-color) 5%, var(--mui-palette-background-paper) 95%)",
  px: 1.5,
});

const Tables = () => {
  return (
    <Stack>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: mdSpace }}>
        <Box sx={{ display: "flex", alignItems: "stretch", gap: mdSpace }}>
          <TableSelect />
          <ColumnSelect />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: mdSpace }}>
          <Typography sx={{ color: "text.secondary" }}>已選取 0 個:</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: smSpace }}>
            <Tooltip title="以指定值覆蓋選取資料的某個欄位" arrow>
              <Button sx={secondaryButtonSx("var(--mui-palette-primary-main)")}>覆蓋欄位</Button>
            </Tooltip>
            <Button sx={secondaryButtonSx("var(--mui-palette-error-main)")}>刪除紀錄</Button>
          </Box>

          <Divider flexItem orientation="vertical" />
          <Button sx={primaryButtonSx("var(--mui-palette-primary-main)")} endIcon={<ArrowDropDownRoundedIcon />}>
            標準化
          </Button>
        </Box>
      </Box>

      <TableContainer sx={{ mt: lgSpace }}>
        <Table>
          <TableHeader />
          <TableBody>
            {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Tables;
