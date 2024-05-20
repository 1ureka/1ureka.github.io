import { Stack, Slider } from "@mui/material";
import { useRecoilState } from "recoil";
import { EDITOR_FILTER } from "../../../utils/store";
import { SubTitle, Title } from "./Typo";

function FilterSlider({ value, onChange }) {
  const sliderProps = {
    min: 0.5,
    max: 1.5,
    step: 0.1,
    valueLabelDisplay: "auto",
    size: "small",
  };

  return <Slider value={value} marks {...sliderProps} onChange={onChange} />;
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
