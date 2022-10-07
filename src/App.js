import {useEffect, useState } from 'react';
import './App.css';
import GameOver from './components/GameOver';

function App() {
  const [snake, setSnake] = useState([0, 1, 2, 3]);
  const [meal, setMeal] = useState(Math.floor(Math.random()*101));
  const [counter, setCounter] = useState(0);
  const [gameOver, setGameOver] = useState(false)
  const board=[]

  for (var i = 1; i <= 100; i++) {
    board.push({boxNumber: i, snake_visible: (snake.includes(i) ? true : false), extra_visible: (meal===i ? true : false)});
  }
  
  //snake changes
  useEffect(()=>{
      // setTimeout(() => {
        snake.shift()
        if(new Set(snake).size < snake.length) {
          setGameOver(true)
          setSnake([0])
          setMeal()
        }
      // }, 1000);    
  },[snake])

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowUp') {
        moveSnake(-10)
        checkPoints(-10)
    } else if (event.key === 'ArrowDown') {
        moveSnake(10)
        checkPoints(10)
    } else if (event.key === 'ArrowRight') {
        moveSnake(1)
        checkPoints(1)
    } else if (event.key === 'ArrowLeft') {
        moveSnake(-1)
        checkPoints(-1)
    }
  }

  const moveSnake = (movement)=>{
      let lastElement=snake[snake.length - 1]
      setSnake([...snake, lastElement+movement])

  }

  const checkPoints = (mov)=>{
    if (snake.includes(meal)){
      getPoint(mov)
    }
  }

  const generateMeal = ()=>{
    let randomPosition = Math.floor(Math.random()*101)
    if (!snake.includes(randomPosition)) {
      setMeal(randomPosition)
    } else {
      generateMeal()
    }
  }

  const getPoint = (mov) => {
    let newSnake = snake[0]-mov
    snake.unshift(newSnake)
    setSnake(snake)
    setMeal([])
    setCounter(snake.length-2)
    generateMeal()
  }

  // const checkDead = (snake) => {
  // }

  return (
    <div className='background' tabIndex={0} onKeyDown={handleKeyPress}>
      <div className='counter'>
        <div>SCORE</div>
        <div>- {counter} -</div>
      </div>
      <div className='board'>
        {board !== [] && board.map(((box) => <div className='box' id={box.boxNumber}>{box.snake_visible && <span className='snake'>&nbsp;</span>}{box.extra_visible && <span className='extra-ball'>&nbsp;</span>}</div>))}
      </div>
      {gameOver && <GameOver></GameOver>}
    </div>
  );

}

export default App;
