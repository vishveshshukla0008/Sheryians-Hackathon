import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../features/Authentication/pages/LoginPage";
import SignupPage from "../features/Authentication/pages/SignupPage";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
