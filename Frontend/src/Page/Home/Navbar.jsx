import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Code2, 
  User,
  Menu,
  X
} from "lucide-react";

const Navbar = () => {
  const menu = [
    {
      name: "Quizzes",
      path: "/home",
      icon: Home
    },
    {
      name: "Notes",
      path: "/notes",
      icon: BookOpen
    },
    {
      name: "Tutorial",
      path: "/tutorial",
      icon: Video
    },
    {
      name: "AI Assistant",
      path: "/chatbot",
      icon: MessageCircle
    },
    {
      name: "Code Editor",
      path: "/editer",
      icon: Code2
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User
    },
  ];
  const navigate = useNavigate();
  function execution(path) {
    navigate(path);
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return ( 
    <nav className="relative">
      {/* Mobile menu button */}
      <div className="flex justify-end mb-4 md:hidden">
        <button
          onClick={handleMenuToggle}
          type="button"
          className="inline-flex items-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          aria-controls="navbar-menu"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <X className="w-5 h-5 text-gray-700" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Navigation menu */}
      <div
        className={`${isMenuOpen ? 'block animate-fade-in' : 'hidden'} md:block transition-all duration-300`}
        id="navbar-menu"
      >
        <div className="flex justify-center">
          <div className="glass-card rounded-2xl p-2 md:p-3 m-2 md:m-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
              {menu.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={i}
                    variant="ghost"
                    className="group relative flex items-center justify-start md:justify-center gap-3 px-4 py-3 md:px-6 md:py-2.5 text-gray-700 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 text-sm md:text-base font-medium no-underline"
                    onClick={() => execution(item.path)}
                  >
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="md:hidden lg:inline">{item.name}</span>
                    
                    {/* Hover effect indicator */}
                    <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
