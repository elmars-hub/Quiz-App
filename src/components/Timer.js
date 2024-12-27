import { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { dispatch, questions } = useQuiz();
  const quizTime = questions.length * 1;
  const [secondsRemaining, setsecondsRemaining] = useState(quizTime);
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const intervalId = setInterval(function () {
      setsecondsRemaining((state) => --state);

      if (secondsRemaining === 0) {
        dispatch({ type: "finish" });
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, secondsRemaining]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
