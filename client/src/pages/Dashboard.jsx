import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaUser } from "react-icons/fa";

const Dashboard = ({ userName, userRank, totalUsers }) => {
  const totalMarks = 100;
  const correctMarks = 75;
  const incorrectMarks = 15;
  const unansweredMarks = 10;

  const [selectedStars, setSelectedStars] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (selectedStars) {
      // Set a timeout to hide the message after 3 seconds
      const timeoutId = setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      // Clear the timeout when the component is unmounted or when selectedStars changes
      return () => clearTimeout(timeoutId);
    }
  }, [selectedStars]);

  const handleStarClick = (stars) => {
    setSelectedStars(stars);
    setShowMessage(true);
  };

  const data = {
    labels: ["Your Rank"],
    datasets: [
      {
        label: "User Rank",
        data: [userRank],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: totalUsers,
      },
    },
  };

  return (
    <>
      <div className="flex bg-gradient-to-r from-yellow-400 to-yellow-600 items-center p-3">
        <h1 className="text-3xl font-extrabold text-white ml-6 mr-4 transform transition-transform hover:scale-105">
          Dashboard
        </h1>
        <div className="ml-auto mr-4">
          <div className="flex items-center">
            <FaUser className="text-white mr-2" />
            <span className="text-white">Profile</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-md shadow-md w-4/5 mx-auto my-8">
        <div className="text-left">
          <h2 className="text-3xl font-semibold mb-4">Performance Report</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className="bg-gradient-to-r from-orange-500 via-orange-300 to-yellow-300 text-white py-2 px-4 mt-4 rounded-md">
            Learn More
          </button>
        </div>
      </div>

      <div className="p-8 w-4/5 mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-4">Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Marks Card */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Marks Scored</h3>
            <p className="text-2xl font-bold text-gray-700">{totalMarks}</p>
          </div>

          {/* Correct Marks Card */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Correct</h3>
            <p className="text-2xl font-bold text-green-500">{correctMarks}</p>
          </div>

          {/* Incorrect Marks Card */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Incorrect</h3>
            <p className="text-2xl font-bold text-red-500">{incorrectMarks}</p>
          </div>

          {/* Unanswered Marks Card */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Unanswered</h3>
            <p className="text-2xl font-bold text-gray-700">
              {unansweredMarks}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-md shadow-md w-4/5 mx-auto my-8 text-center">
        <h2 className="text-3xl font-bold mb-2">How was your Experience?</h2>
        <p className="mb-4">
          Your feedback will help us improve your test experience
        </p>

        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((stars) => (
            <button
              key={stars}
              onClick={() => handleStarClick(stars)}
              className={`text-2xl focus:outline-none ${
                stars <= selectedStars ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ⭐
            </button>
          ))}
        </div>

        {showMessage && (
          <p className="mt-4 text-gray-700">
            Thank you for providing {selectedStars} stars! Your feedback is
            valuable.
          </p>
        )}
      </div>

      <div className="bg-gray-100 p-8 rounded-md shadow-md w-4/5 mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-2">Stats</h2>
        <p className="mb-4">
          Comparison of your standing with other learners and the topper of the
          live test
        </p>

        <div className="flex">
          {/* Graph */}
          <div className="w-3/4 pr-4">
            <Bar data={data} options={options} />
          </div>

          {/* Text Rank */}
          <div className="w-1/4">
            <p className="text-lg font-semibold mb-2">{`Hey ${userName},`}</p>
            <p className="text-2xl text-green-500">{`Your Rank: ${userRank}`}</p>
            <p className="text-gray-700 mt-4">{`Out of ${totalUsers} users`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
