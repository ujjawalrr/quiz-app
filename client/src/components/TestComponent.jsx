import React, { useState } from 'react';

const TestComponent = () => {
  const [drawing, setDrawing] = useState(false);
  const [lineStyle, setLineStyle] = useState({});

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const initialX = rect.left + (rect.width / 2);
    const initialY = rect.top + (rect.height / 2);

    setLineStyle({
      left: initialX + 'px',
      top: initialY + 'px',
      height: '0'
    });

    setDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (drawing) {
      const newHeight = Math.sqrt(Math.pow(e.clientX - parseInt(lineStyle.left), 2) + Math.pow(e.clientY - parseInt(lineStyle.top), 2)) + 'px';
      setLineStyle(prevStyle => ({ ...prevStyle, height: newHeight }));
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div id="clickableElement" className="cursor-pointer" onClick={handleClick}>
        Click me
      </div>
      <div id="line" className="absolute bg-red-500" style={lineStyle}></div>
    </div>
  );
};

export default TestComponent;
