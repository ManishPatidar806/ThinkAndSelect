import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "../Home/Navbar";
import Prevent from "../Auth/Prevent";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  MapPin, 
  Briefcase, 
  Calendar,
  Trophy,
  BookOpen,
  Code2,
  Activity,
  Target,
  Award,
  TrendingUp,
  Clock,
  Settings,
  LogOut,
  Edit,
  Star,
  Zap,
  CheckCircle,
  BarChart3
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [joinDate] = useState(new Date().toLocaleDateString());

  const executionLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Mock data for demonstration - in real app, this would come from API
  const profileStats = [
    { icon: Trophy, label: "Quizzes Completed", value: "24", color: "text-yellow-600", bg: "bg-yellow-100" },
    { icon: Award, label: "Certificates Earned", value: "8", color: "text-green-600", bg: "bg-green-100" },
    { icon: Code2, label: "Code Executions", value: "156", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: Target, label: "Success Rate", value: "87%", color: "text-purple-600", bg: "bg-purple-100" }
  ];

  const recentActivity = [
    { type: "quiz", title: "JavaScript Quiz", status: "completed", score: "85%", date: "2 hours ago" },
    { type: "cert", title: "Python Certificate", status: "earned", score: "92%", date: "1 day ago" },
    { type: "code", title: "React Component", status: "executed", score: "Success", date: "3 days ago" },
    { type: "quiz", title: "CSS Flexbox Quiz", status: "completed", score: "78%", date: "5 days ago" }
  ];

  const skillProgress = [
    { skill: "JavaScript", level: 85, color: "bg-yellow-500" },
    { skill: "Python", level: 78, color: "bg-green-500" },
    { skill: "React", level: 72, color: "bg-blue-500" },
    { skill: "CSS", level: 90, color: "bg-purple-500" },
    { skill: "Java", level: 65, color: "bg-red-500" }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "quiz": return <BookOpen className="w-4 h-4" />;
      case "cert": return <Award className="w-4 h-4" />;
      case "code": return <Code2 className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "quiz": return "text-blue-600 bg-blue-100";
      case "cert": return "text-green-600 bg-green-100";
      case "code": return "text-purple-600 bg-purple-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Prevent />
      
      {/* Navigation */}
      <div className="py-4 lg:py-6">
        <Navbar />
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card rounded-3xl p-8 lg:p-12 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-1">
                <img
                  src="https://res.cloudinary.com/dgmsfmeaz/image/upload/v1730297906/KnowledgeTest/vxvbnm6xq9rj5zrmvroy.avif"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 flex items-center justify-center lg:justify-start gap-3">
                  {localStorage.getItem("fullname") || "Developer"}
                  <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200">
                    Pro Member
                  </Badge>
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <span>{localStorage.getItem("domain") || "Full Stack Developer"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>{localStorage.getItem("place") || "Global"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Joined {joinDate}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed max-w-2xl">
                {localStorage.getItem("description") || 
                  "I am a passionate and results-driven programmer with expertise in designing, coding, and maintaining software applications. With a strong foundation in algorithms, data structures, and software engineering principles, I specialize in turning complex problems into elegant, scalable solutions."}
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-200 hover:border-red-300 text-gray-700 hover:text-red-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                  onClick={executionLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {profileStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="glass-card rounded-2xl p-6 text-center space-y-3 hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bg}`}>
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  Recent Activity
                </h2>
                <Button variant="outline" size="sm" className="text-xs">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600 capitalize">{activity.status}</p>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{activity.score}</div>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Progress */}
          <div>
            <div className="glass-card rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Skills Progress
              </h2>

              <div className="space-y-4">
                {skillProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{skill.skill}</span>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${skill.color} transition-all duration-500 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Quick Actions
              </h2>

              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/home')}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-900">Take a Quiz</span>
                </button>

                <button 
                  onClick={() => navigate('/editer')}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-900">Code Editor</span>
                </button>

                <button 
                  onClick={() => navigate('/tutorial')}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-900">View Tutorials</span>
                </button>

                <button 
                  onClick={() => navigate('/notes')}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                    <Star className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-900">Study Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-8">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Achievements
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "First Quiz", icon: "🎯", earned: true },
                { name: "Code Master", icon: "💻", earned: true },
                { name: "Quick Learner", icon: "⚡", earned: true },
                { name: "Perfectionist", icon: "💯", earned: false },
                { name: "Night Owl", icon: "🦉", earned: false },
                { name: "Streak Master", icon: "🔥", earned: false }
              ].map((badge, index) => (
                <div 
                  key={index}
                  className={`text-center p-4 rounded-xl border-2 transition-all duration-300 ${
                    badge.earned 
                      ? 'border-yellow-200 bg-yellow-50 hover:scale-105' 
                      : 'border-gray-200 bg-gray-50/50 opacity-60'
                  }`}
                >
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <div className="text-xs font-medium text-gray-900">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
