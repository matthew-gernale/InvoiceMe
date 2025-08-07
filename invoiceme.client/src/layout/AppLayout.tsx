import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

interface LayoutContentProps {
    children: React.ReactNode;
}

const LayoutContent = (props: LayoutContentProps) => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className="min-h-screen xl:flex">
            <div>
                <AppSidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
                    } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <AppHeader />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const AppLayout = (props: LayoutContentProps) => {
    return (
        <SidebarProvider>
            <LayoutContent children={props.children} />
        </SidebarProvider>
    );
};

export default AppLayout;
