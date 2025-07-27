import {
    Home, CreditCard, ReceiptText, BookUser} from "lucide-react";

export type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// MAIN
export const main: NavItem[] = [
    {
        name: "Dashboard",
        icon: <Home />,
        path: '/'
    },
];


// financials
export const financials: NavItem[] = [
    {
        name: "Invoice",
        icon: <ReceiptText />,
        path: '/all-invoices'
    },
    {
        name: "Payments",
        icon: <CreditCard />,
        path: '/all-payments'
    },
];

// CRM
export const crm: NavItem[] = [
    {
        name: "Client",
        icon: <BookUser />,
        subItems: [
            { name: "Manage", path: "/clients" },
            { name: "Recover clients", path: "/clients/deleted" },
        ],
    },
];

// Humar Resources
//export const hr: NavItem[] = [
//    {
//        name: "User",
//        icon: <BookUser />,
//        path: '/users'
//    },
//];