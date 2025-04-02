import { Fragment } from "react";
import { Box, FormControlLabel, FormHelperText, Stack, Switch, Typography } from "@mui/material";
import { ellipsisSx, noSpace, smSpace, underlineSx } from "../commonSx";
import { TileTooltip } from "../TileTooltip";
import { StripedBackground } from "./StripedBackground";

const FlatBarChart = () => {
  const data = {
    name: 11,
    email: 9,
    phone: 8,
    address_location_name: 3,
    birthday: 2,
  };

  const dataArray = Object.entries(data).map(([key, value]) => ({ key, value }));

  return (
    <Stack
      sx={{
        aspectRatio: { xs: "2/1", ml: "2/1.2" },
        borderTop: "1px solid",
        borderColor: "divider",
        position: "relative",
      }}
    >
      <Box
        sx={{ display: "flex", gap: smSpace, justifyContent: "space-between", alignItems: "flex-start", p: smSpace }}
      >
        <Typography variant="h5" component="h3">
          使用的欄位名稱
        </Typography>

        <Stack sx={{ alignItems: "flex-end" }}>
          <FormControlLabel
            control={<Switch />}
            labelPlacement="start"
            label={
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                包含系統欄位
              </Typography>
            }
          />
          <FormHelperText>(id, createdAt, updatedAt, ...)</FormHelperText>
        </Stack>
      </Box>

      <Box sx={{ position: "relative", maxWidth: 1, flex: 1, overflowX: "auto", overflowY: "hidden" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: smSpace,
            placeItems: "center",
            "& > :nth-of-type(3n + 1)": { justifySelf: "flex-start" },
            p: smSpace,
            pt: noSpace,
            width: 1,
            height: 1,
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              最常使用
            </Typography>
          </Box>
          <Box />
          <Box>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              出現次數
            </Typography>
          </Box>

          {dataArray.map(({ key, value }, i) => (
            <Fragment key={key}>
              <Box>
                <TileTooltip title={<Typography>{key}</Typography>}>
                  <Typography variant="body1" sx={{ ...ellipsisSx, ...underlineSx, maxWidth: "6rem" }}>
                    {key}
                  </Typography>
                </TileTooltip>
              </Box>

              <TileTooltip
                title={
                  <Box>
                    <Typography variant="subtitle2">{key}</Typography>
                    <Typography>所有欄位名稱中的 {`${((value / 11) * 36).toFixed(1)}%`}</Typography>
                  </Box>
                }
              >
                <Box
                  sx={{
                    width: 1,
                    height: "1rem",
                    borderRadius: 99,
                    position: "relative",
                    overflow: "clip",
                    display: "flex",
                    alignItems: "center",
                    "&:hover": { bgcolor: "action.hover", "& .bar-content": { opacity: 1 } },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <StripedBackground color1="divider" color2="#fff0" angle={-35} stripeWidth={5} />

                  <Box
                    sx={{
                      position: "absolute",
                      width: `${(value / 11) * 36}%`,
                      height: 1,
                      borderRadius: 9,
                      overflow: "clip",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Box
                      className="bar-content"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "primary.main",
                        opacity: i === 0 ? 0.9 : 0.65,
                        transition: "all 0.2s ease-in-out",
                      }}
                    />
                  </Box>
                </Box>
              </TileTooltip>

              <Box>
                <Typography variant="body1" sx={{ ...ellipsisSx, maxWidth: "10rem" }}>
                  {value}
                </Typography>
              </Box>
            </Fragment>
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export { FlatBarChart };
