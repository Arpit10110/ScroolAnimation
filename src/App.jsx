import React from 'react'
import { HashRouter as Router , Routes,Route } from 'react-router-dom'
import Home from "./Pages/Home.jsx"
import "./Style/style.css"
const App = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  </Router>
  )
}

export default App
