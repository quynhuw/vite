import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginApi from "../../apis/loginApi";
import { ToastContext } from "../../hooks/ToastMessage/ToastContext";

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isValidLogin, setIsValidLogin] = useState(false);
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    if (email != "" && password != "") setIsValidLogin(true);
    else setIsValidLogin(false);
  }, [email, password]);

  const handleLogin = async () => {
    const res = await loginApi(email!, password!);
    if (res.success) {
      res.user.role === 1 ? navigate("/admin") : navigate("/");
      toastContext.showToast("Login successfully!");
    } else {
      toastContext.showToast(res.message);
    }
  };
  return (
    <div className="flex flex-col gap-y-3">
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="p-2 bg-white border rounded border-line"
        type="email"
        required
        placeholder="Email hoặc số điện thoại (*)"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="p-2 bg-white border rounded border-line"
        type="password"
        required
        placeholder="Mật khẩu (*)"
      />
      <button
        onClick={() => handleLogin()}
        disabled={!isValidLogin}
        className={`p-2 bg-primary rounded hover:brightness-110 text-white ${
          !isValidLogin && "!bg-gray-400"
        }`}
      >
        Đăng nhập
      </button>
      <p
        onClick={() => {
          navigate("/forgot-password");
        }}
        className="underline cursor-pointer text-end hover:text-blue-400"
      >
        Quên mật khẩu?
      </p>
    </div>
  );
};

export default Login;
