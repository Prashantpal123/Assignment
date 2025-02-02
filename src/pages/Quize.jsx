import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const location = useLocation();
  const { formData } = location.state;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(formData.time * 60);
  const [score, setScore] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const navigate = useNavigate();
   const name=formData.name;
const handleSubmit = () => {
  navigate("/result", { state: { score, timeLeft,name   }  });
};

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

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

  const handleSelect = (option) => {

    
   
    setUserAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      const prevSelected = newAnswers[currentQuestion];

      if (prevSelected && prevSelected.is_correct) {
        setScore((prevScore) => prevScore - 1);
      }

      newAnswers[currentQuestion] = option;

      if (option.is_correct) {
        setScore((prevScore) => prevScore + 1);
      } 
      console.log(score);
      

      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestion < data.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div key={currentQuestion} className="full-screen-black">
      <div className="shadow-xl rounded-lg p-3">
        <div className="flex justify-between items-center mb-5 pb-3">
          <h2 className="text-[#f4f4f4] text-[28px] font-extrabold">
            Questions <span className="text-[#fcbb38]"> {currentQuestion + 1}</span>
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-semibold text-lg">
              ⏳ {`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
            </span>
          </div>
        </div>

        <div className="relative w-full bg-gray-200 h-1 rounded-full overflow-hidden mb-5">
          <div
            className="absolute h-full bg-blue-500 transition-all"
            style={{ width: `${(timeLeft / (formData.time * 60)) * 100}%` }}
          ></div>
        </div>

        <div>
          <p className="mb-5 text-lg font-medium text-[#fcbb38]">
            {data.questions[currentQuestion].description}
          </p>

          <div className="space-y-4 max-w-[500px]">
            {data.questions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                onClick={() => handleSelect(option)}
                className={`flex items-center px-3 py-3 rounded-lg cursor-pointer transition-all ${
                  userAnswers[currentQuestion] === option
                    ? "bg-blue-900 text-white"
                    : "bg-[#80797918] text-white"
                } hover:bg-blue-500 hover:text-black`}
              >
                <input type="radio" name="answer" value={option} className="hidden" />
                <span
                  className={`w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center mr-3 ${
                    userAnswers[currentQuestion] === option ? "bg-white" : ""
                  }`}
                >
                  {userAnswers[currentQuestion] === option && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </span>
                <span>{option.description}</span>
              </label>
            ))}
          </div>

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
              className={`mx-8 py-2 px-5 rounded-lg cursor-pointer font-semibold text-white text-lg transition-all ${
                currentQuestion < data.questions.length - 1
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={handleNext}
              disabled={currentQuestion === data.questions.length - 1}
            >
              Next
            </button>
          </div>

          <div className="flex justify-center max-w-[500px] mt-4">
            <button onClick={handleSubmit}
              className={`mt-6 px-3 py-2 rounded-lg text-white font-semibold text-lg transition-all ${
                userAnswers[currentQuestion] ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!userAnswers[currentQuestion]}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
