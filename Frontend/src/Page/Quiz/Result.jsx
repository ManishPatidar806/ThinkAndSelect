
import { useNavigate } from "react-router-dom";
import Prevent from "../Auth/Prevent";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Home, 
  RotateCcw, 
  Target, 
  CheckCircle, 
  XCircle, 
  Award,
  BookOpen,
  ArrowRight,
  Share2
} from "lucide-react";

const Result = () => {
  const score = localStorage.getItem("marks");
  const navigate = useNavigate();
  const percentage = parseFloat(localStorage.getItem("percentage")) || 0;
  const totalQuestions = localStorage.getItem("totalQuestion") || 10;
  const quizType = localStorage.getItem("type") || "quiz";

  function goHome() {
    navigate("/home");
  }

  function retakeQuiz() {
    navigate("/practicequiz");
  }

  // Determine result status
  const isExcellent = percentage >= 90;
  const isGood = percentage >= 70;
  const isPassed = percentage >= 50;

  const getResultMessage = () => {
    if (isExcellent) return "Excellent Work!";
    if (isGood) return "Great Job!";
    if (isPassed) return "Well Done!";
    return "Keep Learning!";
  };

  const getResultIcon = () => {
    if (isExcellent) return <Trophy className="w-12 h-12 text-yellow-500" />;
    if (isGood) return <Award className="w-12 h-12 text-blue-500" />;
    if (isPassed) return <CheckCircle className="w-12 h-12 text-green-500" />;
    return <Target className="w-12 h-12 text-orange-500" />;
  };

  const getResultColor = () => {
    if (isExcellent) return "from-yellow-400 to-amber-500";
    if (isGood) return "from-blue-400 to-indigo-500";
    if (isPassed) return "from-green-400 to-emerald-500";
    return "from-orange-400 to-red-500";
  };

  const getBgGradient = () => {
    if (isExcellent) return "from-yellow-50 via-white to-amber-50";
    if (isGood) return "from-blue-50 via-white to-indigo-50";
    if (isPassed) return "from-green-50 via-white to-emerald-50";
    return "from-orange-50 via-white to-red-50";
  };

  // Circle progress calculation
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBgGradient()}`}>
      <Prevent />
      
      {/* Navigation */}
      <div className="py-4 lg:py-6">
        <Navbar />
      </div>

      {/* Result Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-8">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Practice Quiz Complete</span>
          </div>

          {/* Main Result Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-2xl mx-auto">
            {/* Header Section */}
            <div className={`bg-gradient-to-r ${getResultColor()} p-8 text-white`}>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
                  {getResultIcon()}
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold">
                  {getResultMessage()}
                </h1>
                <p className="text-white/90 text-lg">
                  You've completed the {quizType.toUpperCase()} practice quiz
                </p>
              </div>
            </div>

            {/* Score Section */}
            <div className="p-8 space-y-8">
              {/* Circular Progress */}
              <div className="flex justify-center">
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r={radius}
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className={`text-gradient-to-r ${getResultColor().split(' ')[0].replace('from-', '')} transition-all duration-1000 ease-out`}
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r={radius}
                      cx="64"
                      cy="64"
                      style={{
                        stroke: isExcellent ? '#eab308' : isGood ? '#3b82f6' : isPassed ? '#10b981' : '#f97316'
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">
                      {Math.round(percentage)}%
                    </span>
                    <span className="text-sm text-gray-600">Score</span>
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{score}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{totalQuestions - score}</div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>

              {/* Performance Message */}
              <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {isPassed 
                    ? "Congratulations! You've successfully completed this practice quiz. Keep up the great work!"
                    : "Don't worry! Practice makes perfect. Review the topics and try again to improve your score."
                  }
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={retakeQuiz}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </button>
                <button
                  onClick={goHome}
                  className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-purple-300 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Share Section */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-3">Share your achievement!</p>
                <button className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm">
                  <Share2 className="w-4 h-4" />
                  Share Result
                </button>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => navigate("/notes")}
                className="p-4 text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors group"
              >
                <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
                <div className="font-medium text-blue-900">Study Notes</div>
                <div className="text-sm text-blue-700">Review study materials</div>
              </button>
              <button 
                onClick={() => navigate("/certificationquiz")}
                className="p-4 text-left bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors group"
              >
                <Trophy className="w-6 h-6 text-amber-600 mb-2" />
                <div className="font-medium text-amber-900">Take Certification</div>
                <div className="text-sm text-amber-700">Ready for the exam?</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Result;
