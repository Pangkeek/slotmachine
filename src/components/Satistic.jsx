import React from 'react'

function Satistic() {
  return (
    <div>
        <div className='text-white'>
            <p>income : {income}</p>
            <p>outcome : {outcome}</p>
            <p>profit : {profit}</p>
            <p>rolls count : {rollscount}</p>
            <p>win count : {wincount}</p>
            <p>current winrate : {currentwinrate}%</p>
            <button onClick={reset} className="bg-white text-black p-2 m-4 font-black outline outline-sky-500" type="button">reset</button>
        </div>
        <div className='w-full h-[500px] mt-[400px]'>
            <Line data={data} options={options}/>
            <Line data={data2} options={options2}/>
        </div>
    </div>
  )
}

export default Satistic
