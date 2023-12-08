import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './Quiz.css'
import Questions from '../../components/Questions/Questions';


const Quiz = ({name,score,questions,setquestions,setscore}) => {
  const[options,setOptions] = useState();
  const[currQues,setcurrQues] = useState(0);


  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };


  useEffect(()=>{
    console.log(questions);
    const updateQuiz = setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );

  },[questions,currQues]);

  console.log(options)

  return (

    <div className='quiz'>
      <span className='subtitle'>Welcome,{name}</span>
      {questions?(
      <>
      <div className='quizinfo'>
        <span >{questions[currQues].category}</span>
        <span style={{color:'red'}}>Score : {score}</span>
      </div>
      <div className='question'>
      <h1>Question{[currQues+1]}</h1>
      <div className='singleQuestion'>
      <h2 style={{marginTop:"20px"}}>{questions[currQues].question}</h2>
      </div>
      </div>
      
      <Questions
        currQues={currQues}
        setcurrQues={setcurrQues}
        questions={questions}
        correct = {questions[currQues]?.correct_answer}
        score={score}
        setscore={setscore}
        setquestions = {setquestions}
        options={options}
      />
      </>
      ):(
      <CircularProgress/>)}
      </div>
  )
}

export default Quiz