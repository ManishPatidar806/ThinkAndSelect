import NotesData from "../data/NotesData";
import Navbar from "../Home/Navbar";

const Notes = () => {

  return (
    <div style={{ backgroundColor: "#EEF2FF" }}>
      <div className="py-[3%]">
        <Navbar />
      </div>

      <div
        className="grid  grid-cols-1   lg:grid-cols-3 2xl:grid-cols-4
      sm:grid-cols-2 
      
      gap-4 md:mx-[2.5%]  mt-5 "
      >
        {NotesData.map((item, i) => (
          <div
            key={i}
            className="min-w-sm md:min-w-md m-5 pb-10 rounded overflow-hidden shadow-lg  text-white bg-indigo-100 relative"
          >
            <img
              className="w-full h-[50%]"
              src={item.image}
              alt="A desk setup with a laptop, lamp, and plant"
            />
            <div className="px-6 py-4 pb-7 text-start  lg:px-1   xl:px-6">
              <div className="font-bold text-xl text-black mb-2">
                {item.name}
              </div>
              <p className="text-gray-900 text-base">{item.description}</p>
            </div>
            <div className="px-6 pt-4 pb-5 absolute bottom-0 lg:-bottom-2 xl:bottom-0">
              <a href={item.link}>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex justify-start items-center ">
                  <span>Open</span>
                  <i className="fas fa-arrow-right ml-2 "></i>
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
