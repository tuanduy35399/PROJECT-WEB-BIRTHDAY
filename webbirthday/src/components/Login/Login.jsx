import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { loginUser } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [submitted, setSubmitted] = useState(false); // đánh dấu đã submit thành công

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    setErrMsg("");

    if (!inputEmail || inputPassword.trim().length < 6) return;

    try {
      const res = await loginUser({
        username: inputEmail,
        password: inputPassword,
      });

      // Cập nhật context và localStorage
      login(res.data.user, res.data.token);

      // Navigate ngay lập tức
      navigate("/cards", { replace: true });
    } catch (err) {
      console.error(err);
      setErrMsg(err.response?.data?.message || "Đăng nhập thất bại, thử lại!");
    }
  };

  // Điều hướng khi user đã tồn tại trong context
  useEffect(() => {
    if (submitted && user) {
      navigate("/cards", { replace: true });
    }
  }, [submitted, user, navigate]);

  const emailInvalid = submit && inputEmail === "";
  const passwordInvalid = submit && inputPassword.trim().length < 6;

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
            onChange={(e) => setInputEmail(e.target.value)}
            className={`${styles.textInput} ${
              emailInvalid ? styles.formInput1Invalid : ""
            }`}
          />
          {emailInvalid && (
            <p style={{ color: "red", margin: 0 }}>Username là bắt buộc</p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className={`${styles.textInput} ${
              passwordInvalid ? styles.formInput2Invalid : ""
            }`}
          />
          {passwordInvalid && (
            <p style={{ color: "red", margin: 0 }}>
              Password phải chứa ít nhất 6 ký tự
            </p>
          )}

          {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}

          <button type="submit" className={styles.submitButton}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
