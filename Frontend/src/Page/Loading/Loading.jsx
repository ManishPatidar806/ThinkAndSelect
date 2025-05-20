// LoadingPage.js
import React from 'react';

const Loading = () => {
    return (
        <div  style={{ backgroundColor: "#EEF2FF" }} className=" flex items-center justify-center min-h-screen font-roboto">
            <div className="text-center">
                <div className="mb-4">
                    <i className="fas fa-spinner fa-spin text-6xl text-blue-500"></i>
                </div>
                <h1 className="text-2xl font-bold text-gray-700 mb-2">Loading...</h1>
                <p className="text-gray-500">Please wait while we load the content for you.</p>
            </div>
        </div>
    );
};

export default Loading;
