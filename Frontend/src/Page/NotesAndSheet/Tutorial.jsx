
import TutorialData from "../data/TutorialData";
import Navbar from "../Home/Navbar";


const Tutorial = () => {
  return (
    <div style={{ backgroundColor: "#EEF2FF" }}>
      <div className="py-[3%]">
        <Navbar />
      </div>

      <div
        className="grid  grid-cols-1   lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 
      gap-4 md:mx-[5%]  mt-5 "
      >
        {TutorialData.map((item, i) => (
          <div
            key={i}
            className="min-w-sm m-5 pb-10 rounded overflow-hidden shadow-lg  text-white relative "
            style={{ backgroundColor: "#EEF5FF" }}
          >
            <img
              className="w-full"
              src={item.image}
              alt="A desk setup with a laptop, lamp, and plant"
            />
            <div className="px-6 py-4 pb-7 text-start ">
              <div className="font-bold text-xl text-black mb-2">
                Content: {item.name}
              </div>
              <p className="text-gray-900 text-base">
                Channel : {item.channel}
              </p>
            </div>
            <div className="px-6 pt-4 pb-5 absolute bottom-0">
              <a href={item.link}>
                <button className="bg-purple-600  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex justify-start items-center ">
                  <span>Play</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
