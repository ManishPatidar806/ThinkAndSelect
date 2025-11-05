import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { useNavigate } from "react-router-dom";
import Prevent from "../Auth/Prevent";
import Loading from "../Loading/Loading";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

const PracticeQuiz = () => {
  const [question, setQuestion] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [marks, setMarks] = useState(0);
  const [totalquestion, setTotalQuestion] = useState(0);
  const [submitedAnswer, setSubmitedAnswer] = useState("");
  const navigate = useNavigate();
  const [checked, setChecked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const url  = import.meta.env.VITE_API_URL;
  useEffect(() => {
    setIsLoading(true);
    const fetchdata = async () => {
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("type");
      console.log(token);

      const response = await fetch(
        `${url}/v1/api/quiz/question/practicequestion?type=${encodeURIComponent(
          type
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        setIsLoading(false);
        navigate("/home");
      }
      if (response.ok) {
        const data = await response.json().then((data) => {
          setQuestion(data.questions);
          setIsLoading(false);
        });
      }
    };

    fetchdata();
  }, []);

  const currentQuestion = question[currentQuestionIndex];

  function setoption(option) {
    setSubmitedAnswer(option);
    setChecked(option);
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${url}/v1/api/quiz/question/checkpracticeanswer?answer=${encodeURIComponent(
        checked
      )}&id=${encodeURIComponent(currentQuestion?.questionId)}`,
      {
        method: "get",
        headers: {
          Authorization: token,
        },
      }
    );
    if (!response.ok) {
      setIsLoading(false);
    }

    const data = await response.json();

    if (data.answer) {
      setMarks((prevMarks) => prevMarks + 1);
    }

    setTotalQuestion((prev) => prev + 1);
    setIsLoading(false);
    if (totalquestion + 1 === 10) {
      localStorage.setItem("marks", marks);
      localStorage.setItem("totalQuestion", totalquestion + 1);

      let percentage = (marks / (totalquestion + 1)) * 100;
      localStorage.setItem("percentage", percentage);
      navigate("/result");
    }
    setCurrentQuestionIndex((prev) => prev + 1);
    setChecked(null);
    setSubmitedAnswer("");
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Prevent />
      
      {/* Navigation */}
      <div className="py-4 lg:py-6">
        <Navbar />
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          {/* Quiz Type Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Practice Quiz</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {currentQuestion?.type?.toUpperCase()} 
            <span className="block text-2xl lg:text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mt-2">
              Practice Session
            </span>
          </h1>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Question {totalquestion + 1} of 10</span>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Question Section */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-100 text-purple-700 px-3 py-1">
                    Question {totalquestion + 1}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 leading-relaxed">
                    {currentQuestion?.question}
                  </h2>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((totalquestion + 1) / 10) * 100}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-gray-600">
                  {Math.round(((totalquestion + 1) / 10) * 100)}% Complete
                </p>
              </div>
            </div>

            {/* Options Section */}
            <div className="p-8 lg:p-12">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Choose the correct answer:</h3>
                
                <div className="space-y-4">
                  {currentQuestion?.options?.map((option, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="quiz-option"
                        value={option}
                        className="hidden peer"
                        checked={checked === option}
                        onChange={() => setoption(option)}
                        required
                      />
                      <label
                        htmlFor={`option-${index}`}
                        className="group flex items-center w-full p-4 text-gray-700 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-200 peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700"
                      >
                        <div className="flex items-center gap-4 w-full">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-medium group-hover:border-purple-400 peer-checked:border-purple-500 peer-checked:bg-purple-500 peer-checked:text-white transition-all duration-200">
                            {checked === option ? (
                              <CheckCircle className="w-5 h-5 text-purple-500" />
                            ) : (
                              String.fromCharCode(65 + index)
                            )}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={!checked}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    Submit Answer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PracticeQuiz;
