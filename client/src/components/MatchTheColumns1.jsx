import React, { useState, useEffect } from "react";

const questions = [
  "22 + 13",
  "34 + 15",
  "45 + 30",
  "50 + 12",
];

const answers = ["49", "62", "35", "75"];

function MatchTheFollowing() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [matches, setMatches] = useState([]);
  const [linePositions, setLinePositions] = useState([]); // Store calculated line positions

  useEffect(() => {
    // Calculate and store line positions on mount
    const newLinePositions = matches.map((match, index) => {
      const questionIndex = questions.indexOf(match.question);
      const answerIndex = answers.indexOf(match.answer);
      const questionButtonRef = document.getElementById(
        `question-${questionIndex}`
      );
      const answerButtonRef = document.getElementById(`answer-${answerIndex}`);

      if (questionButtonRef && answerButtonRef) {
        const questionRect = questionButtonRef.getBoundingClientRect();
        const answerRect = answerButtonRef.getBoundingClientRect();
        const questionCenterX = questionRect.left + questionRect.width / 2;
        const questionCenterY = questionRect.top + questionRect.height / 2;
        const answerCenterX = answerRect.left + answerRect.width / 2;
        const answerCenterY = answerRect.top + answerRect.height / 2;

        // Calculate triangle properties
        const hypotenuse = Math.sqrt(
          Math.pow(questionCenterX - answerCenterX, 2) +
            Math.pow(questionCenterY - answerCenterY, 2)
        );
        const angle = Math.atan2(
          answerCenterY - questionCenterY,
          answerCenterX - questionCenterX
        );

        const color = `hsl(${(360 / matches.length) * index}, 100%, 50%)`; // Assign different color for each pair

        return {
          top: `${questionCenterY}px`,
          left: `${questionCenterX}px`,
          transform: `translate(-10%, -10%) rotate(${angle}rad)`,
          width: `${hypotenuse}px`,
          backgroundColor: color,
        };
      } else {
        return null; // Prevent errors if elements not yet available
      }
    });
    setLinePositions(newLinePositions.filter((position) => position !== null)); // Remove null positions
  }, [matches]); // Recalculate lines on match changes

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const handleAnswerClick = (answer) => {
    if (selectedQuestion) {
      // Unselect the first selected answer for the current question
      const unselectedMatches = matches.filter((match) => match.question !== selectedQuestion);
      setMatches([...unselectedMatches, { question: selectedQuestion, answer }]);
      setSelectedQuestion(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="grid grid-cols-2 gap-4">
        {/* Question Column */}
        <div className="flex flex-col items-center">
          {questions.map((question, index) => (
            <button
              key={index}
              id={`question-${index}`}
              className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-lg ${
                selectedQuestion === question ? 'bg-blue-400' : ''
              }`}
              onClick={() => handleQuestionClick(question)}
              style={{ backgroundColor: `hsl(${(360 / questions.length) * index}, 100%, 80%)` }}
            >
              {question}
            </button>
          ))}
        </div>

        {/* Answer Column */}
        <div className="flex flex-col items-center">
          {answers.map((answer, index) => (
            <button
              key={index}
              id={`answer-${index}`}
              className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-lg ${
                matches.some((match) => match.answer === answer) ? 'bg-blue-400' : ''
              }`}
              onClick={() => handleAnswerClick(answer)}
              style={{ backgroundColor: `hsl(${(360 / answers.length) * index}, 100%, 80%)` }}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>

      {/* Draw lines for matches based on calculated positions */}
      {linePositions.map((linePosition, index) => (
        <div
          key={index}
          className="absolute z-10"
          style={{
            ...linePosition,
            opacity: matches.length > index ? 1 : 0, // Show lines only for existing matches
            height: "1px", // Add height for the line
          }}
        />
      ))}
    </div>
  );
}

export default MatchTheFollowing;
