import React, { useState } from 'react'
import { Button } from '@mui/material'
import Errormessage from '../../components/Errormessage/Errormessage'
import './Questions.css'
import { useNavigate } from 'react-router-dom'
const Questions = ({
    currQues,
    setcurrQues,
    questions,
    options,
    correct,
    setscore,
    score,
    setquestions
}) => {
      const [selected,setselected] = useState("");
      const [error,seterror] = useState(false)

      const navigate = useNavigate();


      const handleSelect = (i)=>{
        if(selected=== i && selected === correct){
          return "select";
        }else if(selected===i && selected!== correct){
          return "wrong";
        }else if(i=== correct){
          return "select";
        }
      }

      const handleCheck = (i) => {
        setselected(i);
        if (i === correct) setscore(score + 1);
        seterror(false);
      };

      const handleNext = () => {
        if (currQues > 8) {
          navigate("/result");
        } else if (selected) {
          setcurrQues(currQues + 1);
          setselected();
        } else seterror("Please select an option first");
      };
    
      const handleQuit = () => {
        setcurrQues(0);
        setquestions();
      };

      // console.log(options)
      // console.log(questions)
  return (
    
        <div className='options'>
      {error && <Errormessage>{error}</Errormessage>}
      {options &&
          options.map((i)=>(
              <button onClick={()=>{handleCheck(i)}}
              className={`singleOption ${selected && handleSelect(i)}`}
              key={i}
              disabled={selected}
              >{i}</button>
          ))
      }
      <div className='controls'>
        <Button 
        variant="contained"
        color="secondary"
        size="large"
        style={{ width: 185 }}
        href="/"
        onClick={() => handleQuit()}
        >
          Quit
        </Button>
        <Button
         variant="contained"
         color="primary"
         size="large"
         style={{ width: 185 }}
         onClick={handleNext}
         >
          Next Question
        </Button>

      </div>


      </div>

  )
}

export default Questions