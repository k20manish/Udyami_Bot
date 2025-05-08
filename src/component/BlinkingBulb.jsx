import React, { useEffect, useState } from "react";
import LightOn from "../assets/LightOn.png";
import LightbulbOff from "../assets/LightOff.png";

const BlinkingBulb = ({ isUserTyping, isBotThinking }) => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    console.log("isBotThinking:", isBotThinking);
    console.log("isBlinking:", isBlinking);
  
    let interval;
    if (isBotThinking) {
      interval = setInterval(() => {
        setIsBlinking((prev) => !prev);
      }, 500); 
    } else {
      clearInterval(interval);
      setIsBlinking(false);
    }
    return () => clearInterval(interval);
  }, [isBotThinking]);

  return (
    <div className="absolute right-3">
      {isUserTyping ? (
        <img className="h-8 w-8" src={LightbulbOff} alt="Typing..." />
      ) : isBotThinking ? (
        <img
          className="h-8 w-8"
          src={isBlinking ? LightOn : LightbulbOff}
          alt="Thinking..."
        />
      ) : (
        <img className="h-8 w-8" src={LightOn} alt="Response Received" />
      )}
    </div>
  );
};

export default BlinkingBulb;
