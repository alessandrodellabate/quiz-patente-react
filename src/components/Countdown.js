import { useEffect, useRef, useState } from "react";

export default function Countdown({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft]);

  function formatTime(timeLeft) {
    var hours = Math.floor(timeLeft / 3600);
    var minutes = Math.floor((timeLeft - hours * 3600) / 60);
    var seconds = timeLeft - hours * 3600 - minutes * 60;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

  const timeFormatted = formatTime(timeLeft);

  return <p>{timeFormatted}</p>;
}