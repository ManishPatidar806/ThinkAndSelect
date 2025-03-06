// LoadingPage.js
import React, { useState } from 'react';
import { useEffect } from 'react';

const MainLoading = () => {

    const [loadingText, setLoadingText] = useState("Please Wait! We're processing your request...");
  
    useEffect(() => {
      const messages = [
        "Please Wait! We're processing your request...",
        "This may take a moment, but it's worth the wait...",
        "Just a little longer, we’re preparing your account...",
        "Almost there! We're setting things up for you...",
        "Good things take time! We're almost done...",
        "Thanks for your patience! We’re almost ready...",
        "Almost there, just a few more steps!",
        "One step away from getting started, please hold on!",
        "Everything's set!",
        
      ];
  
      let messageIndex = 0;
  
      const intervalId = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setLoadingText(messages[messageIndex]);
      }, 20000); 
 
      return () => clearInterval(intervalId);
    }, []);


    return (
        <div  style={{ backgroundColor: "#EEF2FF" }} className=" flex items-center justify-center min-h-screen font-roboto">
            <div className="text-center">
                <div className="mb-4">
                    <i className="fas fa-spinner fa-spin text-6xl text-blue-500"></i>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h1>
                <p className="text-gray-600 text-xl">{loadingText}</p>
            </div>
        </div>
    );
};

export default MainLoading;
