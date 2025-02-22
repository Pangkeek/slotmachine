import React from 'react'
import { useState,useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";

import Money from './Money'

function Slot() {
  const [spin,setSpin] = useState(false)
  const [rollRes,setRollres] = useState(['🍒','🍋','🍉','🍊','🍇','🔔','🍒','🍋','🍉' ])
  const [bet,setBet] = useState(1)
  const [cheat,setCheat] = useState(false)
  const [winrate,setWinrate] = useState(0)
  const [income,setIncome] = useState(0)
  const [outcome,setOutcome] = useState(0)
  const [profit,setProfit] = useState(0)
  const [currentwinrate,setCurrentwinrate] = useState(0)
  const [rollscount,setRollscount] = useState(0)
  const [wincount,setWincount] = useState(0)
  const [auto,setAuto] = useState(false)
  const [autoAmount, setAutoAmount] = useState(1);
  const [winrateList,setWinrateList] = useState([])

  useEffect(() => {
    checkwin();
  }, [rollRes]);

  useEffect(() => {
    setProfit(income - outcome);
  }, [income]);

  useEffect(() => {
    if (rollscount === 0) {
      setCurrentwinrate(0)
    } else {
      setCurrentwinrate((wincount / rollscount) * 100)
    }
    setWinrateList((prevList) => [...prevList, (wincount / rollscount) * 100])
  }, [wincount, rollscount])

  const symbol = ['🍒','🍋','🍉','🍊','🍇','🔔']

  const Spin = ()=>{
    setOutcome(outcome+bet)
    setSpin(true)
    setTimeout(()=>{
      if(cheat == true){
        const newResult = cheatRand(symbol,3)
        setRollres(newResult)
        setSpin(false)
      } else {
        const newResult = rand(symbol,9)
        setRollres(newResult)
        setSpin(false)
      }
      setRollscount(rollscount + 1)
    },1000)
  }

  const rand = (arr,n)=>{
    const result = []
    for(let i = 0;i < n;i++){
      const randIndex = Math.floor(Math.random()*arr.length)
      result.push(arr[randIndex])
    }
    return result 
  }
  
  const cheatRand = (arr, n) => {
    if (winrate > 0 && Math.random() <= winrate/100) {
      // If we should generate a winning combination
      while (true) {
        const tempResult = rand(symbol, 9);
        // Need a version of checkwin that doesn't update state
        if (isWinningCombination(tempResult)) {
          return tempResult;
        }
      }
    } else {
      // If we should generate a losing combination
      while (true) {
        const tempResult = rand(symbol, 9);
        // Need a version of checkwin that doesn't update state
        if (!isWinningCombination(tempResult)) {
          return tempResult;
        }
      }
    }
  }
  
  // New function that just checks if a combination is winning without side effects
  const isWinningCombination = (rolls) => {
    // Check horizontal rows
    if (rolls[0] === rolls[1] && rolls[1] === rolls[2]) return true;
    if (rolls[3] === rolls[4] && rolls[4] === rolls[5]) return true;
    if (rolls[6] === rolls[7] && rolls[7] === rolls[8]) return true;
    
    // Check diagonals
    if (rolls[0] === rolls[4] && rolls[4] === rolls[8]) return true;
    if (rolls[2] === rolls[4] && rolls[4] === rolls[6]) return true;
    
    return false;
  }

  const bet1 = ()=>{
    setBet(1)
  }
  const bet2 = ()=>{
    setBet(2)
  }
  const bet3 = ()=>{
    setBet(3)
  }

  const cheatSwitch = ()=>{
    setCheat(!cheat)
  }

  const changeWinrate = (e)=>{
    setWinrate(e.target.value)
  }

  const checkwin = ()=>{
    if(rollRes[0] == rollRes[1] && rollRes[1] == rollRes[2]){
      setWincount(wincount + 1)
      if(rollRes[0] == '🍒'){
        setIncome((prevIncome) => prevIncome + bet * 5)
      }else if(rollRes[0] == '🍋'){
        setIncome((prevIncome) => prevIncome + bet * 10)
      }else if(rollRes[0] == '🍉'){
        setIncome((prevIncome) => prevIncome + bet * 20)
      }else if(rollRes[0] == '🍊'){
        setIncome((prevIncome) => prevIncome + bet * 25)
      }else if(rollRes[0] == '🍇'){
        setIncome((prevIncome) => prevIncome + bet * 50)
      }else if(rollRes[0] == '🔔'){
        setIncome((prevIncome) => prevIncome + bet * 100)
      }
    }
    if(rollRes[3] == rollRes[4] && rollRes[4] == rollRes[5]){
      setWincount(wincount + 1)
      if(rollRes[3] == '🍒'){
        setIncome((prevIncome) => prevIncome + bet * 5)
      }else if(rollRes[3] == '🍋'){
        setIncome((prevIncome) => prevIncome + bet * 10)
      }else if(rollRes[3] == '🍉'){
        setIncome((prevIncome) => prevIncome + bet * 20)
      }else if(rollRes[3] == '🍊'){
        setIncome((prevIncome) => prevIncome + bet * 25)
      }else if(rollRes[3] == '🍇'){
        setIncome((prevIncome) => prevIncome + bet * 50)
      }else if(rollRes[3] == '🔔'){
        setIncome((prevIncome) => prevIncome + bet * 100)
      }
    }
    if(rollRes[6] == rollRes[7] && rollRes[7] == rollRes[8]){
      setWincount(wincount + 1)
      if(rollRes[6] == '🍒'){
        setIncome((prevIncome) => prevIncome + bet * 5)
      }else if(rollRes[6] == '🍋'){
        setIncome((prevIncome) => prevIncome + bet * 10)
      }else if(rollRes[6] == '🍉'){
        setIncome((prevIncome) => prevIncome + bet * 20)
      }else if(rollRes[6] == '🍊'){
        setIncome((prevIncome) => prevIncome + bet * 25)
      }else if(rollRes[6] == '🍇'){
        setIncome((prevIncome) => prevIncome + bet * 50)
      }else if(rollRes[6] == '🔔'){
        setIncome((prevIncome) => prevIncome + bet * 100)
      }
    }
    if(rollRes[0] == rollRes[4] && rollRes[4] == rollRes[8]){
      setWincount(wincount + 1)
      if(rollRes[0] == '🍒'){
        setIncome((prevIncome) => prevIncome + bet * 5)
      }else if(rollRes[0] == '🍋'){
        setIncome((prevIncome) => prevIncome + bet * 10)
      }else if(rollRes[0] == '🍉'){
        setIncome((prevIncome) => prevIncome + bet * 20)
      }else if(rollRes[0] == '🍊'){
        setIncome((prevIncome) => prevIncome + bet * 25)
      }else if(rollRes[0] == '🍇'){
        setIncome((prevIncome) => prevIncome + bet * 50)
      }else if(rollRes[0] == '🔔'){
        setIncome((prevIncome) => prevIncome + bet * 100)
      }
    }
    if(rollRes[2] == rollRes[4] && rollRes[4] == rollRes[6]){
      setWincount(wincount + 1)
      if(rollRes[2] == '🍒'){
        setIncome((prevIncome) => prevIncome + bet * 5)
      }else if(rollRes[2] == '🍋'){
        setIncome((prevIncome) => prevIncome + bet * 10)
      }else if(rollRes[2] == '🍉'){
        setIncome((prevIncome) => prevIncome + bet * 20)
      }else if(rollRes[2] == '🍊'){
        setIncome((prevIncome) => prevIncome + bet * 25)
      }else if(rollRes[2] == '🍇'){
        setIncome((prevIncome) => prevIncome + bet * 50)
      }else if(rollRes[2] == '🔔'){
        setIncome((prevIncome) => prevIncome + bet * 100)
      }
    }
    setProfit(income - outcome)
  }

  const reset = ()=>{
    setSpin(false)
    setRollres(['🍒','🍋','🍉','🍊','🍇','🔔','🍒','🍋','🍉' ])
    setBet(1)
    setCheat(false)
    setWinrate(0)
    setIncome(0)
    setOutcome(0)
    setProfit(0)
    setCurrentwinrate(0)
    setRollscount(0)
    setWincount(0)
    setWinrateList([])
  }

  const autoSpin = (autoAmount) => {
    let remainingSpins = autoAmount;
    
    const performSpin = () => {
      if (remainingSpins <= 0) return;
      
      setOutcome(prev => prev + bet);
      setSpin(true);
      
      const newResult = cheat ? cheatRand(symbol, 3) : rand(symbol, 9);
      setRollres(newResult);
      setSpin(false);
      setRollscount(prev => prev + 1);
      
      remainingSpins--;
      if (remainingSpins > 0) {
        setTimeout(performSpin, 1); // Wait second between spins
      }
      // setTimeout(() => {
      // }, 1);
    };
    
    performSpin();
  };

function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}

const values = winrateList; // Y-axis values
const labels = range(1, rollscount + 1); // Generates [1, 2, 3, 4, 5]

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

const data = {
  labels: labels,
  datasets: [
    {
      label: "Revenue",
      data: values, // Y-axis values
      borderColor: "white",
      backgroundColor: "rgba(0, 0, 255, 0.2)",
      borderWidth: 2,
      pointRadius: 0,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true, // Makes the chart flexible
  scales: {
    x: {
      title: { display: true, text: "Index" }, // Optional X-axis title
      ticks: { stepSize: 1 }, // Ensure whole numbers on X-axis
    },
    y: {
      title: { display: true, text: "Winrate" }, // Y-axis label
      min: 1, // Start from 1
      max: 100, // End at 100
      ticks: { stepSize: 10 }, // Show labels in steps of 10
    },
  },
};

  return (
    <div>
      <div className='flex justify-center m-6'>
        <p className="text-white">Cheat</p>
        <div onClick={cheatSwitch} disabled={spin} className='w-[60px] h-[25px] bg-slate-700 flex items-center'>
          <div className='bg-green-500 w-[30px] h-[25px]'></div>
          <div className={`w-[30px] h-[30px] bg-white ${cheat ? '' : 'translate-x-[-30px]'} transition-all`}></div>
        </div>
      </div>
      <div className={`${cheat ? '':'invisible'} flex justify-center`}>
        <p className='text-white'>Winrate : {winrate}%</p>
        <input type="range" min="0" max="100" value={winrate} onChange={changeWinrate}/>
      </div>
      <div className='flex justify-center m-4'>
        <input type='text' value={autoAmount} onChange={(e) => setAutoAmount(e.target.value)}></input>
        <button onClick={() => autoSpin(autoAmount)} className='text-white ml-2'>
          AUTO
        </button>
      </div>
      <div className='bg-slate-500 w-[300px] h-[295px] justify-self-center'>
        <div className='flex flex-row justify-evenly'>
          <div className={`${spin ? "spinning bg-[url(/fruity.png)] bg-[center_-0px] bg-repeat-y" : "bg-white"} w-[125px] h-[265px] m-3`}>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[0]}</p>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[3]}</p>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[6]}</p>
          </div>
          <div className={`${spin ? "spinning bg-[url(/public/fruity.png)] bg-[center_-0px] bg-repeat-y" : "bg-white"} w-[125px] h-[265px] m-3`}>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[1]}</p>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[4]}</p>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[7]}</p>
          </div>
          <div className={`${spin ? "spinning bg-[url(/public/fruity.png)] bg-[center_-0px] bg-repeat-y" : "bg-white"} w-[125px] h-[265px] m-3`}>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[2]}</p>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[5]}</p>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[8]}</p>
          </div>
        </div>
        <div className='flex items-center justify-center mt-5'>
          <button onClick={bet1} disabled={spin} className={`${bet == 1 ? "bg-red-600" : "opacity-50"} text-white p-3 font-black outline outline-sky-500`} type="button">
            BET 1
          </button>
          <button onClick={bet2} disabled={spin} className={`${bet == 2 ? "bg-red-600" : "opacity-50"} text-white p-3 font-black outline outline-sky-500`} type="button">
            BET 2
          </button>
          <button onClick={bet3} disabled={spin} className={`${bet == 3 ? "bg-red-600" : "opacity-50"} text-white p-3 font-black outline outline-sky-500`} type="button">
            BET 3
          </button>
        </div>
        <div className='flex items-center justify-center mt-5'>
          <button onClick={Spin} disabled={spin} className="bg-red-600 text-white p-3 font-black outline outline-sky-500" type="button">
            SPIN!
          </button>
        </div>
        <div className='text-white'>
          <p>income : {income}</p>
          <p>outcome : {outcome}</p>
          <p>profit : {profit}</p>
          <p>rolls count : {rollscount}</p>
          <p>win count : {wincount}</p>
          <p>current winrate : {currentwinrate}%</p>
          <button onClick={reset} className="bg-white text-black p-2 m-4 font-black outline outline-sky-500" type="button">reset</button>
        </div>
      </div>
      <div className='w-full h-[500px] mt-[400px]'>
        <Line data={data} options={options}/>
      </div>

    </div>

  )
}

export default Slot
