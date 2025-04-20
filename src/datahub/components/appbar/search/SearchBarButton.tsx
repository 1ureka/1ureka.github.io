import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { SearchDialog } from "./SearchDialog";
import { useUrl } from "@/hooks/url";

const SearchBarButton = () => {
  const { updateSearchParams } = useUrl();
  const handleClick = () => updateSearchParams({ search: "true" }, { skipTransition: true });

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <TextField
          variant="outlined"
          label="搜尋"
          size="small"
          disabled
          sx={{
            width: "20vw",
            maxWidth: "22rem",
            bgcolor: "background.paper",
            backgroundImage: "linear-gradient(#fff1, #fff1)",
            borderRadius: 1,
          }}
          slotProps={{
            input: {
              sx: {
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "secondary.main" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
                "&.Mui-disabled .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" disabled={true}>
                    <SearchRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ position: "absolute", inset: 0, cursor: "pointer" }} onClick={handleClick} />
      </Box>

      <SearchDialog />
    </>
  );
};

export { SearchBarButton };
