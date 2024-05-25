import { useRecoilValue } from "recoil";
import { motion, LayoutGroup } from "framer-motion";

import { BOOKS_FOLD, BOOKS_TAB } from "../../utils/store";
import { useBooksGroups } from "../../utils/hooks";
import { useBooksGroupClick, useBooksImageClick } from "../../utils/hooks";
import { orchestrationVar } from "../Motion";
import Preview from "./preview/Preview";

function Grid({ children, variants }) {
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
  };

  return (
    <motion.div style={containerStyle} variants={variants}>
      {children}
    </motion.div>
  );
}

export default function Books() {
  const tab = useRecoilValue(BOOKS_TAB);
  const isFold = useRecoilValue(BOOKS_FOLD);
  const isGroup = tab === "props" && isFold;

  const { rows, groups } = useBooksGroups();
  const length = isGroup ? Object.keys(groups).length : rows.length;
  const variants = orchestrationVar({ delay: 0, stagger: 0.3 / length });

  const { group, createHandlerG } = useBooksGroupClick();
  const { createHandlerI } = useBooksImageClick();

  const items = Object.entries(groups).map(([groupName, groupItems]) => {
    if (groupItems.length === 1 || groupName === group || !isGroup)
      return groupItems.map(({ category, name, i }) => (
        <Preview
          key={name}
          category={category}
          name={name}
          onClick={createHandlerI(i)}
          amount={0}
        />
      ));

    const { category, name } = groupItems[0];
    return (
      <Preview
        key={name}
        category={category}
        name={name}
        onClick={createHandlerG(groupName)}
        amount={groupItems.length}
      />
    );
  });

  return (
    <Grid variants={variants}>
      <LayoutGroup>{items}</LayoutGroup>
    </Grid>
  );
}
