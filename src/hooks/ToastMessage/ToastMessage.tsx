import { useContext } from "react";
import { ToastContext } from "./ToastContext";
import clsx from "clsx";

const ToastMessage = () => {
  const { toast } = useContext(ToastContext);

  if (!toast) return null;

  const toastClasses = clsx(
    "shadow-toast fixed z-[200] w-fit animate-in slide-in-from-left fade-in  duration-500 overflow-auto rounded-md bottom-8 left-10"
  );

  return (
    <div className={toastClasses}>
      <div className="relative flex items-center justify-between gap-4 px-4 py-3 duration-700 bg-white border rounded-lg shadow-2xl border-line ">
        <p className="text-lg font-medium text-black">{toast.message}</p>
        <div className="text-2xl text-[#C9EF50]">{toast.icon}</div>
      </div>
    </div>
  );
};

export default ToastMessage;
