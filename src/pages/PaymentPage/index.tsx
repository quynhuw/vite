import { useLocation } from "react-router-dom";
import bookingHistoryApi from "../../apis/bookingHistoryApi";
import { useContext } from "react";
import { ToastContext } from "../../hooks/ToastMessage/ToastContext";
import { BookingStatus } from "../../enum";

const PaymentPage = () => {
  const pathname = useLocation().search;
  const searchParams = new URLSearchParams(pathname);
  const code = searchParams.get("vnp_ResponseCode");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const movieId = JSON.parse(localStorage.getItem("movieId") || "{}");
  const showTimeId = JSON.parse(localStorage.getItem("showTimeId") || "{}");
  const seats = JSON.parse(localStorage.getItem("seats") || "{}");
  const total = JSON.parse(localStorage.getItem("total") || "{}");
  const discount = JSON.parse(localStorage.getItem("discount") || "{}");
  const toast = useContext(ToastContext);
  if (code === "00") {
    window.location.href = "/success-booking";
    toast.showToast("Đặt vé thành công");
    bookingHistoryApi.add(
      user.id,
      showTimeId,
      seats,
      discount,
      total,
      BookingStatus.success
    );
    localStorage.removeItem("movieId");
    localStorage.removeItem("showTimeId");
    localStorage.removeItem("total");
    localStorage.removeItem("discount");
    return <></>;
  }

  window.location.href =
    "/seat-selecting?movieId=" + movieId + "&showTimeId=" + showTimeId;
  toast.showToast("Đặt vé thất bại, vui lòng thử lại!");

  bookingHistoryApi.add(
    user.id,
    showTimeId,
    seats,
    discount,
    total,
    BookingStatus.cancel
  ); // nen add vao 1 booking history fail
  setTimeout(() => {
    localStorage.removeItem("movieId");
    localStorage.removeItem("showTimeId");
    localStorage.removeItem("total");
    localStorage.removeItem("discount");
  }, 1000);

  return <></>;
};
export default PaymentPage;
