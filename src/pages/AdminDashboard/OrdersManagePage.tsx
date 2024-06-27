import ManageDashboard from "./components/manage-dashboard";

const MoviesManagePage = () => {
  const subjects = [
    {
      field: "ID",
      data: "DH001",
      width: 1,
    },
    {
      field: "Khách hàng",
      data: "Quỳnh Như",
      width: 2,
    },
    {
      field: "SL",
      data: "6",
      width: 1,
    },
    {
      field: "Tổng ",
      data: "60.000",
      width: 1,
    },
    {
      field: "Ngày mua",
      data: "29/11/2023",
      width: 1,
    },
    {
      field: "Trạng thái giao hàng",
      data: "Chưa xác nhận",
      width: 2,
    },
    {
      field: "Thanh toán",
      data: "Đã thanh toán",
      width: 2,
    },
  ];
  return <ManageDashboard subjectName="đơn hàng" subjects={subjects} />;
};
export default MoviesManagePage;
