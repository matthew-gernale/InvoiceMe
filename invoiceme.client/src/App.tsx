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

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
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
