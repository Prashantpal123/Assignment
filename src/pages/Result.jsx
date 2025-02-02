import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Result = ({ userName, attempted, total, onFullReport }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, timeLeft,name } = location.state || { score: 0, timeLeft: 0 };

  const accuracy = total > 0 ? ((score / attempted) * 100).toFixed(2) : 0;

  return (
 <div className="full-screen-black  flex justify-center  ">
<div className="   mt-42  ">
      <div className="max-w-md  pt- mx-6 p-6 bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-2xl shadow-2xl text-center">
        <h2 className="text-3xl font-extrabold mb-4">📊 Quiz Report</h2>
        <h3 className="text-2xl font-semibold mb-2">👤 {name}</h3>
        {accuracy > 80 ? (
          <h3 className="text-green-300 text-xl font-semibold">🎉 Congratulations, {userName}! Excellent Performance! 🎉</h3>
        ) : accuracy < 50 ? (
          <h3 className="text-red-300 text-xl font-semibold">💪 Keep pushing, {userName}! You can do even better! 💪</h3>
        ) : (
          <h3 className="text-yellow-300 text-xl font-semibold">⚡ Good job, {userName}! Keep improving! ⚡</h3>
        )}
        <div className="text-lg bg-white text-gray-900 p-4 rounded-xl shadow-md mt-4">
          <p className="mb-2"><strong>🎯 Score:</strong> {score}</p>
          <p className="mb-2"><strong>⚡ TimeLeft</strong> {timeLeft} seconds </p>
          <p className="mb-2"><strong>✅ Attempted Questions:</strong> {attempted} / {total}</p>
          <p className="mb-2"><strong>📈 Accuracy:</strong> {accuracy}%</p>
        </div>
        <button
          className="mt-6 px-5 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 shadow-md"
          onClick={onFullReport}
        >
          📜 View Detailed Report
        </button>
      </div>
    </div>
    </div>
  );
};

export default Result;
