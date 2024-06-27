import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassPage = () => {
  const [isValidForgotPass, setIsValidForgotPass] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (email != "") setIsValidForgotPass(true);
    else setIsValidForgotPass(false);
  }, [email]);
  return (
    <div className="my-4 w-[600px] max-w-[90%] border border-line mx-auto rounded">
      <div className="relative">
        <p
          onClick={() => {
            navigate("/account");
          }}
          className="absolute text-gray-400 underline -translate-y-1/2 cursor-pointer top-1/2 left-2 hover:text-blue-400"
        >
          Back
        </p>
        <p className="p-2 text-center border-b-2 border-primary text-primary">
          Quên mật khẩu
        </p>
      </div>
      <div className="flex flex-col p-3 gap-y-3">
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="p-2 bg-white border rounded border-line"
          type="text"
          placeholder="Email hoặc số điện thoại (*)"
        />
        <button
          disabled={!isValidForgotPass}
          className={`p-2 bg-primary rounded hover:brightness-110 text-white ${
            !isValidForgotPass && "!bg-gray-400"
          }`}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ForgotPassPage;
