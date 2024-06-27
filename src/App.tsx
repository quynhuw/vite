import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryBar from "./components/CategoryBar";

function App() {
  return (
    <Router>
      <Header />
      {location.pathname !== "/admin" && <CategoryBar />}
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={<route.element />} />
          );
        })}
      </Routes>
      {location.pathname !== "/admin" && <Footer />}
    </Router>
  );
}

export default App;
