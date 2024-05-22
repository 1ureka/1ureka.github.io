import { Slider, Stack } from "@mui/material";
import { useRecoilState } from "recoil";
import { EDITOR_FILTER } from "../../../utils/store";
import { SubTitle, Title } from "./Typo";
import { MotionStack, toolsItemVar } from "../../Motion";

function FilterSlider({ value, onChange }) {
  const sliderProps = {
    min: 0.5,
    max: 1.5,
    step: 0.1,
    valueLabelDisplay: "auto",
    size: "small",
  };

  return (
    <MotionStack variants={toolsItemVar} sx={{ width: "100%" }}>
      <Slider value={value} marks {...sliderProps} onChange={onChange} />
    </MotionStack>
  );
}

export default function Filter() {
  const [{ saturate, contrast, exposure }, setFilter] =
    useRecoilState(EDITOR_FILTER);

  const handleSaturate = (_, val) =>
    setFilter((prev) => ({ ...prev, saturate: val }));
  const handleContrast = (_, val) =>
    setFilter((prev) => ({ ...prev, contrast: val }));
  const handleExposure = (_, val) =>
    setFilter((prev) => ({ ...prev, exposure: val }));

  return (
    <Stack gap={1}>
      <Title title={"FILTER:"} sx={{ mb: 1 }} />
      <SubTitle title={"saturation"} />
      <FilterSlider value={saturate} onChange={handleSaturate} />
      <SubTitle title={"contrast"} />
      <FilterSlider value={contrast} onChange={handleContrast} />
      <SubTitle title={"exposure"} />
      <FilterSlider value={exposure} onChange={handleExposure} />
    </Stack>
  );
}
