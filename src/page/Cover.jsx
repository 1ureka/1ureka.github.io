import { MotionCover } from "../components/Motion";
import Controls from "../components/cover/Controls";

function Background() {
  const imgStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    scale: "1.05",
  };

  const gradientSx = {
    ...imgStyle,
    background: "radial-gradient(transparent, transparent, rgb(0 0 0 / 0.55))",
  };
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img src="./PJ28-2 とびら-1.webp" style={imgStyle} alt="" />
      <div style={gradientSx} />
    </div>
  );
}

export default function Page() {
  return (
    <MotionCover>
      <Background />
      <Controls />
    </MotionCover>
  );
}
