import ManageDashboard from "./components/manage-dashboard";

const AccountsManagePage = () => {
  const subjects = [
    {
      field: "ID",
      data: "SP001",
      width: 1,
    },
    {
      field: "Tên",
      data: "quỳnh như",
      width: 2,
    },
    {
      field: "Email",
      data: "qinhuuuuu@gmail.com",
      width: 2,
    },
    {
      field: "SĐT",
      data: "0888444777",
      width: 1,
    },
    {
      field: "Ngày tạo",
      data: "29/11/2023",
      width: 2,
    },
    {
      field: "Quyền",
      data: "Khách hàng",
      width: 1,
    },
    {
      field: "Trạng thái",
      data: "Hoạt động",
      width: 1,
    },
  ];
  return <ManageDashboard subjectName="người dùng" subjects={subjects} />;
};
export default AccountsManagePage;
