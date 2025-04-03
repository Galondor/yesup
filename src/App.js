import Questions from "./assets/Questions.json";
import React, { useState } from "react";
import loading from "./assets/loader.svg";
import { Analytics } from "@vercel/analytics/react"
import "./App.css";
import "./assets/Biggby.jpg";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreLVP, setScoreLVP] = useState(0);
  const [scoreCPT, setScoreCPT] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState("Both");

  const filteredQuestions = Questions.filter(
    (question) =>
      question.quiz === selectedQuizType ||
      selectedQuizType === "Both" ||
      question.quiz === "Standard"
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
              <style>{`
                .quiz_header {
                  background-color: #242424;
                }
              `}</style>
              {selectedQuizType === "Both" ? (
                <>
                  <h2 className='results_score'>Thank you for taking our quiz. <br></br> Here are your scores:</h2>
                  <h2 className='results_score'>LVP Score: <b>{scoreLVP}</b></h2>
                  <h2 className='results_score'>CPT Score: <b>{scoreCPT}</b></h2>
                </>
              ) : selectedQuizType === "LVP" ? (
                <>
                <h2 className='results_score'>Thank you for taking our quiz. <br></br> Here is your score:</h2>
                <h2 className='results_score'>LVP Score: <b>{scoreLVP}</b></h2>
                </>
              ) : (
                <>
                <h2 className='results_score'>Thank you for taking our quiz. <br></br> Here is your score:</h2>
                <h2 className='results_score'>CPT Score: <b>{scoreCPT}</b></h2>
                </>
              )}
              <div className='results_desc'>
                <h1 className='results_title'>
                  The YESUP quiz, is designed to help you find your perfect balance of quality and value!
                </h1>
                <div className='results_row'>
                  <p className='results_para'> As a thank you to all who want to take this to the next step... Stop in today for your free estimate and your next Biggby purchase is on us!</p>
                  <img className="promo_img" src={require("./assets/Biggby.jpg")} alt="Biggby"/>
                </div>
                <a href='tel: 15177831971' target="_blank" className='results_link'>(517)-783-1971</a>
                <a href='https://www.google.com/maps/place/Simple+Flooring+Solutions/@42.251871,-84.4287409,18z/data=!3m1!4b1!4m6!3m5!1s0x883d255090026b9d:0x87b4ba6f90538326!8m2!3d42.2518698!4d-84.4279754!16s%2Fg%2F11b63bx7t7?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D' target="_blank"  className="results_link">
                <b>1116 Wildwood Avenue</b></a>
                <h1 className="promo_title">Limited Time Offer!</h1>
                <p className="promo_desc">  <br /> <b>10% off ALL products. & Half off Labor on any order over 1000 Square Feet.</b></p>
              </div>
              <button   
                onClick={() => window.location.reload()}
                className='refresh_button'
              >
                <b>New Quiz</b>
              </button>
            </div>
          ) : (
            <>
              {/* <h2 className='question_text'>
                Question {currentQuestion + 1} / {filteredQuestions.length}
              </h2> */}
              <h2 id='question'><b>{filteredQuestions[currentQuestion].text}</b></h2>
              <ul className='options'>
                {filteredQuestions[currentQuestion].options.map(
                  (option, index) => {
                    return (
                      <li
                        key={index}
                        className={`option ${loadingState ? "disabled" : ""}`}
                        onClick={() =>
                          optionClicked(
                            option.value,
                            option.text,
                            filteredQuestions[currentQuestion].quiz
                          )
                        }
                      >
                        {option.text}
                      </li>
                    );
                  }
                )}
              </ul>
            </>
          )}
        </div>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
