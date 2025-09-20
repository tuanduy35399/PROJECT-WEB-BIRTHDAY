import './Login.css'
import { useState } from 'react'
export default function Login(props){
    
    const {onLogin} = props
    const [inputEmail, setInputEmail]=useState("");
    const [inputPassword, setInputPassword]=useState("");
    // const [isNotValid, setIsNotValid] = useState(false);
    const [submit,setSubmit]= useState(false);
    function handleInputChange(ident, value){
        if(ident==="email"){
            setInputEmail(value)
        }
        else setInputPassword(value)
    }
    // function handleSubmit(){
    //     setSubmit(true)
    // }
    function handleSubmit(e) {
    e.preventDefault()
    setSubmit(true);

    // Sau này kết nối backend ở đây
  }
    const emailInvalid= (submit && inputEmail!="" && !inputEmail.includes("@"));
    const passwordInvalid= (submit && inputPassword!="" && (inputPassword.trim()).length<6);
    return (
       <div className='login-container'>
        <div className="layout_login">
            <div className="header">
                <div className="circle"></div>
            </div>
            <form className="form" onSubmit={(e)=>handleSubmit(e)}
                >
                <p className="form-title">Đăng nhập</p>
                <input className={`form-input1 ${emailInvalid ?'invalid':undefined}`} type="text" placeholder="Username" 
                value={inputEmail} onChange={(e)=>handleInputChange("email",e.target.value)} />
                {(emailInvalid) && <p style={{ color: "red", margin:"0px"}}>Username phải chứa ký tự @</p>}
                <input className={`form-input2 ${passwordInvalid?"invalid":undefined}`} type="password" placeholder="Password"
                value={inputPassword} onChange={(e)=>handleInputChange("password",e.target.value)}/>
                {(passwordInvalid) && <p style={{ color: "red", margin:"0px"}}>Password phải chứa ít nhất 6 ký tự</p>}
                <button type="submit" onClick={()=> onLogin()}>Đăng nhập</button>
            </form>
        </div>
       </div>
)}