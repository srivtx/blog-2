
import { useEffect, useState } from "react";
import { getPosts, Post } from "@/lib/firebase";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Blog</h1>
        <p className="text-muted-foreground">
          Welcome to my blog where I write about web development, technology, and more.
        </p>
      </section>

      <section>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading posts...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No posts found.</p>
          </div>
        ) : (
          <div className="divide-y">
            {posts.map((post) => (
              <div key={post.id} className="py-8 first:pt-0">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
