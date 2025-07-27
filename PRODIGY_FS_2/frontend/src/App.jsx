
// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { isAuthenticated } from "./utils/auth";

import Employee from "./components/Employee";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeEdit from "./components/EmployeeEdit";
import EmployeeCreate from "./components/EmployeeCreate";
import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";

// Layout that conditionally renders Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const noLayoutRoutes = ["/login", "/signup"];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <Fragment>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </Fragment>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/create" element={<EmployeeCreate />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/employees/:id/edit" element={<EmployeeEdit />} />
          <Route
            path="/dashboard"
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
