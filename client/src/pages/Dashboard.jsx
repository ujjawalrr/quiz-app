import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiStarFormation } from "react-icons/gi";
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import StatsComponent from "../components/StatsComponent";
import { updateCheckedQuestions } from "../redux/question/questionSlice";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { checkedQuestions } = useSelector((state) => state.question);
  const [selectedStars, setSelectedStars] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [appearedUsers, setAppearedUsers] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);

  useEffect(() => {
    const loadPerformers = async () => {
      try {
        const response = await fetch("/api/performer?sort=marks");
        if (!response.ok) {
          console.log("Error getting other users data");
        }
        const data = await response.json();
        setAppearedUsers(data);
      } catch (error) {
        console.log("Error in getting other users data");
      }
    };
    loadPerformers();
    if (checkedQuestions.feedback) {
      setSelectedStars(checkedQuestions.feedback);
      setShowMessage(true);
    }
  }, []);

  useEffect(() => {
    setTopPerformers(appearedUsers.slice(0, 3));
  }, [appearedUsers]);
  const handleStarClick = (stars) => {
    const handleSubmit = async () => {
      try {
        const res = await fetch(`/api/performer/feedback/${currentUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feedback: selectedStars }),
        });
        const data = await res.json();
        if (data.success === false) {
          return;
        }
        dispatch(updateCheckedQuestions(data));
        setShowMessage(true);
      } catch (error) {
        console.log("Error in feedback!");
      }
    };
    handleSubmit();
    setSelectedStars(stars);
  };

  const getMessage = () => {
    return showMessage
      ? `Thank you for providing ${selectedStars} stars! Your feedback is valuable.`
      : "Your feedback will help us improve your test experience";
  };

  return (
    <div>
      <div className="px-2 sm:px-6 tb:px-10 lg:px-28 xl:px-48">
        <div className="mx-auto my-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4 text-[#7f340a] text-shadow">Performance Report</h2>
          </div>
        </div>

        <div className="mx-auto my-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">Marks Scored</h3>
              <p className="text-2xl font-bold text-gray-700">
                {checkedQuestions.marks}/{10}
              </p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">Correct</h3>
              <p className="text-2xl font-bold text-green-500">
                {checkedQuestions.correctQuestions}
              </p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">Incorrect</h3>
              <p className="text-2xl font-bold text-red-500">
                {checkedQuestions.incorrectQuestions}
              </p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">Unanswered</h3>
              <p className="text-2xl font-bold text-gray-700">
                {checkedQuestions.totalQuestions -
                  checkedQuestions.correctQuestions -
                  checkedQuestions.incorrectQuestions}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto my-2">
          <div className="text-center">
            <Link
              to="/solutions"
              className="bg-gradient-to-r from-[#d16d2c] to-[#7f340a] text-white py-2 px-4 mt-2 rounded-md"
            >
              View Solutions
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 min-h-[200px] p-8 rounded-md shadow-md  mx-auto my-8">
          {appearedUsers && appearedUsers.length > 0 && (
            <StatsComponent appearedUsers={appearedUsers} />
          )}
        </div>

        <div className="bg-gray-100 p-8 rounded-md shadow-md  mx-auto my-8">
          <h2 className="text-3xl flex justify-center items-center gap-3 font-semibold mb-4 text-center text-orange-500">
            <GiStarFormation color="#eecf1e" /> Top Performers{" "}
            <GiStarFormation color="#eecf1e" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPerformers.map((performer, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105"
              >
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#d16d2c] to-[#7f340a] text-white px-2 py-1 rounded-tl-md rounded-br-md">
                  <span className="font-bold text-lg">Rank #{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-4 break-words">{`Name: ${performer.name}`}</h3>
                <p className="text-2xl font-bold text-indigo-600">{`Marks Obtained: ${performer.marks} / ${checkedQuestions.totalQuestions}`}</p>
                <div className="relative mt-4 h-4 bg-gray-300 rounded overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded"
                    style={{
                      width: `${(performer.marks / checkedQuestions.totalQuestions) *
                        100
                        }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-md shadow-md  mx-auto my-8 text-center">
          <h2 className="text-3xl font-bold mb-2">How was your Experience?</h2>
          <p className="mb-4">{getMessage()}</p>

          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((stars) => (
              <button
                key={stars}
                onClick={() => handleStarClick(stars)}
                className="text-xl focus:outline-none text-black-800"
              >
                {stars <= selectedStars ? (
                  <IoStarSharp className="text-yellow-500" />
                ) : (
                  <IoStarOutline />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
