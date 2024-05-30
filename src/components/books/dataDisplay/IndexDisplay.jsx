import { Stack, Typography } from "@mui/material";
import { useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { MotionStack } from "../../Motion";

const typoSx = {
  color: "text.secondary",
  fontFamily: `"Major Mono Display"`,
  lineHeight: "normal",
};

function Numbers({ type, num }) {
  const spring = useSpring(0, { stiffness: 37, damping: 8, mass: 0.3 });
  const y = useTransform(spring, (latest) => `${latest}%`);

  useEffect(() => {
    spring.set(-parseInt(num) * 100);
  }, [num]);

  return (
    <Stack sx={{ position: "relative", overflow: "hidden" }}>
      <MotionStack style={{ y }}>
        {Array(10)
          .fill()
          .map((_, i) => (
            <Typography
              key={i}
              component="span"
              variant={type === "big" ? "h2" : "h4"}
              sx={{
                position: i !== 0 && "absolute",
                top: i !== 0 && `${i * 100}%`,
                ...typoSx,
              }}
            >
              {i}
            </Typography>
          ))}
      </MotionStack>
    </Stack>
  );
}

export default function IndexDisplay({ current, total }) {
  const currentStr = current.toString().padStart(3, "0").split("");
  const totalStr = total.toString().padStart(2, "0").split("");

  return (
    <Stack direction="row" alignItems="flex-end">
      <Numbers type="big" num={currentStr[0]} />
      <Numbers type="big" num={currentStr[1]} />
      <Numbers type="big" num={currentStr[2]} />

      <Typography component="span" variant={"h2"} sx={typoSx}>
        {"/"}
      </Typography>

      <Numbers type="small" num={totalStr[0]} />
      <Numbers type="small" num={totalStr[1]} />
    </Stack>
  );
}
