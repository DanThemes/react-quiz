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

const Quiz = ({category}) => {
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchQuizzes = async () => {
    setIsLoading(true);
    try {
      const { data: { results } } = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category.id}`);
      setQuizData(results);
    } catch (e) {
      console.log(e, 1);
    }
    setIsLoading(false);
    setResult(false);
    setError(false);
  }

  const areAllFieldsCompleted = (quizData) => {
    return quizData.filter(quiz => quiz.selected == undefined).length > 0 ? false : true;
  }

  const handleSubmit = () => {
    if (result) return;

    // check that all questions were answered
    if (areAllFieldsCompleted(quizData)) {
      const numberOfQuestions = quizData.length;
      let correctAnswers = 0;

      for (const quiz of quizData) {
        if (quiz.correct_answer === quiz.selected) {
          correctAnswers += 1;
        }
      }
      
      console.log(result)
      setResult({total: numberOfQuestions, correct: correctAnswers});
      setError(null);
    } else {
      setError('Please complete all the questions.');
      setResult(null);
    }
    
    console.log(quizData)
  }

  const handleAnswerSelect = e => {
    if (result) return;

    const newQuizData = quizData.map(quiz => {
      if (quiz.question.replaceAll(' ', '-').trim().toLowerCase() == e.target.name) {
        quiz.selected = e.target.value
      }
      return quiz;
    })
    setQuizData(newQuizData);
    console.log(quizData)
  }

  useEffect(() => {
    fetchQuizzes();
  }, [])

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        quizData && (
          <div>
            <h1>{category.name}</h1>
            {quizData.map((quiz, idx) => {
              return (
                <div key={idx}>
                  <p>{quiz.question}</p>
                  <div className="answers">
                    {displayAnswers(quiz).map(answer => {
                      return (
                        <div 
                          key={answer.id} 
                          className={
                              result && answer.answer === quiz.selected && answer.answer === quiz.correct_answer ? 
                                'correct' : 
                                (result && answer.answer === quiz.selected && answer.answer !== quiz.correct_answer) ? 
                                'incorrect' 
                                : ''
                          }
                        >
                          <label>
                            <input 
                              onChange={handleAnswerSelect} 
                              type="radio" 
                              value={answer.answer} 
                              name={quiz.question.replaceAll(' ', '-').trim().toLowerCase()} 
                              required 
                              checked={answer.answer === quiz.selected ? true : false}
                            />
                            {answer.answer}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            <button onClick={handleSubmit} disabled={result ? true : false}>Submit</button>

            {result && (
              <div>
                Your score: {result.correct} out of {result.total}
              </div>
            )}
            {error && (
              <div>
                {error}
              </div>
            )}
          </div>
        ) 
      ) }
    </div>
    )
}

export default Quiz