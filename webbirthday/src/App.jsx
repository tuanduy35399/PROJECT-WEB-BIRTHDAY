import { useState } from 'react'
import logoctu from './assets/logoctu.png';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full min-h-screen flex">
      <div id="InfoContainer" className="bg-[#00afef] w-[36%] min-h-screen rounded-[20px] "> 
      </div>
      <div id="LoginContainer" className="bg-white w-[64%] min-h-screen flex flex-col justify-end items-center">
         <img src={logoctu} className="absolute top-0 right-0 max-w-[312px] m-4"></img>
        <div id="LoginTitle ">
            <p id="LoginTitleText" className="text-[6rem] mb-12">Đăng nhập</p>
        </div>
       
        <div id="UsernameInput" className="bg-white w-[60%] h-[8rem] border-3 border-[#DADADA] mb-14 rounded-[20px]">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full h-full bg-transparent outline-none text-[4rem] px-10"></input>
        </div>
          
        <div id="PasswordInput" className="bg-white w-[60%] h-[8rem] border-3 border-[#DADADA] mb-14 rounded-[20px]">
          <input
            type="text"
            placeholder="Mật khẩu"
            className="w-full h-full bg-transparent outline-none text-[4rem] px-10"></input>
        </div>
        <div id="LoginButton" className="bg-[#1f5ca9] w-[30%] h-auto px-0.5 rounded-[10px] mb-112">
          <p id="LoginText" className="text-white text-center text-[4rem] py-2">Đăng nhập</p>
          
        </div>
      </div>


    </div>
  )
}

export default App
