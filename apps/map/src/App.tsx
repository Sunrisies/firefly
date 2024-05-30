import { useState,useEffect } from 'react'
import './App.css'
// import * as turf from '@turf/turf'
import * as Cesium from 'cesium'

function App() {
  // const [point1, setPoint1] = useState({ longitude: 0, latitude: 0 })
  // const [point2, setPoint2] = useState({ longitude: 0, latitude: 0 })
  // const [distance, setDistance] = useState(0)

  // const calculateDistance = () => {
  //   const point1s = turf.point([point1.longitude, point1.latitude]);
  //   const point2s = turf.point([point2.longitude, point2.latitude]);
  //   const distance = turf.distance(point1s, point2s,  'kilometers' );
  //   setDistance(distance);
  // }
  useEffect(() => {
    // 初始化Cesium
    const viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox: false
    })
}, [])

  return (
    <>
      {/* <div className="container">
        <div>
          <span>点1 经度:</span>
          <input
            type="number"
            placeholder="请输入经度"
            value={point1.longitude}
            onChange={(e) => setPoint1({ ...point1, longitude: parseFloat(e.target.value) })}
          />
          <span>纬度:</span>
          <input
            type="number"
            placeholder="请输入纬度"
            value={point1.latitude}
            onChange={(e) => setPoint1({ ...point1, latitude: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <span>点2 经度:</span>
          <input
            type="number"
            placeholder="请输入经度"
            value={point2.longitude}
            onChange={(e) => setPoint2({ ...point2, longitude: parseFloat(e.target.value) })}
          />
          <span>纬度:</span>
          <input
            type="number"
            placeholder="请输入纬度"
            value={point2.latitude}
            onChange={(e) => setPoint2({ ...point2, latitude: parseFloat(e.target.value) })}
          />
        </div>
        <button onClick={calculateDistance}>计算距离</button>
        <div>距离: {distance} 千米</div>
      </div>
     */}
      {/* <div id="cesiumContainer" /> */}
      </>
  )
}

export default App
