import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    ques_num: '',
  });

  const navigate = useNavigate(); // Hook for navigation

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update based on input name
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect and pass formData (including name, time, and number of questions) using state
    navigate('/quize', { state: { formData } });
  };

  return (
    <div className="full-screen-black">
      <div className="flex justify-center mx-2">
        <div className="mt-20 md:mt-12">
          <p className="text-[#fcbb38] font-[700] md:text-[20px]">
            Hello <span className="text-[#f4f4f4] font-[700]">!</span>
          </p>
          <h1 className="text-[#f4f4f4] text-[28px] md:mt-4 leading-13 md:text-[60px] lg:text-[60px] font-extrabold md:leading-">
            Welcome to <span className="text-[#fcbb38]">Quize-Zone</span>
          </h1>
        </div>
      </div>

      <div className="px-4 mt-8 md:mt-8 flex items-center justify-center">
        <div className="rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center mb-4 text-[#f4f4f4]">
            Quiz Settings
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-8 max-w-[400px] bg-[#f4f4f4] p-2 rounded-2xl"
          >
            <div className="mx-3">
              <label className="block font-[700]">Your Name</label>
              <input
                type="text"
                name="name" // Ensure this matches with the formData key
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full font-semibold mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div className="mx-3">
              <label className="block font-[700]">Number of Questions</label>
              <input
                type="number"
                name="ques_num" // Ensure this matches with the formData key
                value={formData.ques_num}
                onChange={handleChange}
                min="1"
                max="10"
                required
                className="w-full mt-1 p-2 font-semibold border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="mx-3">
              <label className="block font-[700]">Time Limit (minutes)</label>
              <input
                type="number"
                name="time" // Ensure this matches with the formData key
                value={formData.time}
                onChange={handleChange}
                min="1"
                max="60"
                required
                className="w-full font-semibold mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-12 cursor-pointer rounded-2xl hover:bg-blue-700 transition"
              >
                Start Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
