
import { Link } from "react-router-dom";
import { Post } from "@/lib/firebase";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  // Format the date for display
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt.toMillis()).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      })
    : 'Draft';

  return (
    <div className="mb-8">
      <Link to={`/post/${post.slug}`} className="block group">
        <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <time className="text-sm text-muted-foreground">
          {formattedDate}
        </time>
        <p className="mt-2 text-muted-foreground">
          {post.summary}
        </p>
        <div className="mt-3 text-primary font-medium">
          Read more →
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
