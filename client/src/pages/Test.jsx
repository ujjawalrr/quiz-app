import React from 'react';
import NormalDistributionGraph from '../components/NormalDistributionGraph';

const Test = () => {
  const appearedUsers = [
    { marks: 9, name: "Ujjawal" },
    { marks: 8, name: "awal" },
    { marks: 3, name: "al" },
    { marks: 10, name: "al" },
    { marks: 0, name: "ali" },
    { marks: 2, name: "alje" },
    { marks: 3, name: "alfe" },
    { marks: 4, name: "aleff" },
  ];

  // Sort users by marks in descending order
  const sortedUsers = appearedUsers.slice().sort((a, b) => b.marks - a.marks);

  // Calculate my marks
  const myMarks = 7;

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
      <h1>Quiz Results</h1>
      <NormalDistributionGraph mean={mean} stdDev={stdDev} range={range} myMarks={myMarks} myRank={myRank} />
      <p>My Marks: {myMarks}</p>
      <p>My Rank: {myRank}</p>
    </div>
  );
};

export default Test;
