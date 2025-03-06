import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const menu = [
    {
      name: "Quizs",
      path: "/home",
    },
    {
      name: "Notes",
      path: "/notes",
    },
    {
      name: "Tutorial",
      path: "/tutorial",
    },
    {
      name: "Chatbot",
      path: "/chatbot",
    },
    {
      name: "Code Editor",
      path: "/editer",
    },

    {
      name: "Profile",
      path: "/profile",
    },
  ];
  const navigate = useNavigate();
  function execuiton(path) {
    navigate(path);
  }

 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const handleMenuToggle = () => {
  setIsMenuOpen(!isMenuOpen);
};

  return ( 
    <div>

<div className="flex flex-row-reverse mr-5">
         <button
           onClick={handleMenuToggle}
           type="button"
           className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-indigo-50 bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
           aria-controls="navbar-sticky"
           aria-expanded={isMenuOpen ? 'true' : 'false'}
         >
           <span className="sr-only">Open main menu</span>
           <svg
             className="w-5 h-5"
             aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 17 14"
           >
             <path
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d="M1 1h15M1 7h15M1 13h15"
             />
           </svg>
         </button>
       </div>

       <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}
          id="navbar-sticky"
        >
          <div className="flex w-[100%] justify-center" >
      <div className=" list-none w-[100%] md:w-auto rounded-md p-4 m-4 md:0   md:rounded-full md:flex md:justify-evenly  bg-indigo-100  md:bg-white" >
        
          {menu.map((item, i) => (
            <Button
              variant="link"
              className="no-underline text-black md:text-xl normal-case bg-transparent px-8 block w-full hover:bg-indigo-200  md:hover:bg-transparent "
              key={i}
              onClick={() => execuiton(item.path)}
            >
              {item.name}
            </Button>
          ))}
       
      </div></div></div>
    </div>
  );
};

export default Navbar;
