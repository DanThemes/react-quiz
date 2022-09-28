import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const displayAnswers = (quiz) => {
  const answers = [];
  answers.push({
    id: uuidv4(),
    answer: quiz.correct_answer,
    value: true
  });
  quiz.incorrect_answers.map(answer => {
    answers.push({
      id: uuidv4(),
      answer: answer,
      value: true
    })
  });
  return answers;
}

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedAnswers, setSelectedAnswers] = useState(null);

  const fetchQuizzes = async () => {
    setIsLoading(true);
    try {
      const { data: { results } } = await axios.get('https://opentdb.com/api.php?amount=2&category=22');
      setQuizData(results);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  const handleSubmit = () => {
  //   setSelectedAnswers(quizData.map(quiz => {
  //       return { question: quiz.question, correct: quiz.correct_answer }
  //   }));
  //   console.log(selectedAnswers);
  }

  const handleAnswerSelect = e => {
    quizData.map(quiz => {
      if (quiz.question.replaceAll(' ', '-').trim().toLowerCase() == e.target.value) {
        // add a "selected" property on the object
      }
    })
  }

  useEffect(() => {
    fetchQuizzes();
  }, [])

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {quizData && (
        <div>
          {quizData.map((quiz, idx) => {
            return (
              <div key={idx}>
                <p>{quiz.question}</p>
                <div className="answers">
                  {displayAnswers(quiz).map(answer => {
                    return (
                      <div key={answer.id}>
                        <label>
                          <input onChange={handleAnswerSelect} type="radio" value={answer.answer} name={quiz.question.replaceAll(' ', '-').trim().toLowerCase()} />
                          {answer.answer}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  )
}

export default Quiz