import React, { useEffect, useState } from "react";
import LightOn from "/LightOn.png";
import LightbulbOff from "/LightOff.png";

const BlinkingBulb = ({ isUserTyping, isBotThinking }) => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // console.log("isBotThinking:", isBotThinking);
    // console.log("isBlinking:", isBlinking);
  
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
        <img className="am:h-8 h-6 sm:w-8 w-6" src={LightbulbOff} alt="Typing..." />
      ) : isBotThinking ? (
        <img
          className="sm:h-8 h-6 sm:w-8 w-6"
          src={isBlinking ? LightOn : LightbulbOff}
          alt="Thinking..."
        />
      ) : (
        <img className="sm:h-8 h-6 sm:w-8 w-6" src={LightOn} alt="Response Received" />
      )}
    </div>
  );
};

export default BlinkingBulb;
