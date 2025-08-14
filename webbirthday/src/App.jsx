import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="frame" id="loginRectangle">
        
      </div>

      <p className="big-text" id="textDangNhap" >Đăng nhập</p>

    </>
  )
}

export default App
