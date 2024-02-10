import React from "react";
import { useSelector } from "react-redux";
import NormalDistributionGraph from "./NormalDistributionGraph";

const StatsComponent = ({ appearedUsers }) => {
  const { checkedQuestions } = useSelector((state) => state.question);
  const { currentUser } = useSelector((state) => state.user);

  function findIndexFromValue(arr, value) {
    const index = arr.findIndex(obj => Object.values(obj).includes(value));
    return index;
  }
  
  const myRank = findIndexFromValue(appearedUsers, currentUser._id) + 1;

  const myMarks = checkedQuestions.marks;

  const mean =
    appearedUsers.reduce((sum, user) => sum + user.marks, 0) /
    appearedUsers.length;
  const squaredDeviations = appearedUsers.reduce(
    (sum, user) => sum + Math.pow(user.marks - mean, 2),
    0
  );
  const stdDev = Math.sqrt(squaredDeviations / appearedUsers.length);

  const range = [...Array(11).keys()];

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Stats</h2>

      <div className="flex flex-col md:flex-row items-center w-full">
        <div className="w-full md:w-4/5 mb-4 md:mb-4">
          <NormalDistributionGraph
            mean={mean}
            stdDev={stdDev}
            range={range}
            myMarks={myMarks}
            myRank={myRank}
            className="w-full md:w-auto h-auto p-8"
          />
        </div>
        <div className="w-full md:w-1/5 text-center">
          <p className="text-lg font-semibold mb-2">{`Hey ${checkedQuestions.name}`}</p>
          <p className="text-2xl text-green-500">{`Your Rank: ${myRank}`}</p>
          <p className="text-gray-700 mt-4">{`Out of ${appearedUsers.length} students`}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
