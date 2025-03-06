
import { useNavigate } from "react-router-dom";
import Prevent from "../Auth/Prevent";

const Failed = () => {
  const score = localStorage.getItem("marks");
  const naviagte = useNavigate();
  const percentage = localStorage.getItem("percentage");

  function execute() {
    naviagte("/home");
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen "
      style={{ backgroundColor: "#EEF2FF" }}
    >
      <Prevent/>
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">
            You have not passed! Try again Later
          </div>
          <p className="text-gray-400 ">
            You are successfully completed the quiz. Now you click on finish and
            back to your home page.
          </p>
          <div className="text-gray-400 mb-6">
            <p>
              Your Score:{" "}
              <span className="text-white">
                {percentage}% ({score} points)
              </span>
            </p>
            <p>Passing Score: 80%</p>
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

export default Failed;
