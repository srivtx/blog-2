
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostBySlug, Post } from "@/lib/firebase";
import Layout from "@/components/Layout";
import PostContent from "@/components/PostContent";

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError("Invalid post URL");
        setLoading(false);
        return;
      }
      
      try {
        const postData = await getPostBySlug(slug);
        
        if (!postData) {
          setError("Post not found");
          setTimeout(() => navigate("/"), 3000);
        } else {
          setPost(postData);
        }
      } catch (err) {
        setError("Failed to load post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-muted-foreground">Loading post...</div>
        </div>
      ) : error ? (
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="text-muted-foreground">{error}</p>
          {error === "Post not found" && (
            <p className="mt-2 text-sm text-muted-foreground">
              Redirecting to home page...
            </p>
          )}
        </div>
      ) : post ? (
        <PostContent post={post} />
      ) : null}
    </Layout>
  );
};

export default Post;
