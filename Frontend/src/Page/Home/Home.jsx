import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Data from "../data/QuizData";
import Prevent from "../Auth/Prevent";

const Home = () => {
  const navigate = useNavigate();

  function executionPractice(type) {
    
    localStorage.removeItem("type");
    localStorage.setItem("type", type);
    navigate("/practicequiz");
    
  }

  function executionCertificate(type) {
    localStorage.removeItem("type");
    localStorage.setItem("type", type);

    navigate("/certificationquiz");
    
  }

  return (
    <div style={{ backgroundColor: "#EEF2FF" }}>
      <Prevent />
      <div className="py-[3%]">
        <Navbar />
      </div>

      <div
        className="grid  grid-cols-1   lg:grid-cols-3 2xl:grid-cols-4
      sm:grid-cols-2 
      
      gap-4 md:mx-[5%]  mt-5 "
      >
        {Data.map((item, i) => (
          <div
            key={i}
            className="min-w-sm  m-5 pb-5  rounded overflow-hidden shadow-lg  bg-blue-100 text-white relative"
          >
            <img
              className="w-full h-[40%]"
              src={item.image}
              alt="A desk setup with a laptop, lamp, and plant"
            />
            <div className="px-6 py-4 text-start">
              <div className="font-bold text-black text-xl mb-2">
                {item.name}
              </div>
              <p className="text-black text-base">{item.description}</p>
            </div>
            <div className="absolute w-full bottom-0">
              <div className="px-6 pt-4 pb-5 flex justify-between ">
                <button
                  className="bg-purple-600  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded  "
                  onClick={() => {
                    executionPractice(item.type);
                  }}
                >
                  <span>Practice</span>
                </button>
                <button
                  className="bg-purple-600  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded  "
                  onClick={() => {
                    executionCertificate(item.type);
                  }}
                >
                  <span>Exam</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
