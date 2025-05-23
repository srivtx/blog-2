
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-background transition-colors duration-300">
      <Navbar />
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-6 border-t dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
