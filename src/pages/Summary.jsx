import React, { useState } from "react";

const questions = [
  {
    question: "Which state is the largest producer of lignite coal in India?",
    options: ["Gujarat", "Jharkhand", "Tamil Nadu", "More than one of the above", "None of the above"],
    correctAnswer: "Tamil Nadu",
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
];

const Summary = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Handle answer selection
  const handleSelect = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
    }
  };

  // Handle Next Question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  // Handle Previous Question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  // Handle Quiz Submission
  const handleSubmit = () => {
    alert("Quiz submitted successfully!");
  };

  return (  <div className=" " >
    <div className="full-screen-black">
      <div className="shadow-xl rounded-lg p-3">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-3">
          <h2 className="text-[#f4f4f4] text-[28px] md:mt-4 leading-13 md:text-[40px] lg:text-[40px] font-extrabold md:leading-">
            Question <span className="text-[#fcbb38]">{currentQuestion + 1}</span>
          </h2>
        </div>

       
        <div>
          {/* Question */}
          <p className="mb-5 text-lg font-medium text-[#fcbb38]">{questions[currentQuestion].question}</p>

          {/* Options */}
          <div className="space-y-4 max-w-[500px]">
            {questions[currentQuestion].options.map((option, index) => {
              let optionStyle = "bg-[#80797918] text-white hover:text-black hover:bg-gray-200 border-gray-300";
              
             

              return (
                <label
                  key={index}
                  className={`flex items-center px-3 py-3 rounded-lg cursor-pointer transition-all ${optionStyle}`}
                  onClick={() => handleSelect(option)}
                >
                  <input type="radio" name="answer" value={option} className="hidden" />
                  <span className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center mr-3">
                    {selectedOption === option && <div className="w-3 h-3 bg-white rounded-full"></div>}
                  </span>
                  <span>{option}</span>
                </label>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between max-w-[500px] mt-12">
            <button
              className={`py-2 px-3 rounded-xl cursor-pointer font-semibold text-white text-lg transition-all ${
                currentQuestion > 0 ? "bg-blue-500 hover:bg-gray-600" : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            <button
              className={`py-2 px-3 rounded-lg cursor-pointer font-semibold text-white text-lg transition-all ${
                currentQuestion < questions.length - 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center max-w-[500px] mt-4">
            <button
              className={`mt-6 px-3 py-2 rounded-lg text-white font-semibold text-lg transition-all ${
                selectedOption ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              Submit Quiz
            </button>
          </div>
        </div>  
      </div>
    </div>
    </div>
  );
};

export default Summary;
