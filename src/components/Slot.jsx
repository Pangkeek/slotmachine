import React from 'react'
import { useState,useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";


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
  const [graphData, setGraphData] = useState({
    winrates: [],
    profits: [],
    labels: []
  });
  const [tempData, setTempData] = useState({
    winrates: [],
    profits: [],
    labels: []
  });

  useEffect(() => {
    checkwin();
  }, [rollRes]);

  useEffect(() => {
    setProfit(income - outcome);
  }, [income, outcome, rollscount]);

  useEffect(() => {
    if (rollscount === 0) {
      setCurrentwinrate(0)
    } else {
      setCurrentwinrate((wincount / rollscount) * 100)
    }
  }, [wincount, rollscount])

  useEffect(() => {
    if (rollscount > 0) {
      const newWinrate = (wincount / rollscount) * 100;
      const newProfit = income - outcome;
      
      setTempData(prev => ({
        winrates: [...prev.winrates, newWinrate],
        profits: [...prev.profits, newProfit],
        labels: Array.from({ length: rollscount }, (_, i) => i + 1)
      }));
    }
  }, [rollscount, wincount, income, outcome]);

  useEffect(() => {
    if (!auto && !spin) {
      setGraphData(tempData);
    }
  }, [auto, spin]);

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
        setIncome((prevIncome) => prevIncome + bet * 2)
      }else if(rollRes[0] == '🍋'){
        setIncome((prevIncome) => prevIncome + bet * 3)
      }else if(rollRes[0] == '🍉'){
        setIncome((prevIncome) => prevIncome + bet * 5)
      }else if(rollRes[0] == '🍊'){
        setIncome((prevIncome) => prevIncome + bet * 10)
      }else if(rollRes[0] == '🍇'){
        setIncome((prevIncome) => prevIncome + bet * 20)
      }else if(rollRes[0] == '🔔'){
        setIncome((prevIncome) => prevIncome + bet * 50)
      }
    }
    if(rollRes[3] == rollRes[4] && rollRes[4] == rollRes[5]){
      setWincount(wincount + 1)
      if(rollRes[0] == '🍒'){
        setIncome((prevIncome) => prevIncome + bet * 2)
      }else if(rollRes[0] == '🍋'){
        setIncome((prevIncome) => prevIncome + bet * 3)
      }else if(rollRes[0] == '🍉'){
        setIncome((prevIncome) => prevIncome + bet * 5)
      }else if(rollRes[0] == '🍊'){
        setIncome((prevIncome) => prevIncome + bet * 10)
      }else if(rollRes[0] == '🍇'){
        setIncome((prevIncome) => prevIncome + bet * 20)
      }else if(rollRes[0] == '🔔'){
        setIncome((prevIncome) => prevIncome + bet * 50)
      }
    }
    if(rollRes[6] == rollRes[7] && rollRes[7] == rollRes[8]){
      setWincount(wincount + 1)
      if(rollRes[0] == '🍒'){
        setIncome((prevIncome) => prevIncome + bet * 2)
      }else if(rollRes[0] == '🍋'){
        setIncome((prevIncome) => prevIncome + bet * 3)
      }else if(rollRes[0] == '🍉'){
        setIncome((prevIncome) => prevIncome + bet * 5)
      }else if(rollRes[0] == '🍊'){
        setIncome((prevIncome) => prevIncome + bet * 10)
      }else if(rollRes[0] == '🍇'){
        setIncome((prevIncome) => prevIncome + bet * 20)
      }else if(rollRes[0] == '🔔'){
        setIncome((prevIncome) => prevIncome + bet * 50)
      }
    }
    if(rollRes[0] == rollRes[4] && rollRes[4] == rollRes[8]){
      setWincount(wincount + 1)
      if(rollRes[0] == '🍒'){
        setIncome((prevIncome) => prevIncome + bet * 2)
      }else if(rollRes[0] == '🍋'){
        setIncome((prevIncome) => prevIncome + bet * 3)
      }else if(rollRes[0] == '🍉'){
        setIncome((prevIncome) => prevIncome + bet * 5)
      }else if(rollRes[0] == '🍊'){
        setIncome((prevIncome) => prevIncome + bet * 10)
      }else if(rollRes[0] == '🍇'){
        setIncome((prevIncome) => prevIncome + bet * 20)
      }else if(rollRes[0] == '🔔'){
        setIncome((prevIncome) => prevIncome + bet * 50)
      }
    }
    if(rollRes[2] == rollRes[4] && rollRes[4] == rollRes[6]){
      setWincount(wincount + 1)
      if(rollRes[0] == '🍒'){
        setIncome((prevIncome) => prevIncome + bet * 2)
      }else if(rollRes[0] == '🍋'){
        setIncome((prevIncome) => prevIncome + bet * 3)
      }else if(rollRes[0] == '🍉'){
        setIncome((prevIncome) => prevIncome + bet * 5)
      }else if(rollRes[0] == '🍊'){
        setIncome((prevIncome) => prevIncome + bet * 10)
      }else if(rollRes[0] == '🍇'){
        setIncome((prevIncome) => prevIncome + bet * 20)
      }else if(rollRes[0] == '🔔'){
        setIncome((prevIncome) => prevIncome + bet * 50)
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
    setTempData({
      winrates: [],
      profits: [],
      labels: []
    });
    setGraphData({
      winrates: [],
      profits: [],
      labels: []
    });
  }

  const autoSpin = (autoAmount) => {
    let remainingSpins = parseInt(autoAmount);
    setAuto(true);
      
    const performSpin = () => {
      if (remainingSpins <= 0) {
        setAuto(false);  // Make sure to set auto to false when done
        return;
      }
        
      setOutcome(prev => prev + bet);
      setSpin(true);
        
      setTimeout(() => {
        const newResult = cheat ? cheatRand(symbol, 3) : rand(symbol, 9);
        setRollres(newResult);
        setSpin(false);
        setRollscount(prev => prev + 1);
        remainingSpins--;
        if (remainingSpins > 0) {
          setTimeout(performSpin, 1);
        } else {
          setAuto(false);  // Make sure to set auto to false when done
        }
      }, 1);
    };
      
    performSpin();
  };

  function range(start, end) {
    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

  const data = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Winrate",
        data: graphData.winrates,
        borderColor: "white",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
      },
    ],
  };

  const data2 = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Profit",
        data: graphData.profits,
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
    maintainAspectRatio: true,
    scales: {
      x: {
        title: { display: true, text: "Index" },
        ticks: { stepSize: 1 },
      },
      y: {
        title: { display: true, text: "Winrate" },
        min: 0,
        max: 100,
        ticks: { stepSize: 10 },
      },
    },
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        title: { display: true, text: "Index" },
        ticks: { stepSize: 1 },
      },
      y: {
        title: { display: true, text: "Profit" },
        min: Math.min(...graphData.profits, 0),
        max: Math.max(...graphData.profits, 0) + 100,
        ticks: { stepSize: 10 },
      },
    },
  };

  const payouts = [
    { symbols: "🔔🔔🔔", bet1: 50, bet2: 100, bet3: 150 },
    { symbols: "🍇🍇🍇", bet1: 25, bet2: 50, bet3: 75 },
    { symbols: "🍉🍉🍉", bet1: 15, bet2: 30, bet3: 45 },
    { symbols: "🍊🍊🍊", bet1: 10, bet2: 20, bet3: 30 },
    { symbols: "🍋🍋🍋", bet1: 5, bet2: 10, bet3: 15 },
    { symbols: "🍒🍒🍒", bet1: 3, bet2: 6, bet3: 9 },
  ];

  return (
    <div className='grid grid-cols-3'>
      <div>
        <div className="flex flex-col items-center text-white min-h-screen p-6">
          <h2 className="text-2xl font-bold mb-4">🎰 Payout Table 🎰</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-md border border-gray-700 text-center">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700">Symbols</th>
                <th className="p-3 border border-gray-700">Bet 1</th>
                <th className="p-3 border border-gray-700">Bet 2</th>
                <th className="p-3 border border-gray-700">Bet 3</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((row, index) => (
                <tr key={index} className="border border-gray-700 hover:bg-gray-700">
                  <td className="p-3 text-xl">{row.symbols}</td>
                  <td className="p-3">{row.bet1}x</td>
                  <td className="p-3">{row.bet2}x</td>
                  <td className="p-3">{row.bet3}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-bold mb-4 mt-12">Win Pettern</h2>
        <div className='flex'>
          <img src={'/pettern1.png'} alt="My Description" className='w-[75px] m-2'/>
          <img src={'/pettern2.png'} alt="My Description" className='w-[75px] m-2'/>
          <img src={'/pettern3.png'} alt="My Description" className='w-[75px] m-2'/>
          <img src={'/pettern4.png'} alt="My Description" className='w-[75px] m-2'/>
          <img src={'/pettern6.png'} alt="My Description" className='w-[75px] m-2'/>
        </div>
      </div>
      </div>
      <div className=''>  
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
      </div>
      <div>
        <div className='text-white'>
          <p>income : {income}</p>
          <p>outcome : {outcome}</p>
          <p>profit : {profit}</p>
          <Line data={data2} options={options2} className='my-8'/>
          <p>rolls count : {rollscount}</p>
          <p>win count : {wincount}</p>
          <p>current winrate : {currentwinrate}%</p>
          <Line data={data} options={options} className='my-8'/>
          <button onClick={reset} className="bg-white text-black p-2 m-4 font-black outline outline-sky-500" type="button">reset</button>
        </div>
      </div>
    </div>

  )
}

export default Slot
