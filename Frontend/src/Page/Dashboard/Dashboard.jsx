import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Prevent from "../Auth/Prevent";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  const headingstyle = {
    background: "linear-gradient(45deg, #0062ff, #ba01fe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const mystyle = {
    backgroundImage:
      "url('https://res.cloudinary.com/dgmsfmeaz/image/upload/v1731086237/KnowledgeTest/jkdzeblre7wzoonzggew.jpg')",
    height: "100%",
    width: "100%",
  };

  return (
    <div
      className="top-0 left-0 min-w-screen flex justify-center items-center  min-h-screen bg-cover bg-center "
      style={mystyle}
    >
      <Prevent />
      <div className="   min-h-fit py-[2%] my-[3%] bg-black opacity-80  ">
        <div className="text-8xl text-white ">
          <div className="text-center font-serif" style={headingstyle}>Think And Select</div>
          <div className="text-2xl  mt-8 mx-[7%] text-center ">
            The ultimate WebApplication for coding enthusiasts and aspiring
            programmers! Designed specifically for those who want to test and
            improve their programming skills, our WebApplication offers a range
            of quizzes focused on various programming languages and concepts,
            from beginner to advanced levels.
          </div>

          <div className="flex justify-center">
            <Button
              className="m-10 p-5 h-12 w-auto text-2xl  "
              onClick={handleRedirect}
            >
              <span>
                <strong>Let's Go </strong>{" "}
              </span>
              <i className="fas fa-arrow-right ml-2 "></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
