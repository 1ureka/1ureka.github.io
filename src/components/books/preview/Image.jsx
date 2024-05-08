import Container from "./Container";
import Thumbnail from "./Thumbnail";
import Origin from "./Origin";

export default function Image() {
  const variants = {
    initial: {
      opacity: 0,
      scale: 1.1,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0, duration: 1 },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { type: "spring", bounce: 0, duration: 1 },
    },
  };

  return (
    <Container variants={variants}>
      <Thumbnail />
      <Origin />
    </Container>
  );
}
