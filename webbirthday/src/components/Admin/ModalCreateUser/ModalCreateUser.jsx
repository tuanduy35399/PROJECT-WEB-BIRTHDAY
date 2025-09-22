// ModalCreateUser.jsx
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/userService.js"; // File API riêng

const ModalCreateUser = ({ show, setShow }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleClose = () => {
    setShow(false);
    setUsername("");
    setPassword("");
    setRole("USER");
  };

  const handleSubmit = async () => {
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const response = await postCreateNewUser({
        username,
        password,
        role,
      });

      if (response.data && response.data.message === "User created successfully") {
        toast.success("Tạo tài khoản thành công");
        handleClose();
      } else {
        toast.error(response.data.message || "Lỗi không xác định");
      }
    } catch (error) {
      toast.error("Lỗi server: " + error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Thêm người dùng mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Tên tài khoản</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Vai trò</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateUser;
