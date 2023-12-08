import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Results from './Pages/Results/Results';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const[name,setname]= useState("");
  const[questions,setquestions]= useState();
  const[score,setscore]= useState(0);

  const fetchQuestions = async(category="",difficulty="")=>{
    const {data} = await axios.get(
      `https://opentdb.com/api.php?amount=20${
        category && `&category=${category}`}${
          difficulty && `&difficulty=${difficulty}`}&type=multiple`
    )
    console.log(data.results)
    setquestions(data.results)
  }
  return (
    <BrowserRouter>
        <div className="app">
          <Header/>
          <Routes>
            <Route path='/' element={<Home name={name} setname={setname} fetchQuestions={fetchQuestions} />} exact3>
            </Route>
            <Route path='/Quiz' element={<Quiz name={name} questions={questions} score={score} setscore={setscore} setquestions={setquestions} />} exact3>
            </Route>
            <Route path='/result' element={<Results score={score} />} exact3>
            </Route>
            
          </Routes>
        </div>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
