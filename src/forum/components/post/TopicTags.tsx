import type { Post } from "@/forum/utils/dataType";
import { Chip } from "@mui/material";

type TopicTagsProps = {
  post: Post;
  displayCount?: number;
};

const TopicTags = ({ post, displayCount = 3 }: TopicTagsProps) => {
  const { tags, id: postId } = post;
  return (
    <>
      {tags.map(
        (tag, i) =>
          i < displayCount && (
            <Chip
              key={tag}
              label={tag}
              clickable
              size="small"
              component="a"
              href={`/src/forum/pages/posts/index.html?topic=${tag}`}
            />
          )
      )}
      {tags.length > displayCount && (
        <Chip
          label={`+${tags.length - displayCount}`}
          clickable
          size="small"
          variant="outlined"
          component="a"
          href={`/src/forum/pages/post/index.html?postId=${postId}`}
        />
      )}
    </>
  );
};

export { TopicTags };
