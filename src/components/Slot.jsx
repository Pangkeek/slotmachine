import React from 'react'
import { useState,useEffect } from 'react';

//นำเข้า libraly graph
import { Line , Bar } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, BarController, BarElement } from "chart.js";


function Slot() {
  //สร้าง State
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
  const [symbolCounts, setSymbolCounts] = useState({
    '🍒': 0,
    '🍋': 0,
    '🍉': 0,
    '🍊': 0,
    '🍇': 0,
    '🔔': 0
  });

  //อัพเดตความถี่สัญลักษณ์ bar chart
  useEffect(() => {
    if (rollscount > 0) {
      const newCounts = { ...symbolCounts };
      
      rollRes.forEach(symbol => {
        if (newCounts[symbol] !== undefined) {
          newCounts[symbol] += 1;
        }
      });
      
      setSymbolCounts(newCounts);
    }
  }, [rollRes, rollscount]);

  //ตรวจสอบการชนะทุกครั้งที่ผลการสุ่มเปลี่ยน
  useEffect(() => {
    checkwin();
  }, [rollRes]);

  //อัพเดตกำไร
  useEffect(() => {
    setProfit(income - outcome);
  }, [income, outcome, rollscount]);

  //อัพเดต winrate
  useEffect(() => {
    if (rollscount === 0) {
      setCurrentwinrate(0)
    } else {
      setCurrentwinrate((wincount / rollscount) * 100)
    }
  }, [wincount, rollscount])

  //อัพเดตข้อมูล เพื่อ plot graph
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

  //อัพเดต graph
  useEffect(() => {
    if (!auto && !spin) {
      setGraphData(tempData);
    }
  }, [auto, spin]);

  //สัณลักษณ์ทั้งหมด
  const symbol = ['🍒','🍋','🍉','🍊','🍇','🔔']

  //หมุน
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

  //สุ่ม
  const rand = (arr,n)=>{
    const result = []
    for(let i = 0;i < n;i++){
      const randIndex = Math.floor(Math.random()*arr.length)
      result.push(arr[randIndex])
    }
    return result 
  }
  
  //สุ่มแบบล็อกPercent
  const cheatRand = (arr, n) => {
    if (winrate > 0 && Math.random() <= winrate/100) {
      while (true) {
        const tempResult = rand(symbol, 9);
        if (isWinningCombination(tempResult)) {
          return tempResult;
        }
      }
    } else {
      while (true) {
        const tempResult = rand(symbol, 9);
        if (!isWinningCombination(tempResult)) {
          return tempResult;
        }
      }
    }
  }

    const isWinningCombination = (rolls) => {
    if (rolls[0] === rolls[1] && rolls[1] === rolls[2]) return true;
    if (rolls[3] === rolls[4] && rolls[4] === rolls[5]) return true;
    if (rolls[6] === rolls[7] && rolls[7] === rolls[8]) return true;
    
    if (rolls[0] === rolls[4] && rolls[4] === rolls[8]) return true;
    if (rolls[2] === rolls[4] && rolls[4] === rolls[6]) return true;
    
    return false;
  }

  //set ค่า bet
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

  //set การตั้งค่าอัตราชนะ
  const changeWinrate = (e)=>{
    setWinrate(e.target.value)
  }

  //ตรวจสอบการชนะ
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

  //reset State ทั้งหมด
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
    setSymbolCounts({
      '🍒': 0,
      '🍋': 0,
      '🍉': 0,
      '🍊': 0,
      '🍇': 0,
      '🔔': 0
    });
  }

  //หมุน auto
  const autoSpin = (autoAmount) => {
    let remainingSpins = parseInt(autoAmount);
    setAuto(true);
      
    const performSpin = () => {
      if (remainingSpins <= 0) {
        setAuto(false);
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
          setAuto(false);
        }
      }, 1);
    };
      
    performSpin();
  };

  function range(start, end) {
    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale,BarController,BarElement);

  //ข้อมูล graph
  const data = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Winrate",
        data: graphData.winrates,
        borderColor: "white", 
        backgroundColor: "rgba(255, 255, 255, 0.2)", 
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
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
      },
    ],
  };

  const data3 = {
    labels: Object.keys(symbolCounts),
    datasets: [
      {
        label: 'Symbol Frequency',
        data: Object.values(symbolCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',  
          'rgba(255, 206, 86, 0.8)',    
          'rgba(75, 192, 192, 0.8)',    
          'rgba(255, 159, 64, 0.8)',    
          'rgba(153, 102, 255, 0.8)',   
          'rgba(54, 162, 235, 0.8)', 
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: "white", 
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Index", color: "white" }, 
        ticks: { stepSize: 1, color: "white" }, 
        grid: { color: "rgba(255, 255, 255, 0.2)" }, 
      },
      y: {
        title: { display: true, text: "Winrate", color: "white" }, 
        min: 0,
        max: 100,
        ticks: { stepSize: 10, color: "white" }, 
        grid: { color: "rgba(255, 255, 255, 0.2)" }, 
      },
    },
  };
  const options2 = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Index", color: "white" },
        ticks: { stepSize: 1, color: "white" }, 
        grid: { color: "rgba(255, 255, 255, 0.2)" }, 
      },
      y: {
        title: { display: true, text: "Profit", color: "white" }, 
        min: Math.min(...graphData.profits, 0),
        max: Math.max(...graphData.profits, 0) + 100,
        ticks: { stepSize: 10, color: "white" }, 
        grid: { color: "rgba(255, 255, 255, 0.2)" }, 
      },
    },
  };

  const options3 = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const symbol = context.label;
            const count = context.raw;
            const percentage = rollscount * 9 > 0 
              ? ((count / (rollscount * 9)) * 100).toFixed(2) 
              : 0;
            return `${symbol}: ${count} (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frequency',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Symbol',
          color: 'white',
        },
        ticks: {
          color: 'white',
          font: {
            size: 16,
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
  };

  //แสดงผล ( html , tailwind )
  return (
    <div className='grid grid-rows-3 md:grid-cols-3 gap-4'>
      <div className='mr-6 md:order-2'>  
        <img src='logoslot.png'/>
        <div className='relative my-[125px] mx-auto flex justify-center items-center'>
          {}
          <img 
            src='/slotframe.png' 
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[512px] h-[512px] object-contain z-10 pointer-events-none'
          />
          
          {}
          <div className='z-0 flex items-center justify-center'>
            <div className='flex flex-row justify-center ml-[37px] mt-[20px]'>
              <div className={`${spin ? "spinning bg-[url(/fruity.png)] bg-[center_-0px] bg-repeat-y" : "bg-white"} w-[80px] h-[265px]`}>
                <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[0]}</p>
                <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[3]}</p>
                <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[6]}</p>
              </div>
              <div className={`${spin ? "spinning bg-[url(/fruity.png)] bg-[center_-0px] bg-repeat-y" : "bg-white"} w-[80px] h-[250px]`}>
                <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[1]}</p>
                <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[4]}</p>
                <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[7]}</p>
              </div>
              <div className={`${spin ? "spinning bg-[url(/fruity.png)] bg-[center_-0px] bg-repeat-y" : "bg-white"} w-[80px] h-[250px]`}>
                <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[2]}</p>
                <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[5]}</p>
                <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[8]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[244px] bg-[url(/tablebet.png)] flex justify-between items-center">
            <img src="/bet1 1.png" onClick={bet1} disabled={spin} className={`${bet == 1 ? "" : "opacity-50"}`} />
            <img src="/BET 2 1.png" onClick={bet2} disabled={spin} className={`${bet == 2 ? "" : "opacity-50"}`} />
            <img src="/BET 3 1.png" onClick={bet3} disabled={spin} className={`${bet == 3 ? "" : "opacity-50"}`} />
          </div>
          <button onClick={Spin} disabled={spin} className="bg-cyan-400 text-sky-800 p-3 font-black outline outline-white ml-4 rounded-full" type="button">
            SPIN!
          </button>
        </div>
        <div className='flex justify-center m-6'>
          <p className="text-sky-800 font-black">Cheat</p>
          <div onClick={cheatSwitch} disabled={spin} className='w-[60px] h-[25px] bg-slate-700 flex items-center'>
            <div className='bg-green-500 w-[30px] h-[25px]'></div>
            <div className={`w-[30px] h-[30px] bg-white ${cheat ? '' : 'translate-x-[-30px]'} transition-all`}></div>
          </div>
        </div>
        <div className={`${cheat ? '':'invisible'} flex justify-center`}>
          <p className='text-sky-800'>Winrate : {winrate}%</p>
          <input type="range" min="0" max="100" value={winrate} onChange={changeWinrate}/>
        </div>
        <div className='flex justify-center m-4'>
          <input type='text' value={autoAmount} onChange={(e) => setAutoAmount(e.target.value)}></input>
          <button onClick={() => autoSpin(autoAmount)} className='text-sky-800 ml-2 font-black'>
            AUTO
          </button>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center md:items-end'>
        <div>
        <div>
          <img src='/Symbols (1).png'/>
        </div>
        </div>
        <div className='mt-8'>
          <img src='/Win Pattern (1).png'/>
        </div>
      </div>
      <div className='flex flex-col justify-center md:order-3'>
        <div className='text-white bg-blue-500/30 backdrop-blur-md border border-blue-500/50 rounded-lg p-4'>
          <div className='flex'>
            <p className=''>income : {income}</p>
            <p className='ml-4'>outcome : {outcome}</p>
            <p className='ml-4'>profit : {profit}</p>
          </div>
          <div className='w-[400px]'>
            <Line data={data2} options={options2} className='my-8'/>
          </div>
          <div className='flex'>
            <p>rolls count : <br />{rollscount}</p>
            <p className='ml-4'>win count : <br />{wincount}</p>
            <p className='ml-4'>current winrate : <br />{currentwinrate}%</p>
          </div>
          <div className='w-[400px]'>
            <Line data={data} options={options} className='my-8'/>
          </div>
          <div className='flex pl-[75px]'>
            <div className='w-[57px]'>{symbolCounts['🍒']}</div>
            <div className='w-[57px]'>{symbolCounts['🍋']}</div>
            <div className='w-[57px]'>{symbolCounts['🍉']}</div>
            <div className='w-[57px]'>{symbolCounts['🍊']}</div>
            <div className='w-[57px]'>{symbolCounts['🍇']}</div>
            <div className='w-[57px]'>{symbolCounts['🔔']}</div>
          </div>
          <div className='w-[400px]'>
            <Bar data={data3} options={options3} />
          </div>
          <button onClick={reset} className="bg-white text-black p-2 m-4 font-black outline outline-sky-500" type="button">reset</button>
        </div>
      </div>
    </div>
  )
}

export default Slot
