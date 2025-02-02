import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userAnswers, accuracy, data, name, score, attemptedQuestions, timeLeft, testsize } = location.state || {};

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#000000]">
      <div className="shadow-xl rounded-lg p-3">
        <h2 className="text-[#f4f4f4] text-[28px] font-extrabold mb-5"> 📊 Quiz Summary</h2>
        <p className="text-lg text-[#fcbb38]">👤 Name: {name}</p>
        <p className="text-lg text-[#fcbb38]">🎯 Score: {score} / {testsize}</p>
        <p className="text-lg text-[#fcbb38]"> ✅ Attempted Questions: {attemptedQuestions} / {testsize}</p>
        <p className="text-lg text-[#fcbb38]">⚡ Time Left: {timeLeft} seconds</p>
        <p className="text-lg text-[#fcbb38]">⚡ Accuracy: {accuracy} %</p>
        {data?.questions.map((question, index) => (
          <div key={index} className="mb-5 mt-16">
            <p className="text-lg font-medium text-white">{index + 1}. {question.description}</p>
            <div className="space-y-2 max-w-[500px] mt-4">
              {question.options.map((option, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    userAnswers[index] === option
                      ? option.is_correct
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : option.is_correct
                      ? "bg-green-900 text-white"
                      : "bg-[#80797918] text-white"
                  }`}
                >
                  {option.description}

                 
                </div> 
            
              ))}
             
            </div>
            <hr className="text-white mt-6" />
          </div>
        ))}

        <div className="flex justify-center max-w-[500px] mt-4">
          <button
            onClick={handleBackToHome}
            className="mt-6 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg"
          >
          Start New Quize
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
