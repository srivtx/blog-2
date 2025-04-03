
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {authenticated && <PostForm />}
    </Layout>
  );
};

export default CreatePost;
