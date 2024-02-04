import React from "react";
import { useSelector } from "react-redux";
import NormalDistributionGraph from "./NormalDistributionGraph";

const StatsComponent = ({ appearedUsers }) => {
    const { checkedQuestions } = useSelector((state) => state.question);

    // Sort users by marks in descending order
    const sortedUsers = appearedUsers.slice().sort((a, b) => b.marks - a.marks);

    // Calculate my marks
    const myMarks = checkedQuestions.marks;

    // Calculate my rank
    const myRank = sortedUsers.filter(user => user.marks > myMarks).length + 1;

    // Calculate mean and standard deviation
    const mean = appearedUsers.reduce((sum, user) => sum + user.marks, 0) / appearedUsers.length;
    const squaredDeviations = appearedUsers.reduce((sum, user) => sum + Math.pow(user.marks - mean, 2), 0);
    const stdDev = Math.sqrt(squaredDeviations / appearedUsers.length);

    // Define the range for the x-axis (marks)
    const range = [...Array(11).keys()];

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">Stats</h2>

            <div className="flex items-center h-[350px] w-full">
                <div className="">
                    <NormalDistributionGraph mean={mean} stdDev={stdDev} range={range} myMarks={myMarks} myRank={myRank} />
                </div>
                <div className="w-1/3">
                    <p className="text-lg font-semibold mb-2">{`Hey ${checkedQuestions.name}`}</p>
                    <p className="text-2xl text-green-500">{`Your Rank: ${myRank}`}</p>
                    <p className="text-gray-700 mt-4">{`Out of ${appearedUsers.length} students`}</p>
                </div>
            </div>
        </div>
    )
}

export default StatsComponent
