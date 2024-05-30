import { useRecoilValue } from "recoil";
import { BOOKS_FOLD } from "../../../utils/store";
import { useBooksGroups } from "../../../utils/hooks";
import { useBooksGroupClick, useBooksImageClick } from "../../../utils/hooks";

import { MotionBox, orchestrationVar } from "../../../components/Motion";
import BooksContentItem from "./BooksContentItem";

export default function BooksContent({ tab }) {
  const { rows, groups } = useBooksGroups();
  const { group, createHandlerG } = useBooksGroupClick();
  const { createHandlerI } = useBooksImageClick();

  const isFold = useRecoilValue(BOOKS_FOLD);
  const isGroup = tab === "props" && isFold;
  const length = isGroup ? Object.keys(groups).length : rows.length;

  return (
    <MotionBox
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 2,
        p: 3,
      }}
      variants={orchestrationVar({ delay: 0, stagger: 0.3 / length })}
    >
      {Object.entries(groups).map(([groupName, groupItems]) => {
        if (groupItems.length === 1 || groupName === group || !isGroup)
          return groupItems.map(({ category, name, i }) => (
            <BooksContentItem
              key={name}
              category={category}
              name={name}
              onClick={createHandlerI(i)}
            />
          ));

        const { category, name } = groupItems[0];
        return (
          <BooksContentItem
            key={name}
            category={category}
            name={name}
            onClick={createHandlerG(groupName)}
            amount={groupItems.length}
          />
        );
      })}
    </MotionBox>
  );
}
