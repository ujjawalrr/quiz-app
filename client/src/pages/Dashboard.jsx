import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState(0);
  const [unansweredQuestions, setUnansweredQuestions] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const { attemptedQuestions, checkedQuestions } = useSelector(
    (state) => state.question
  );
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/question?includeCorrectAns=true`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(false);
        setQuestions(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    loadQuestions();
  }, []);
  useEffect(() => {
    let correctCount = 0;
    let incorrectCount = 0;

    for (let index = 0; index < questions.length; index++) {
      for (
        let subIndex = 0;
        subIndex < questions[index].subQuestions.length;
        subIndex++
      ) {
        const subQuestion = questions[index].subQuestions[subIndex];
        if (subQuestion.selectedAnswer === subQuestion.correctAns) {
          correctCount += 1;
        } else {
          incorrectCount += 1;
        }
      }
    }

    setCorrectQuestions(correctCount);
    setIncorrectQuestions(incorrectCount);
    setTotalQuestions(correctCount + incorrectCount);
    setUnansweredQuestions(questions.length - correctCount - incorrectCount);
  }, [questions]);

  // Users and their Ranks
  const appearedUsers = [
    {
      name: "Ujjawal Kumar",
      marks: 6,
    },
    {
      name: "Mayuresh Kumar",
      marks: 6,
    },
    {
      name: "Ujj",
      marks: 5,
    },
    {
      name: "Rakesh",
      marks: 2,
    },
  ];

  const userName = currentUser.name;
  const userMarks = 6;

  const sortedUsers = appearedUsers.sort((a, b) => b.marks - a.marks);
  const userRank =
    sortedUsers.findIndex((user) => user.marks === userMarks) + 1;
  const totalUsers = appearedUsers.length;

  const report = {
    // Questions - ID
    // Questions - correct answer, wrong ans, unanswered
    // Total Users
    // Array of Marks - rank using this array
  };
  const [selectedStars, setSelectedStars] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (selectedStars) {
      const timeoutId = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
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

  const topPerformers = appearedUsers
    .sort((a, b) => b.marks - a.marks)
    .slice(0, 3);

  return (
    <>
      <div className="flex bg-gradient-to-r from-yellow-400 to-yellow-600 items-center p-3">
        <h1 className="text-3xl font-extrabold text-white ml-6 mr-4 transform transition-transform hover:scale-105">
          Dashboard
        </h1>
        <div className="ml-auto mr-4">
          <div className="flex items-center">
            <FaUser className="text-white mr-2" />
            <span className="text-white">{currentUser.name}</span>
          </div>
        </div>
      </div>

      <div className="w-4/5 mx-auto my-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Performance Report</h2>
        </div>
      </div>

      <div className="p-8 w-4/5 mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-4">Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Marks Scored</h3>
            <p className="text-2xl font-bold text-gray-700">
              {correctQuestions}/{totalQuestions}
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Correct</h3>
            <p className="text-2xl font-bold text-green-500">
              {correctQuestions}
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Incorrect</h3>
            <p className="text-2xl font-bold text-red-500">
              {incorrectQuestions}
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Unanswered</h3>
            <p className="text-2xl font-bold text-gray-700">
              {unansweredQuestions}
            </p>
          </div>
        </div>
      </div>

      <div className="w-4/5 mx-auto my-2">
        <div className="text-center">
          <button className="bg-gradient-to-r from-orange-500 via-orange-300 to-yellow-300 text-white py-2 px-4 mt-2 rounded-md">
            View Solutions
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-md shadow-md w-4/5 mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-4">Stats</h2>

        <div className="flex">
          <div className="w-4/5 pr-4">
            <Bar data={data} options={options} />
          </div>

          <div className="w-1/5">
            <p className="text-lg font-semibold mb-2">{`Hey ${userName},`}</p>
            <p className="text-2xl text-green-500">{`Your Rank: ${userRank}`}</p>
            <p className="text-gray-700 mt-4">{`Out of ${totalUsers} users`}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-md shadow-md w-4/5 mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-4 text-center text-orange-500">
          🌟 Top Performers 🌟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.map((performer, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 via-orange-300 to-yellow-300 text-white px-2 py-1 rounded-tl-md rounded-br-md">
                <span className="font-bold text-lg">Rank #{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{`Name: ${performer.name}`}</h3>
              <p className="text-2xl font-bold text-indigo-600">{`Marks Obtained: ${performer.marks} / ${totalQuestions}`}</p>
              <div className="relative mt-4 h-4 bg-gray-300 rounded overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded"
                  style={{
                    width: `${(performer.marks / totalQuestions) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
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
              className="text-xl focus:outline-none text-black-800"
            >
              {stars <= selectedStars ? "⭐" : "☆"}
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
    </>
  );
};

export default Dashboard;
