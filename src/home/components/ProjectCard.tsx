import { Box, ButtonBase, Typography } from "@mui/material";

type ProjectCardProps = {
  title: string;
  description: string;
  href: string;
  colors: string[];
  iconUrl?: string;
  isIconWhiteOrBlack?: boolean;
};

const ProjectCard = ({ title, description, href, colors, iconUrl, isIconWhiteOrBlack }: ProjectCardProps) => {
  return (
    <ButtonBase
      sx={{
        display: "block",
        width: 1,
        height: 1,
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        "&:hover": { scale: "1.02", boxShadow: 6 },
        "&:active": { scale: "0.97" },
        transition: "all 0.3s ease",
        boxShadow: 1,
        outline: "1px solid",
        outlineColor: "divider",
      }}
      href={href}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "gray",
          opacity: 0.6,
          transition: "all 0.3s ease",
          zIndex: -1,
          "a:hover &": { scale: 1.05 },
        }}
      >
        {/* img */}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          bgcolor: "background.paper",
          color: "text.primary",
          transition: "all 0.3s ease",
          "a:hover &": { height: 0.7 },
          height: 0.45,
          width: 1,
          p: 1,
          pt: 0,
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "gray", opacity: 0.1 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 1,
            translate: "0px -50%",
            px: 2.5,
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
            <Box
              sx={{ position: "relative", p: iconUrl ? "0px" : "24px", borderRadius: 1, bgcolor: "background.default" }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 1,
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  opacity: 0.5,
                }}
              />
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt={title}
                  width={48}
                  style={{ display: "block", padding: 12, mixBlendMode: isIconWhiteOrBlack ? "exclusion" : undefined }}
                />
              )}
            </Box>

            <Typography variant="subtitle1" component="h2" sx={{ lineHeight: 1 }}>
              {title}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-end" }}>
            {colors.map((color, index) => (
              <Box key={index} sx={{ position: "relative", p: 1, borderRadius: 9, bgcolor: color }}>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 9,
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    opacity: 0.5,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Typography
          variant="caption"
          sx={{
            mt: -1,
            textAlign: "start",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            "a:hover &": { WebkitLineClamp: 3 },
          }}
        >
          {description}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

export { ProjectCard };
