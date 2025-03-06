import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactCanvasConfetti from "react-canvas-confetti";
import Prevent from "../Auth/Prevent";
import Loading from "../Loading/Loading";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

let animationInstance = null;

const ExamPassed = () => {
  const score = localStorage.getItem("marks");
  const totalQuestion = localStorage.getItem("totalQuestion");
  const naviagte = useNavigate();
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const makeShot = (particleRatio, opts) => {
    animationInstance &&
      animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(2500 * particleRatio),
      });
  };

  const fire = () => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
      decay: 0.95,
      duration: 2000,
    });

    makeShot(0.2, {
      spread: 60,
      decay: 0.95,
      duration: 2000,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      duration: 2500,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      duration: 2500,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
      decay: 0.95,
      duration: 3000,
    });
  };

  const getInstance = (instance) => {
    animationInstance = instance;
  };

  function execute() {
    naviagte("/home");
  }

  const handleSubmit = () => {
    const fetchpdf = async () => {
      const token = localStorage.getItem("token");
      try {
        setIsLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/generate-certificate`,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          setIsLoading(false);
          const errorData = await response
            .json()
            .catch(() => ({ message: "Unknown error" }));
          
          const errorMessage = errorData.message || "Server error";
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorMessage}`
          );
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
        window.URL.revokeObjectURL(url);
       

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error generating certificate:", error);
      }
    };
    fetchpdf();
  };

  useEffect(() => {
    if (score && totalQuestion) {
      setPercentage((score / totalQuestion) * 100);
    }
    fire();
  }, [score, totalQuestion]);

  if (isLoading) {
    return <Loading />;
  }
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div
      className="flex items-center justify-center min-h-screen "
      style={{ backgroundColor: "#EEF2FF" }}
    >
      <Prevent />
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">
            <span role="img" aria-label="party popper">
              🎉
            </span>{" "}
            Congratulations. You passed!
          </div>
          <p className="text-gray-400 ">
            You are successfully completed the quiz. Now you click on finish and
            back to your home page OR Click on generate and view your
            Certificate.
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
            <p>Passing Score: 80%</p>
          </div>
          <div className="flex justify-evenly space-x-4">
            <button
              onClick={execute}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Finish
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
};

export default ExamPassed;
