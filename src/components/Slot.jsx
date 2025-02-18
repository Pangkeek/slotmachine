import React from 'react'
import { useState,useEffect } from 'react';

import Money from './Money'

function Slot() {
  const [spin,setSpin] = useState(false)
  const [rollRes,setRollres] = useState(['🍒','🍋','🍉'])
  const [bet,setBet] = useState(1)
  const [cheat,setCheat] = useState(false)
  const [winrate,setWinrate] = useState(0)
  const [income,setIncome] = useState(0)
  const [outcome,setOutcome] = useState(0)
  const [profit,setProfit] = useState(0)
  const [currentwinrate,setCurrentwinrate] = useState(0)
  const [rollscount,setRollscount] = useState(0)
  const [wincount,setWincount] = useState(0)

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
        const newResult = rand(symbol,3)
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

  const cheatRand = (arr,n)=>{
    const result = []
    const randIndex = Math.floor(Math.random()*arr.length)
    if(winrate > 0 && Math.random() <= winrate/100 ){
      for(let i = 0;i < n;i++){
        result.push(arr[randIndex])
      }
      return result
    } else {
      while (true) {
        const randomResult = rand(arr, n);
        const allSame = randomResult.every((arr) => arr === randomResult[0]);
  
        if (!allSame) {
          return randomResult;
        }
      }
    }
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
    setProfit(income - outcome)
  }

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
      <div className='bg-slate-500 w-[300px] h-[130px] justify-self-center'>
        <div className='flex flex-row justify-evenly'>
          <div className={`${spin ? "spinning bg-[url(/public/fruity.png)] bg-[center_-0px] bg-repeat-y" : "bg-white"} w-[125px] h-[100px] m-3`}>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[0]}</p>
          </div>
          <div className={`${spin ? "spinning bg-[url(/public/fruity.png)] bg-[center_-0px] bg-repeat-y" : "bg-white"} w-[125px] h-[100px] m-3`}>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[1]}</p>
          </div>
          <div className={`${spin ? "spinning bg-[url(/public/fruity.png)] bg-[center_-0px] bg-repeat-y" : "bg-white"} w-[125px] h-[100px] m-3`}>
            <p className='flex items-center justify-center mt-2 text-[50px]'>{spin ? "" : rollRes[2]}</p>
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
        </div>
      </div>
    </div>

  )
}

export default Slot
