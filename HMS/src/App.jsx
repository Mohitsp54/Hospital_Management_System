import "./App.css";
import LoginPage from "./pages/loginPage";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout";
import Home from "./pages/homePage";
import PatientsPage from "./pages/patientsPage";
import AdminPage from "./pages/adminPage";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Navigate to="/" /> : <Outlet />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="patients/*" element={<PatientsPage />} />
              <Route path="admin/*" element={<AdminPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
