import { useState } from 'react'
import CssBaseLine from '@mui/material/CSSBaseLine'
import './App.css'
import TodoList from './TodoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseLine/>
      <h1>Todos</h1>
      <TodoList/>
    </>
  )
}

export default App
