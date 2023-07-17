import { useState } from 'react'
import './App.css'
import SocketIO from './Components/SocketIO';

function App() {
  return (
    <div>
    <h1>Cryptocurrency Arbitrage Tracker</h1>
    <SocketIO/>
    {/* Add other components and UI here */}
  </div>
  )
};

export default App
