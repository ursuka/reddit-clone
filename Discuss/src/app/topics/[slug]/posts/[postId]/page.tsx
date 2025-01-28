import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import { CommentList } from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";
import { FC, Suspense } from "react";
import { PostShowLoading } from "@/components/posts/post-show-loading";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

const PostShowPage: FC<PostShowPageProps> = async ({ params }) => {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.topicShowPath(slug)}
      >
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <Suspense fallback={<div>Loading...</div>}>
        <CommentList postId={postId} />
      </Suspense>
    </div>
  );
};

export default PostShowPage;
