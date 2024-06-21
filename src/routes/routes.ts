import AccountPage from "../pages/AccountPage";
import ForgotPassPage from "../pages/AccountPage/FogotPassPage";
import FilmsPage from "../pages/MoviesPage";
import Homepage from "../pages/Homepage";
import SearchPage from "../pages/SearchPage";
import SeatSelectingPage from "../pages/SeatSelectingPage";
import UserPage from "../pages/UserPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import SuccessBookingPage from "../pages/BookingPage";
import PaymentPage from "../pages/PaymentPage";
import AdminDashboard from "../pages/AdminDashboard";

const pathName = {
  homepage: "/",
  userPage: "/user/:id",
  searchPage: "/search",
  filmsPage: "/movies",
  filmPage: "/movie/:id",
  seatSelectingPage: "/seat-selecting",
  accountPage: "/account",
  forgotPassPage: "/forgot-password",
  successBookingPage: "/success-booking",
  paymentPage: "/redirect-payment",
  adminDashboard: "/admin",
};
type RouteType = {
  path: string;
  element: () => JSX.Element;
};
const routes: RouteType[] = [
  { path: pathName.homepage, element: Homepage },
  { path: pathName.userPage, element: UserPage },
  { path: pathName.searchPage, element: SearchPage },
  { path: pathName.filmsPage, element: FilmsPage },
  { path: pathName.filmPage, element: MovieDetailPage },
  { path: pathName.seatSelectingPage, element: SeatSelectingPage },
  { path: pathName.accountPage, element: AccountPage },
  { path: pathName.forgotPassPage, element: ForgotPassPage },
  { path: pathName.successBookingPage, element: SuccessBookingPage },
  { path: pathName.paymentPage, element: PaymentPage },
  { path: pathName.adminDashboard, element: AdminDashboard },
];

export default routes;
