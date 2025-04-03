
import { Post } from "@/lib/firebase";

interface PostContentProps {
  post: Post;
  isPreview?: boolean;
}

const PostContent = ({ post, isPreview }: PostContentProps) => {
  // Format the date for display
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt.toMillis()).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      })
    : 'Draft';

  return (
    <article className="prose dark:prose-invert w-full">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <time>{formattedDate}</time>
        {post.updatedAt && post.publishedAt && post.updatedAt.toMillis() > post.publishedAt.toMillis() && (
          <span className="ml-2">
            (Updated: {new Date(post.updatedAt.toMillis()).toLocaleDateString()})
          </span>
        )}
      </div>
      {isPreview ? (
        <div className="border p-4 rounded-lg bg-muted mb-8">
          <div className="text-sm font-medium mb-2 text-muted-foreground">Preview Mode</div>
          <p>{post.summary}</p>
        </div>
      ) : null}
      <div 
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="leading-relaxed"
      />
    </article>
  );
};

export default PostContent;
