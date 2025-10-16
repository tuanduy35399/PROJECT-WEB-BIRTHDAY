import styles from "./Login.module.css";
import { useState } from "react";
import { loginUser } from "../../services/userService";
import { useAuth } from "../../context/AuthContext"; // Import hook useAuth
import { useNavigate } from "react-router-dom"; // Import hook để điều hướng

export default function Login() { // Xóa prop "onLogin" không cần thiết
  const { login } = useAuth(); //Lấy hàm "login" từ AuthContext
  const navigate = useNavigate(); // Khởi tạo hàm điều hướng

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    setErrMsg("");

    // Kiểm tra validation cơ bản trước khi gọi API
    if (inputEmail === "" || inputPassword.trim().length < 6) {
        return;
    }

    try {
      const res = await loginUser({
        username: inputEmail,
        password: inputPassword,
      });

      // Gọi hàm login từ context để cập nhật toàn bộ ứng dụng
      // Backend của bạn NÊN trả về cả thông tin user (gồm role)
      // Ví dụ: res.data = { token: "...", user: { _id: "...", username: "...", role: "admin" } }
      login(res.data.user, res.data.token); 

      // Sau khi đăng nhập thành công, điều hướng đến trang /cards
      navigate("/cards", { replace: true });

    } catch (err) {
      console.error(err);
      setErrMsg(err.response?.data?.message || "Đăng nhập thất bại, thử lại!");
    }
  };

  const emailInvalid = submit && inputEmail === "";
  const passwordInvalid = submit && inputPassword.trim().length < 6;

  return (
    <div className={styles.loginContainer}>
      {/* ... Phần JSX của bạn giữ nguyên ... */}
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
            <p style={{ color: "red", margin: "0px" }}>Username là bắt buộc</p>
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
            <p style={{ color: "red", margin: "0px" }}>
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
