import { BrowserRouter as Router, Routes, Route } from "react-router";
import Ecommerce from "./pages/Dashboard/Ecommerce";
import Stocks from "./pages/Dashboard/Stocks";
import Crm from "./pages/Dashboard/Crm";
import Marketing from "./pages/Dashboard/Marketing";
import Analytics from "./pages/Dashboard/Analytics";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import TwoStepVerification from "./pages/AuthPages/TwoStepVerification";
import AppLayout from "./layout/AppLayout";
import Saas from "./pages/Dashboard/Saas";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ComingSoon from "./pages/OtherPage/ComingSoon";
import AllInvoicePage from "./pages/Invoice/AllInvoicePage";
import SuccessModal from '../src/components/ui/modal/SuccessModal'
import AllClientsPage from "./pages/ClientPages/AllClientsPage";
import ClientDetailsPage from "./pages/ClientPages/ClientDetailsPage";
import AllDeletedClientsPage from "./pages/ClientPages/AllDeletedClientsPage";
import AllPaymentsPage from "./pages/PaymentPages/AllPaymentsPage";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <SuccessModal />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Ecommerce />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/crm" element={<Crm />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/saas" element={<Saas />} />
            <Route path="/all-invoices" element={<AllInvoicePage />} />
            <Route path="/clients" element={<AllClientsPage />} />
            <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
            <Route path="/clients/deleted" element={<AllDeletedClientsPage />} />
            <Route path="/all-payments" element={<AllPaymentsPage />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/two-step-verification"
            element={<TwoStepVerification />}
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </Router>
    </>
  );
}
