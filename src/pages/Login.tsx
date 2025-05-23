
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signInWithGoogle } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogIn, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast: useToastNotify } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      useToastNotify({
        title: "Logged in successfully",
        description: "Welcome back to your blog",
      });
      navigate("/");
    } catch (error) {
      useToastNotify({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your email and password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    
    try {
      await signInWithGoogle();
      toast.success("Logged in with Google successfully");
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
      console.error("Google sign-in error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md dark:border-gray-800 dark:bg-card transition-colors duration-300">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors duration-300">Login</CardTitle>
            <CardDescription className="dark:text-gray-400 transition-colors duration-300">
              Login to your account to create or edit blog posts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 transition-colors duration-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    autoComplete="email"
                    className="pl-10 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium dark:text-gray-300 transition-colors duration-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    autoComplete="current-password"
                    className="pl-10 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login with Email"}
              </Button>
              
              <div className="relative my-4">
                <Separator className="dark:bg-gray-700 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-background dark:bg-card px-2 text-xs text-muted-foreground transition-colors duration-300">
                    OR
                  </span>
                </div>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300" 
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
