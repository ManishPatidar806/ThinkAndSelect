import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { useNavigate } from "react-router-dom";
import Prevent from "../Auth/Prevent";
import Loading from "../Loading/Loading";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, CheckCircle, AlertCircle, ArrowRight, Award } from "lucide-react";

const CertificationQuiz = () => {
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

      const response = await fetch(
        `${url}/v1/api/quiz/question/certificatequiz?type=${encodeURIComponent(
          type
        )}`,
        {
          method: "get",
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json().then((data) => {
          console.log(data);
          setIsLoading(false);
          setQuestion(data.questions);
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
      `${url}/v1/api/quiz/question/checkcertificateanswer?answer=${encodeURIComponent(
        checked
      )}&id=${encodeURIComponent(currentQuestion?.questionId)}`,
      {
        method: "get",
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await response.json();

    if (data.answer) {
      setMarks((prevMarks) => prevMarks + 1);
    }
    setIsLoading(false);
    setTotalQuestion((prev) => prev + 1);
    if (totalquestion + 1 === 20) {
      setIsLoading(true);
      localStorage.setItem("marks", marks);
      localStorage.setItem("totalQuestion", totalquestion + 1);

      let percentage = (marks / (totalquestion + 1)) * 100;
      localStorage.setItem("percentage", percentage);
      setIsLoading(false);
      if (percentage >= 80.0) {
        navigate("/exampassed");
      } else {
        navigate("/failed");
      }
    }
    setCurrentQuestionIndex((prev) => prev + 1);
    setChecked(null);
    setSubmitedAnswer("");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Prevent />
      
      {/* Navigation */}
      <div className="py-4 lg:py-6">
        <Navbar />
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          {/* Quiz Type Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">Certification Exam</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {currentQuestion?.type?.toUpperCase()} 
            <span className="block text-2xl lg:text-3xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mt-2">
              Certification Exam
            </span>
          </h1>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Question {totalquestion + 1} of 20</span>
            </div>
            <div className="flex items-center gap-2 text-amber-600">
              <Award className="w-4 h-4" />
              <span>80% to Pass</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Question Section */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-amber-50 to-orange-50">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-100 text-amber-700 px-3 py-1">
                    Question {totalquestion + 1}
                  </Badge>
                  <Badge className="bg-red-100 text-red-700 px-3 py-1">
                    Certification
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 leading-relaxed">
                    {currentQuestion?.question}
                  </h2>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((totalquestion + 1) / 20) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-600">
                    {Math.round(((totalquestion + 1) / 20) * 100)}% Complete
                  </p>
                  <p className="text-amber-600 font-medium">
                    {20 - (totalquestion + 1)} questions remaining
                  </p>
                </div>

                {/* Warning Alert */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> You need 80% or higher to pass this certification exam.
                    </p>
                  </div>
                </div>
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
                        className="group flex items-center w-full p-4 text-gray-700 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-200 peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:text-amber-700"
                      >
                        <div className="flex items-center gap-4 w-full">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-medium group-hover:border-amber-400 peer-checked:border-amber-500 peer-checked:bg-amber-500 peer-checked:text-white transition-all duration-200">
                            {checked === option ? (
                              <CheckCircle className="w-5 h-5 text-amber-500" />
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
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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

export default CertificationQuiz;
