
import { useNavigate } from "react-router-dom";
import Prevent from "../Auth/Prevent";

const Result = () => {
  const score = localStorage.getItem("marks");
  const naviagte = useNavigate();
  const percentage = localStorage.getItem("percentage");

  function execute() {
    naviagte("/home");
  }

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div
      className="flex items-center justify-center min-h-screen "
      style={{ backgroundColor: "#EEF2FF" }}
    >
      <Prevent/>
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">
            <span role="img" aria-label="party popper">
              🎉
            </span>{" "}
            Congratulations!
          </div>
          <p className="text-gray-400 ">
            You are successfully completed the quiz. Now you click on finish and
            back to your home page.
          </p>
          <div className="flex justify-center items-center m-3">
            <div className="relative">
              <svg className="w-16 h-16">
                <circle
                  className="text-gray-600"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r={radius}
                  cx="50%"
                  cy="50%"
                />
                <circle
                  className="text-green-600"
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r={radius}
                  cx="50%"
                  cy="50%"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                {percentage}%
              </span>
            </div>
          </div>
          <div className="text-gray-400 mb-6">
            <p>
              Your Score:{" "}
              <span className="text-white">
                {percentage}% ({score} points)
              </span>
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={execute}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
