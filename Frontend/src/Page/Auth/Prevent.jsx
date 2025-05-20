import { useEffect } from "react";

const Prevent = () => {
  useEffect(() => {
    const handlePopState = (event) => {
      
      window.history.pushState(null, document.title, window.location.href);
    };

   
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handlePopState);


    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
};

export default Prevent;
