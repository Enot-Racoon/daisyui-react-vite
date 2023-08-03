import React from 'react'

import './App.css'

const App = () => {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)

  return (
    <div className="App">
      <button className="btn" type="button" onClick={increment}>
        count is: {count}
      </button>
    </div>
  )
}

export default App
