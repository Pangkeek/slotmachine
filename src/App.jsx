import { useState } from 'react'
import './index.css'

import Slot from './components/Slot'

function App() {
  return (
    <>
      <div className="container mx-auto">
        <p className='text-white font-black text-center text-[50px] m-5'>SLOT Simulator</p>
        <Slot />
      </div>
    </>
  )
}

export default App
