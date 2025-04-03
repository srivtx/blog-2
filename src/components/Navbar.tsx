
import { Link } from "react-router-dom";
import { auth, signOut } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      toast({
        title: "Failed to log out",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="border-b dark:border-gray-800">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="font-semibold text-xl dark:text-white">My Blog</Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            
            {user ? (
              <>
                <Link to="/create" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  New Post
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
