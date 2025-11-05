import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Code, 
  Brain, 
  Sparkles, 
  Star, 
  Users, 
  Award,
  BookOpen,
  Zap
} from "lucide-react";
import Prevent from "../Auth/Prevent";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  const features = [
    {
      icon: Code,
      title: "Interactive Coding",
      description: "Practice with real code challenges",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Smart Learning",
      description: "AI-powered personalized learning paths",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Earn recognized programming certificates",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Learners" },
    { icon: BookOpen, value: "500+", label: "Practice Questions" },
    { icon: Star, value: "4.8", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <Prevent />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse-slow" style={{animationDelay: "1s"}}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-pulse-slow" style={{animationDelay: "2s"}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 bg-white/50 backdrop-blur-sm border-purple-200">
            <Sparkles className="w-4 h-4 mr-2" />
            New Features Available
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 bg-clip-text text-transparent leading-tight">
            Think And Select
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            The ultimate platform for coding enthusiasts and aspiring programmers. 
            Master programming skills with interactive quizzes, real-time coding challenges, 
            and personalized learning paths.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="btn-gradient px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={handleRedirect}
            >
              Start Learning Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-2 rounded-xl hover:bg-white/20 backdrop-blur-sm"
            >
              Watch Demo
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 animate-slide-up">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 animate-fade-in">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <stat.icon className="w-6 h-6 text-purple-600 mr-2" />
                <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
