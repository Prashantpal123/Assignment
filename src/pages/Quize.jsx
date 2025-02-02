
import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [data, setData] = useState(null); // Use null instead of [] to match expected object shape
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10000);
  const  questions = [
    {
      question:
   ' data.questions[0]',
      options: ["Gujarat", "Jharkhand", "Tamil Nadu", "More than one of the above", "None of the above"],
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Rome"],
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
    },
  ];





  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const result = await response.json();
        setData(result); // Store API response in state
        setLoading(false); // Ensure loading is set to false
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
   console.log(data);
   
  }, [data]); // Log only when `data` updates
    // Timer Effect
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        alert("Time's up! Please select an answer.");
      }
    }, [timeLeft]);
  
    // Handle Next Question
    const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setTimeLeft(1); // Reset Timer
      }
    };
  
    // Handle Previous Question
    const handlePrevious = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
        setSelectedOption(null);
        setTimeLeft(25); // Reset Timer
      }
    };

  if (loading) return <p>Loading questions...</p>;
  
  if (error) return <p>Error: {error}</p>;

  return <>
   <div className="full-screen-black">
  <div className="   shadow-xl rounded-lg p-3">
    {/* Header */}
    <div className="flex justify-between items-center mb-5  pb-3">
  <h2 className='text-[#f4f4f4] text-[28px] md:mt-4 leading-13 md:text-[40px] lg:text-[40px] font-extrabold md:leading- '>Questions <span className='text-[#fcbb38]'> {currentQuestion + 1}</span> </h2>
      <div className="flex items-center space-x-4">

        <span className="text-gray-700 font-semibold text-lg">
          ⏳ {`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
        </span>
      </div>
    </div>

    {/* Timer Bar */}
    <div className="relative w-full bg-gray-200 h-1 rounded-full overflow-hidden mb-5">
      <div
        className="absolute h-full bg-blue-500 transition-all"
        style={{ width: `${(timeLeft / 25) * 100}%` }}
      ></div>
    </div>
     <div className=" lg: " >
    <div > 

    {/* Question */}
    <p className="mb-5 text-lg font-medium text-[#fcbb38]">{data.questions[currentQuestion].description}</p>

    {/* Options */}
    <div className="space-y-4 max-w-[500px]">
  {data.questions[currentQuestion].options.map((option, index) => (
    <label
      key={index}
      onClick={() => handleSelect(option)}
      className="flex items-center px-3 py-3 rounded-lg cursor-pointer transition-all"
    >
      <input type="radio" name="answer" value={option} className="hidden" />
      <span className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center mr-3">
        {selectedOption === option && <div className="w-3 h-3 bg-white rounded-full"></div>}
      </span>
      <span className="text-white">{option.description}</span>
    </label>
  ))}
</div>


    {/* Navigation Buttons */}
    <div className="flex justify-between max-w-[500px] mt-12">
      <button
        className={`py- px-3 rounded-xl cursor-pointer font-semibold text-white text-lg transition-all ${
          currentQuestion > 0 ? "bg-blue-500 hover:bg-gray-600" : "bg-gray-300 cursor-not-allowed"
        }`}
        onClick={handlePrevious}
        disabled={currentQuestion === 0}
      >
      Previous
      </button>

   

      <button
        className={`mx-8 py-2 px-5 rounded-lg cursor-pointer font-semibold text-white text-lg transition-all ${
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
      className={`mt-6 px-3 py-2  rounded-lg text-white font-semibold text-lg transition-all ${
        selectedOption ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
      }`}
      disabled={!selectedOption}
    >
      Submit Quize
    </button>
    </div>
    </div>
    </div>
  </div>
  </div></>;
};

export default Quiz;
