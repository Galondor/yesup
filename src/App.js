import Questions from "./assets/Questions.json";
import React, { useState } from "react";
import loading from "./assets/loader.svg";
import "./App.css";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreLVP, setScoreLVP] = useState(0);
  const [scoreCPT, setScoreCPT] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState("Both");

  const filteredQuestions = Questions.filter(
    (question) => question.quiz === selectedQuizType || selectedQuizType === "Both" || question.quiz === "Standard"
  );

  const optionClicked = (value, text, quizType) => {
    if (loadingState) return;

    if (text === "Both") {
      setSelectedQuizType("Both");
    } else if (text === "LVP") {
      setSelectedQuizType("LVP");
    } else if (text === "Carpet") {
      setSelectedQuizType("CPT");
    }

    switch (quizType) {
      case "Standard":
      setScoreLVP(scoreLVP + value);
      setScoreCPT(scoreCPT + value);
      break;
      case "LVP":
      setScoreLVP(scoreLVP + value);
      break;
      case "CPT":
      setScoreCPT(scoreCPT + value);
      break;
      default:
      break;
    }

    if (currentQuestion + 1 < filteredQuestions.length) {
      setLoadingState(true);
      setTimeout(() => {
        setLoadingState(false);
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      setLoadingState(true);
      setTimeout(() => {
        setLoadingState(false);
        setShowResults(true);
      }, 1500);
    }
  };

  return (
    <div>
      <nav>
        <div className='row'></div>
      </nav>
      <header>
        <div className='row'>
          <h1 className='title'>YESUP Flooring Quiz</h1>
          <p className='intro_para'>
            The free quiz that will help you find your perfect floor. <br />{" "}
            Take the quiz below to begin your journey!
          </p>
        </div>
      </header>
      <div className='quiz_container' id='quiz'>
        <div className='quiz_header'>
          {loadingState && (
            <div className='loading_container'>
              <img src={loading} className='loader' alt='Loading...' />
            </div>
          )}
          {showResults ? (
            <div className='results'>
              {selectedQuizType === "Both" ? (
                <>
                  <h2 className='results_title'>LVP Score: {scoreLVP}</h2>
                  <h2 className='results_title'>CPT Score: {scoreCPT}</h2>
                </>
              ) : selectedQuizType === "LVP" ? (
                <h2 className='results_title'>LVP Score: {scoreLVP}</h2>
              ) : (
                <h2 className='results_title'>CPT Score: {scoreCPT}</h2>
              )}
              <h2 className='results_title'>
                Thank you for taking the quiz!
              </h2>
              <button onClick={() => window.location.reload()} className='refresh_button'>
                New Quiz
              </button>
            </div>
          ) : (
            <>
              {/* <h2 className='question_text'>
                Question {currentQuestion + 1} / {filteredQuestions.length}
              </h2> */}
              <h2 id='question'>{filteredQuestions[currentQuestion].text}</h2>
              <ul className='options'>
                {filteredQuestions[currentQuestion].options.map((option, index) => {
                  return (
                    <li
                      key={index}
                      className={`option ${loadingState ? 'disabled' : ''}`}
                      onClick={() => optionClicked(option.value, option.text, filteredQuestions[currentQuestion].quiz)}
                    >
                      {option.text}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;