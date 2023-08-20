import React from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import tailwindLogo from './assets/tailwind.svg'

import './App.css'

const App = () => {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="flex">
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">
              <img
                src={tailwindLogo}
                className="logo tailwind"
                alt="Tailwind logo"
              />
            </a>
          </div>
          <h1>Vite + TS + React + Jest + Tailwind CSS</h1>
          <p>{`My favorite fruit is ${
            process.env.VITE_APP_FAVORITE_FRUIT || 'banana'
          }`}</p>
          <div className="card">
            <button className="btn" onClick={increment}>
              count is: {count}
            </button>
            {count > 0 && (
              <p>
                <code>The count is now: {count}</code>
              </p>
            )}
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
            <p className="read-the-docs">Click on the logos to learn more</p>
          </div>
        </header>
      </div>
    </>
  )
}

export default App
