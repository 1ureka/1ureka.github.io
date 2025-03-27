import type { FetchPostByIdResult } from "@/forum/data/post";
import { routes } from "@/routes";
import { Chip } from "@mui/material";

type TopicTagsProps = {
  post: FetchPostByIdResult;
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
              href={`${routes.forum_posts}?topic=${tag}`}
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
          href={`${routes.forum_post}?postId=${postId}`}
        />
      )}
    </>
  );
};

export { TopicTags };
