import {CommentShow} from "@/components/comments/comment-show";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentListProps {
  postId: string;
}

export const CommentList = async ({ postId }: CommentListProps) => {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        postId={postId}
        key={comment.id}
        commentId={comment.id}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
