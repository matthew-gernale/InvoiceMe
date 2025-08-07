import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import authService from "../services/authService";

// Assume these icons are imported from an icon library
import {
    ChevronDownIcon,
    HorizontaLDots,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { main, financials, crm, client_items } from "./menuItems";


type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: SubItem[];
};

type SubItem = {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
};

type MenuType =
    | "main"
    | "financials"
    | "crm"
    | "client";

const MENU_SECTIONS: { label: string; type: MenuType; items: NavItem[] }[] = [
    { label: "Menu", type: "main", items: main },
    { label: "Financials", type: "financials", items: financials },
    { label: "CRM", type: "crm", items: crm },
];


// Client Navigation
const CLIENT_NAVIGATION: { label: string; type: MenuType; items: NavItem[] }[] = [
    { label: "", type: "client", items: client_items },
];

const AppSidebar: React.FC = () => {
    const navigate = useNavigate();

    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();
    const [openSubmenu, setOpenSubmenu] = useState<{ type: MenuType; index: number } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

    const [navItems, setNavItems] = useState<{ label: string; type: MenuType; items: NavItem[] }[]>([]);

    const [role, setRole] = useState<string>();

    useEffect(() => {
        const fetchMenu = async () => {
            const isSuccess = await authService.refreshToken();

            if (isSuccess) {
                const userClaims = await authService.getUserClaims();
                setRole(userClaims?.role);

                switch (userClaims?.role) {
                    case 'ADMIN':
                        setNavItems(MENU_SECTIONS);
                        break;

                    case 'CLIENT':
                        setNavItems(CLIENT_NAVIGATION);
                        break;
                }

                for (const section of navItems) {
                    for (let i = 0; i < section.items.length; i++) {
                        const item = section.items[i];
                        if (item.subItems?.some(sub => isActive(sub.path))) {
                            setOpenSubmenu({ type: section.type, index: i });
                            return;
                        }
                    }
                }
                setOpenSubmenu(null);
            }
        };

        fetchMenu();

    }, [location, isActive, navItems]);

    const logoNavigation = () => {
        switch (role) {
            case 'ADMIN':
                navigate('/');
                break;

            case 'CLIENT':
                navigate('/client-dashboard');
                break;

            default:
                navigate('/signin');
                break;
        }
    }

    useEffect(() => {
        if (openSubmenu) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            const el = subMenuRefs.current[key];
            if (el) {
                setSubMenuHeight(prev => ({ ...prev, [key]: el.scrollHeight || 0 }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (type: MenuType, index: number) => {
        setOpenSubmenu(prev =>
            prev?.type === type && prev.index === index ? null : { type, index }
        );
    };

    const renderItems = (items: { label: string; type: MenuType; items: NavItem[] }[]) => (
        <div>
            {items.map((section) => (
                <div key={section.type}>
                    <h2
                        className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                            ? "lg:justify-center"
                            : "justify-start"
                            }`}
                    >
                        {isExpanded || isHovered || isMobileOpen ? section.label : <HorizontaLDots className="size-6" />}
                    </h2>

                    {renderItemsInSection(section.items, section.type)}
                </div>
            ))}
        </div>
    );

    const renderItemsInSection = (items: NavItem[], type: MenuType) => (
        <ul className="flex flex-col gap-4">
            {items.map((item, index) => {
                const key = `${type}-${index}`;
                const isOpen = openSubmenu?.type === type && openSubmenu?.index === index;

                return (
                    <li key={item.name}>
                        {item.subItems ? (
                            <button
                                onClick={() => {
                                    handleSubmenuToggle(type, index);
                                }}
                                className={`menu-item group ${isOpen ? "menu-item-active" : "menu-item-inactive"} ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                            >
                                <span className={`menu-item-icon-size ${isOpen ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                                    {item.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{item.name}</span>}
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <ChevronDownIcon className={`ml-auto w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180 text-emerald-600" : ""}`} />
                                )}
                            </button>
                        ) : (
                            item.path && (
                                <Link to={item.path}
                                    className={`menu-item group ${isActive(item.path) ? "menu-item-active" : "menu-item-inactive"}`}>
                                    <span className={`menu-item-icon-size ${isActive(item.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                                        {item.icon}
                                    </span>
                                    {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{item.name}</span>}
                                </Link>
                            )
                        )}

                        {item.subItems && (isExpanded || isHovered || isMobileOpen) && (
                            <div
                                ref={(el: HTMLDivElement | null): void => { subMenuRefs.current[key] = el; }}
                                className="overflow-hidden transition-all duration-300"
                                style={{ height: isOpen ? `${subMenuHeight[key]}px` : "0px" }}
                            >
                                <ul className="mt-2 space-y-1 ml-9">
                                    {item.subItems.map(sub => (
                                        <li key={sub.name}>
                                            <Link
                                                to={sub.path}
                                                className={`menu-dropdown-item ${isActive(sub.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}
                                            >
                                                {sub.name}
                                                <span className="flex items-center gap-1 ml-auto">
                                                    {sub.new && <span className="menu-dropdown-badge">new</span>}
                                                    {sub.pro && <span className="menu-dropdown-badge">pro</span>}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <aside
            className={`bg-white fixed flex flex-col top-0 px-5 left-0 dark:bg-gray-900 dark:border-gray-800 h-screen z-50 border-r border-gray-200 transition-all duration-300
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"} 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`pt-[120px] lg:pt-[50px] pb-8 flex justify-center`}>
                <p
                    className={`${isExpanded || isHovered ? 'text-[25px]' : 'text-[10px]'} 
                                    font-semibold text-emerald-600 cursor-pointer select-none`}
                    onClick={logoNavigation}
                >
                    InvoiceMe
                </p>
            </div>

            <div className="flex flex-col overflow-y-auto no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        {renderItems(navItems)}
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
