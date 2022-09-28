import axios from 'axios'
import React, { useEffect, useState } from 'react'

const displayAnswers = (quiz) => {
  const answers = [];
  answers.push(quiz.correct_answer);
  quiz.incorrect_answers.map(answer => {
    answers.push(answer)
  });
  return answers;
}

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuizzes = async () => {
    setIsLoading(true);
    const { data: { results } } = await axios.get('https://opentdb.com/api.php?amount=10&category=22');
    setQuizData(results);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchQuizzes();
  }, [])

  return (
    <div>
      {quizData && (
        <div>
          {isLoading && <p>Loading...</p>}
          {quizData.map((quiz, idx) => {
            return (
              <div key={idx}>
                <p>{quiz.question}</p>
                <ul>
                  {displayAnswers(quiz).map((answer, idx) => {
                    return <li key={idx}>{answer}</li>
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Quiz