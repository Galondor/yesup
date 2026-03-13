import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

function PrintComponent() {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <div>
            <button onClick={reactToPrintFn} className='print_button'>
            <b>Print Quiz</b>
            </button>
            <div id="print_section" ref={contentRef}>
                <style type="text/css" media="print">{"@page { size: portrait }"}</style>
                <link rel="stylesheet" href="App.css" />
                <div className="container">
                    <div className="row">
                        <div className="print_results">
                            <h1 className="print_title">YESUP Results</h1>
                            <div className="print_header">
                                <h2>Date: {new Date().toLocaleDateString()}</h2>
                                <h2>Name: _________________________________</h2>
                            </div>
                            <div className="print_content">
                            {localStorage.getItem("quizScores") && JSON.parse(localStorage.getItem("quizScores")).answers
                                ? JSON.parse(localStorage.getItem("quizScores")).answers.map((q, idx) => (
                                    <div key={idx}>
                                        <p className="print_question">Question {idx + 1}: {q.question} <b>{q.selectedOption}</b></p>
                                    </div>
                                ))
                                : <p>No questions available.</p>
                            }
                            </div>
                            <h2>LVP Score: {localStorage.getItem("quizScores") ? JSON.parse(localStorage.getItem("quizScores")).scoreLVP : "N/A"} | Carpet Score: {localStorage.getItem("quizScores") ? JSON.parse(localStorage.getItem("quizScores")).scoreCPT : "N/A"}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintComponent;