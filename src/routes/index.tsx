import { Routes, Route } from "react-router-dom";

import Layout from "../layout/Layout";
import DashboardLayout from "../layout/DashboardLayout"; 
import AdminLayout from "../components/admin/AdminLayout"; 

import HomePage from "../pages/Home/Index";
import ApplyPage from "../pages/ApplyPage";
import NoticesPage from "../pages/NoticesPage";
import HelpDeskPage from "../pages/HelpDesk/index";
import LoginPage from "../pages/LoginPage";

// Student Dashboard Pages
import Dashboard from "../pages/Dashboard/Student/Dashboard";
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import Result from "../pages/Dashboard/Student/Result";
import AdmitCard from "../pages/Dashboard/Student/AdmitCard";
import PaymentStatus from "../pages/Dashboard/Student/PaymentStatus";
import ContactSupport from "../pages/Dashboard/Student/ContactSupport";

// Admin Dashboard Pages
import DashboardPage from "../components/admin/DashboardPage"; 
import AdminLoginPage from "../components/admin/AdminLoginPage";
import LiveStatsPage from "../components/admin/LiveStatsPage";
import ApplicationManagement from "../components/admin/ApplicationManagement";
import ApplicationControlPanel from "../components/admin/ApplicationControlPanel";
import AdmitCardManagement from "../components/admin/AdmitCardManagement";
import SystemDataExport from "../components/admin/SystemDataExport";
import CommunicationsAdminPortal from "../components/admin/CommunicationsAdminPortal";
import CandidateDetailPage from "../components/admin/CandidateDetailPage";
import ScrollToTop from "../components/common/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Index = () => {
  return (
    <>
    <ToastContainer />
    <ScrollToTop />
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="apply-now" element={<ApplyPage />} />
        <Route path="notices" element={<NoticesPage />} /> 
        <Route path="help-desk" element={<HelpDeskPage />} />
        <Route path="candidate-login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage/>} />
      </Route>
      
      

      {/* ================= STUDENT DASHBOARD ROUTES ================= */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="my-applications" element={<MyApplications />} />
        <Route path="result" element={<Result />} />
        <Route path="admit-card" element={<AdmitCard />} />
        <Route path="payment-status" element={<PaymentStatus />} />
        <Route path="contact-support" element={<ContactSupport />} />
      </Route>

      {/* ================= ADMIN DASHBOARD ROUTES ================= */}
      {/* 3. Added the dedicated /admin namespace route hierarchy */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route  path="live" element={<LiveStatsPage />} />
      <Route path="verify" element={<ApplicationManagement />} />
        <Route path="applications" element={<ApplicationControlPanel />} />
        <Route path="admit-card-issue" element={<AdmitCardManagement />} />
        <Route path="new-broadcast" element={<CommunicationsAdminPortal />} />
        <Route path="data-export-hub" element={<SystemDataExport />} />
        <Route path="candidates/:id" element={<CandidateDetailPage />} />
      </Route>
    </Routes>

    </> 
  );
};

export default Index;
