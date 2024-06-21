import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../hooks/ToastMessage/ToastContext";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("2017-06-01");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidRegister, setIsValidRegister] = useState(false);
  const { showToast } = useContext(ToastContext);

  const handleRegister = () => {
    if (confirmPassword != password) showToast("Mật khẩu không trùng khớp!");
  };

  useEffect(() => {
    if (
      userName != "" &&
      email != "" &&
      password != "" &&
      confirmPassword != ""
    )
      setIsValidRegister(true);
    else setIsValidRegister(false);
  }, [userName, email, password, confirmPassword]);

  return (
    <div className="flex flex-col gap-y-3">
      <input
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        className="p-2 bg-white border rounded border-line"
        type="text"
        placeholder="Họ và tên (*)"
      />
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="p-2 bg-white border rounded border-line"
        type="text"
        placeholder="Email"
      />
      <input
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        className="p-2 bg-white border rounded border-line"
        type="text"
        placeholder="Số điện thoại (*)"
      />
      <input
        value={birth}
        onChange={(e) => {
          setBirth(e.target.value);
        }}
        className="p-2 bg-white border rounded border-line"
        type="date"
        placeholder="Ngày sinh (*)"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="p-2 bg-white border rounded border-line"
        type="password"
        placeholder="Mật khẩu (*)"
      />
      <input
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        className="p-2 bg-white border rounded border-line"
        type="password"
        placeholder="Xác nhận lại mật khẩu (*)"
      />
      <button
        onClick={() => handleRegister()}
        disabled={!isValidRegister}
        className={`p-2 bg-primary rounded hover:brightness-110 text-white ${
          !isValidRegister && "!bg-gray-400"
        }`}
      >
        Đăng ký
      </button>
    </div>
  );
};

export default Register;
