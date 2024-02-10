import React, { useState } from 'react';

function TestComponent() {
  const [path, setPath] = useState([]);

  function handleMouseMove(event) {
    const { clientX, clientY } = event;
    const newPathPoint = { x: clientX +5, y: clientY -80 };
    console.log(path)
    setPath(prevPath => [...prevPath, newPathPoint]);
  }

  return (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
      <h1>Move your cursor around to trace the path!</h1>
      <svg width="100%" height="100%">
        <polyline
          points={path.map(point => `${point.x},${point.y}`).join(' ')}
          fill="none"
          stroke="blue"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default TestComponent;
