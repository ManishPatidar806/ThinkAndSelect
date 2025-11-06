import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Prevent from "../Auth/Prevent";
import { 
  Bot, 
  MessageCircle, 
  Sparkles, 
  Code2, 
  BookOpen, 
  Lightbulb,
  Zap,
  Brain,
  Clock,
  Star,
  Rocket,
  Cpu,
  Target,
  Users
} from "lucide-react";

const Chatbot = () => {
  console.log("Chatbot component is rendering");
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    let dest = new Date("Apr 30, 2025 23:59:59").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = dest - now;

      if (diff <= 0) {
        const nextMonthDate = new Date();
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 2);
        if (nextMonthDate.getMonth() === 0) {
          nextMonthDate.setFullYear(nextMonthDate.getFullYear() + 1);
        }
        dest = nextMonthDate.getTime();
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      );
      const hours = String(
        Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(
        2,
        "0"
      );

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: "Smart Conversations",
      description: "Engage with our AI assistant for personalized learning",
      color: "bg-blue-500"
    },
    {
      icon: Code2,
      title: "Code Assistance",
      description: "Get help with programming problems and debugging",
      color: "bg-green-500"
    },
    {
      icon: Brain,
      title: "Intelligent Tutoring",
      description: "Adaptive learning paths tailored to your progress",
      color: "bg-purple-500"
    },
    {
      icon: Zap,
      title: "Instant Answers",
      description: "Quick responses to your technical questions",
      color: "bg-yellow-500"
    }
  ];

  return (
    <>
      <Prevent />
      <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="py-[3%]">
          <Navbar />
        </div>
        
        <div className="py-[2%]">
          <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            {/* Main Coming Soon Card */}
            <div className="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl flex-col justify-end items-center lg:gap-20 md:gap-16 gap-10 inline-flex relative overflow-hidden">
              
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
              </div>

              <div className="relative z-10 flex-col justify-end items-center lg:gap-16 gap-10 flex">
                
                {/* Header Section */}
                <div className="flex-col justify-center items-center gap-8 flex">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                      <span className="text-purple-400 font-medium">AI Powered</span>
                    </div>
                  </div>
                  
                  <div className="flex-col justify-start items-center gap-4 flex">
                    <h1 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 md:text-6xl text-5xl font-bold leading-normal">
                      AI Chatbot
                    </h1>
                    <h2 className="text-center text-white md:text-3xl text-2xl font-semibold">
                      Coming Soon
                    </h2>
                    <p className="text-center text-gray-300 text-lg leading-relaxed max-w-2xl">
                      Get ready for the most advanced AI programming assistant! 
                      Our intelligent chatbot will revolutionize how you learn and code.
                    </p>
                  </div>

                  {/* Countdown Timer */}
                  <div className="flex items-start justify-center w-full gap-4 count-down-main mt-8">
                    {["days", "hours", "minutes", "seconds"].map((unit, index) => (
                      <React.Fragment key={unit}>
                        <div className="timer flex flex-col gap-2 bg-gradient-to-b from-gray-700 to-gray-800 p-4 rounded-xl border border-gray-600 shadow-lg">
                          <h3 className="countdown-element text-center text-white text-3xl font-bold leading-9">
                            {timeLeft[unit]}
                          </h3>
                          <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-wider">
                            {unit}
                          </p>
                        </div>
                        {index < 3 && (
                          <div className="flex items-center justify-center h-full pt-4">
                            <span className="text-gray-500 text-2xl font-bold">:</span>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Features Preview */}
                  <div className="w-full max-w-4xl mt-12">
                    <h3 className="text-white text-xl font-semibold text-center mb-8">
                      What to Expect
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {features.map((feature, index) => (
                        <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 group">
                          <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                          <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Email Notification Section */}
                  <div className="w-full flex-col justify-center items-center gap-6 flex mt-12">
                    <div className="text-center space-y-2">
                      <h6 className="text-purple-400 text-lg font-semibold">
                        🚀 Expected Launch: April 2027
                      </h6>
                      <p className="text-gray-400 text-sm">
                        Be the first to experience the future of AI-powered learning
                      </p>
                    </div>
                    
                    <div className="justify-center items-center gap-3 flex sm:flex-row flex-col w-full max-w-md">
                      <input
                        type="email"
                        className="flex-1 focus:outline-none px-4 py-3 shadow-lg text-gray-900 placeholder-gray-500 text-sm leading-relaxed bg-white/95 backdrop-blur-sm rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                        placeholder="Enter your email for updates..."
                      />
                      <Button className="sm:w-auto w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 rounded-xl shadow-lg flex justify-center items-center group">
                        <Rocket className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="text-white text-sm font-semibold whitespace-nowrap">
                          Notify Me
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="relative z-10 text-center">
                <p className="text-gray-400 text-sm leading-snug">
                  Questions? Reach out to us at{" "}
                  <a
                    href="mailto:manishpatidar306906@gmail.com"
                    className="text-purple-400 hover:text-purple-300 transition-all duration-300 underline"
                  >
                    manishpatidar306906@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Personalized Learning</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  AI that adapts to your learning style and programming skill level.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Cpu className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Advanced AI</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Powered by cutting-edge machine learning for accurate responses.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Community Driven</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Learn from community insights and collaborative problem-solving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chatbot;