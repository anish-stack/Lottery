import React, { useState, useEffect } from 'react';

function Timer({ drawDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(drawDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="timer">
      <div className="boxes days">
        <h3>{timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}</h3>
        <p>Days</p>
      </div>
      <div className="boxes hours">
        <h3>{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</h3>
        <p>Hours</p>
      </div>
      <div className="boxes minutes">
        <h3>{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</h3>
        <p>Minutes</p>
      </div>
      <div className="boxes seconds">
        <h3>{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</h3>
        <p>Seconds</p>
      </div>
    </div>
  );
}

export default Timer;
