"use client"

import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'
import { Button, MenuItem, TextField } from '@mui/material'
import axios from 'axios'
import Errormessage from '../../components/Errormessage/Errormessage'


const Home = ({name,setname,fetchQuestions}) => {
  const [error,seterror] = useState(false);
  const [allcategory,setallcategory] = useState([]);
  const [difficulty,setdifficulty] = useState("");
  const [category,setcategory] = useState();

  const navigate = useNavigate();

  const HandleSubmit = ()=>{
    if(!category||!difficulty||!name){
      seterror(true)
      return;
    }
    else{
      seterror(false)
      fetchQuestions(category,difficulty)
      navigate("/Quiz")
    }
  }

  const getcategory = async ()=>{
    try{
      const {data} = await axios.get("https://opentdb.com/api_category.php")
      // console.log(data.trivia_categories)
      setallcategory(data.trivia_categories)

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
      getcategory();
  },[]);


  return (
    <div className='content'>
      <div className='settings'>
          <span>Brain-burst Settings </span>
          <div className='settings_select'>
            {error && <Errormessage>Please fill all the fields</Errormessage>}
            <TextField
            style={{marginBottom:25}}
            size='small'
            label="Enter your name"
            variant='outlined'
            onChange={(e)=>setname(e.target.value)}
            value={name}
            />

            <TextField
            select
            variant='outlined'
            label="Select Category"
            style={{marginBottom:30}}
            onChange={(e)=>setcategory(e.target.value)}
            value={category}
            size='small'
            >
              {allcategory.map((c)=>(
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
            select
            style={{marginBottom:25}}
            label="Select Difficulty"
            variant='outlined'
            onChange={(e)=>setdifficulty(e.target.value)}
            value={difficulty}
            size='small'
            >
              <MenuItem key="Easy" value="easy">
                Easy
              </MenuItem>
              <MenuItem key="Medium" value="Medium">
                Medium
              </MenuItem>
              <MenuItem key="Hard" value="Hard">
                Hard
              </MenuItem>
            </TextField>

            <Button onClick={HandleSubmit} variant="contained" color="primary" size="large">Start Quiz</Button>
            
          </div>
      </div>
      <img className='banner' src="./undraw_questions_re_1fy7.svg" alt="" />
        
    </div>
  )
}

export default Home