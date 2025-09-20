import styles from './Login.module.css'
import { useState } from 'react'

export default function Login(props) {
    const { onLogin } = props

    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [submit, setSubmit] = useState(false)

    function handleInputChange(ident, value) {
        if (ident === "email") {
            setInputEmail(value)
        } else {
            setInputPassword(value)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSubmit(true)
        // Call backend here later
    }

    const emailInvalid = submit && inputEmail !== "" && !inputEmail.includes("@")
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
                            Username phải chứa ký tự @
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

                    <button
                        type="submit"
                        className={styles.submitButton}
                        onClick={() => onLogin()}
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    )
}
