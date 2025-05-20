import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    let dest = new Date("Mar 31, 2024 23:59:59").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = dest - now;

      if (diff <= 0) {
        const nextMonthDate = new Date();
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        if (nextMonthDate.getMonth() === 0) {
          nextMonthDate.setFullYear(nextMonthDate.getFullYear() + 1);
        }
        dest = nextMonthDate.getTime();
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      );
      const hours = String(
        Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(
        2,
        "0"
      );

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" relative min-h-screen " style={{ backgroundColor: "#EEF2FF" }}>
    <div className="py-[3%]">
    <Navbar/>
    </div>
      <div className="py-[3%]">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 bg-gray-900 rounded-2xl flex-col justify-end items-center lg:gap-28 md:gap-16 gap-10 inline-flex">
          <div className="flex-col justify-end items-center lg:gap-16 gap-10 flex">
         
            <div className="flex-col justify-center items-center gap-10 flex">
              <div className="flex-col justify-start items-center gap-2.5 flex">
                <h2 className="text-center text-purple-500 md:text-6xl text-5xl font-bold leading-normal">
                  Coming Soon
                </h2>
                <p className="text-center text-gray-500 text-base leading-relaxed">
                  Just few days remaining until the big reveal of our new
                  product!
                </p>
              </div>
              <div className="flex items-start justify-center w-full gap-2 count-down-main">
                {["days", "hours", "minutes", "seconds"].map((unit, index) => (
                  <React.Fragment key={unit}>
                    <div className="timer flex flex-col gap-0.5">
                      <h3
                        className={`countdown-element ${unit} text-center text-white text-2xl font-bold leading-9`}
                      >
                        {timeLeft[unit]}
                      </h3>
                      <p className="text-center text-gray-500 text-xs leading-normal w-full">
                        {unit.toUpperCase().slice(0, 3)}
                      </p>
                    </div>
                    {index < 3 && (
                      <h3 className="w-3 text-center text-gray-500 text-2xl font-medium leading-9">
                        :
                      </h3>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full flex-col justify-center items-center gap-5 flex">
                <h6 className="text-center text-purple-500 text-base font-semibold leading-relaxed">
                  Launched Date: July 23, 2025
                </h6>
                <div className="justify-center items-center gap-2.5 flex sm:flex-row flex-col">
                  <input
                    type="text"
                    className="w-80 focus:outline-none px-3.5 py-2 shadow-md text-gray-900 placeholder-gray-400 text-sm leading-relaxed h-10 bg-white rounded-lg border border-gray-200"
                    placeholder="Type your mail..."
                  />
                  <Button className="sm:w-fit w-full px-3.5 py-2 bg-purple-500 hover:bg-purple-600 transition-all duration-700 ease-in-out rounded-lg shadow-md flex justify-center items-center">
                    <span className="px-1.5 text-gray-900 text-sm font-medium leading-6 whitespace-nowrap">
                      Notify Me
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm leading-snug">
            Get in touch with us:{" "}
            <a
              href="manishpatidar306906@gmail.com"
              className="hover:text-gray-100 transition-all duration-700 ease-in-out"
            >
              manishpatidar306906@gmail.com
            </a>
          </p>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ComingSoon;
