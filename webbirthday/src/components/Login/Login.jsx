import styles from './Login.module.css'
import { useState } from 'react'
import axios from 'axios'
export default function Login({onLogin}) {

    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [submit, setSubmit] = useState(false)
    //check error
    const [errMsg, setErrMsg] = useState("");

    function handleInputChange(ident, value) {
        if (ident === "email") {
            setInputEmail(value)
        } else {
            setInputPassword(value)
        }
    }

    const handleSubmit= async (e)=> {
        e.preventDefault()
        setSubmit(true)
        setErrMsg("");

        try {
            const res = await axios.post("http://localhost:5000/api/users/login", {
                username: inputEmail,
                password: inputPassword,
            })
            //Luu token vao trong localStorage cho lan dang nhap do
            localStorage.setItem("token", res.data.token);
            //Goi ham on Login de chuyen de MainApp
            onLogin();
        }catch (err) {
        console.error(err)
            setErrMsg(
                err.response?.data?.message || "Đăng nhập thất bại, thử lại!"
            )
        } 
    }

    const emailInvalid = submit && inputEmail !== "";
    const passwordInvalid = submit && inputPassword !== "" && inputPassword.trim().length < 6

    return (
        <div className={styles.loginContainer}>
            <div className={styles.layoutLogin}>
                <div className={styles.header}>
                    <div className={styles.circle}></div>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <p className={styles.formTitle}>Đăng nhập</p>

                    <input
                        type="text"
                        placeholder="Username"
                        value={inputEmail}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`${styles.textInput} ${emailInvalid ? styles.formInput1Invalid : ''}`}
                    />
                    {emailInvalid && (
                        <p style={{ color: "red", margin: "0px" }}>
                            Username là bắt buộc
                        </p>
                    )}

                    <input
                        type="password"
                        placeholder="Password"
                        value={inputPassword}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`${styles.textInput} ${passwordInvalid ? styles.formInput2Invalid : ''}`}
                    />
                    {passwordInvalid && (
                        <p style={{ color: "red", margin: "0px" }}>
                            Password phải chứa ít nhất 6 ký tự
                        </p>
                    )}


                    {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    )
}
