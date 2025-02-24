import { useState } from 'react'
import CssBaseLine from '@mui/material/CSSBaseLine'
import './App.css'
import TodoList from './TodoList'
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseLine/>
      <Navbar/>
      <TodoList/>
    </>
  )
}

export default App
