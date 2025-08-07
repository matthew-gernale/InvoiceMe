import { BrowserRouter as Router, useRoutes, useLocation } from "react-router";
import { routes } from "./routes/routes";
import { useEffect } from "react";
import * as AOS from 'aos';
import { ScrollToTop } from "./components/common/ScrollToTop";
import SuccessModal from '../src/components/ui/modal/SuccessModal'
import { AuthProvider } from "./pages/AuthPages/AuthContext";
import { ToastContainer } from "react-toastify";

const AppRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, [location.pathname]);


    return useRoutes(routes);
};


export default function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <SuccessModal />
                <ToastContainer style={{ zIndex: 100000 }} />

                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </Router>
        </>
    );
}
