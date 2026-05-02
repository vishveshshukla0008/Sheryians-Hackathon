import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import RootLayout from "../layouts/RootLayout";
import IncidentLayout from "../layouts/IncidentLayout";
import LoginPage from "../features/Authentication/pages/LoginPage";
import SignupPage from "../features/Authentication/pages/SignupPage";
import HomePage from "../pages/HomePage";
import About from "../pages/About";
import IncidentAdmin from "../features/Incidents/pages/IncidentAdmin";
import IncidentDashboard from "../features/Incidents/pages/IncidentDashboard";
import IncidentDetails from "../features/Incidents/pages/IncidentDetails";
import IncidentStatusPage from "../features/Incidents/pages/IncidentStatusPage";
import TeamManagement from "../features/Incidents/pages/TeamManagement";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignupPage />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/admin" element={<IncidentLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<IncidentDashboard />} />
          <Route path="incidents" element={<IncidentAdmin />} />
          <Route path="incidents/:id" element={<IncidentDetails />} />
          <Route path="status" element={<IncidentStatusPage />} />
          <Route path="team" element={<TeamManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
