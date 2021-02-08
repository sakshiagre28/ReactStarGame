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
  <button className ="number" 
  style ={{backgroundColor : colors[props.status]}}
  onClick ={()=>props.onClick(props.number,props.status)}>
    {props.number}
  </button>

  )}

  const PlayAgain = props =>
  {
    return(
      <div className = "game-done">
        <button onClick = {props.onClick}>Play Again</button>
      </div>
    )
  }
const  App =()=> {
  const [stars, setStars] = useState(utils.random(1,9)); 
  //const stars = utils.random(1,9);
  const [availableNums, setAvailableNums] = useState(utils.range(1,9));
  const [candidateNums, setCandidateNums] = useState([])
  
  const candidatesAreWrong = utils.sum(candidateNums)>stars
  const gameIsDone = availableNums.length ===0

  const resetGame = () =>{
    setStars(utils.random(1,9))
    setAvailableNums(utils.range(1,9))
    setCandidateNums([])
  }

  const numberStatus =(number)=>{
    if(!availableNums.includes(number)){
      return 'used';
    }
    if(candidateNums.includes(number))
    {return candidatesAreWrong ? 'wrong' : 'candidate'
    }

    return 'available'
  }

  const onNumberClick = (number, currentStatus)=>
  {
    //currentstatus => new status
    if(currentStatus == 'used')
    {
      return;
    }
    //candidate nums
    const newCandidateNums = currentStatus==='available' ? candidateNums.concat(number): candidateNums.filter(cn => cn!==number);
    if(utils.sum(newCandidateNums)!== stars)
    {
      setCandidateNums(newCandidateNums);
    }
    else{
      const newAvailableNums = availableNums.filter(
        n=> !newCandidateNums.includes(n)
      )
      //redraw numbers 
      setStars(utils.randomSumIn(newAvailableNums,9))
      setAvailableNums(newAvailableNums)
      setCandidateNums([])
    }
    
  }
  return (
    <div className = "game">
      <div>Pick 1 or more numbers</div>
      <div className= "body">
        <div className ="left">
          {gameIsDone? (
            <PlayAgain onClick= {resetGame}/>
          ):
          (<StarDisplay countOfStar ={stars}></StarDisplay>)}
        </div>

        <div className ="right">
          {utils.range(1,9).map(number =>
          <NumberButton key={number} 
                        number ={number}
                        status = {numberStatus(number)}
                        onClick = {onNumberClick}>  
          </NumberButton>)}
        </div>
      </div>
      <div className ="timer" >Time remaining :10</div>
    </div>
  );
}

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'green',
  wrong: 'red',
  candidate: 'blue',
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


