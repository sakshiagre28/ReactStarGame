import React , {useState}from 'react';
import ReactDOM from 'react-dom';
import './App.css';
//import EmployeeComponent from './component/EmployeeComponent' ;
const StarDisplay = props =>{
  return(
    <>
    {utils.range(1,props.countOfStar).map(starId => <div key ={starId} className="star"></div>)}
  </>
  )
}

const NumberButton =props=>{
  return(
  <button className ="number" onClick ={()=>{console.log(props.number)}}>{props.number}</button>

  )}
const  App =()=> {
  //const [stars, setStars] = useState(utils.random(1,9)); 
  const stars = utils.random(1,9);
  return (
    <div className = "game">
      <div>Pick 1 or more numbers</div>
      <div className= "body">
        <div className ="left">
          <StarDisplay countOfStar ={stars}></StarDisplay>
        </div>

        <div className ="right">
          {utils.range(1,9).map(number =><NumberButton key={number} number ={number}></NumberButton>)}
        </div>
      </div>
      <div className ="timer" >Time remaining :10</div>
    </div>
  );
}

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};


export default App;


