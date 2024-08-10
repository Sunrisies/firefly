import { useState, useEffect } from 'react'
// import { getContentDimensions, add, conversionTime } from 'sunrise-utils'
import { distanceLngLat } from 'sunrise-utils'
import './App.css'
function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(distanceLngLat(116.46, 39.92, 116.46, 39.91), 'ddddd')
    // console.log(add, 'de,p', conversionTime(1713196800))
    // console.log(getContentDimensions('title'), 'MyModule')
  })
  return (
    <>
      <h1 className="title">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
