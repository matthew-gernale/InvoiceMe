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

const invoiceNav: NavItem =
{
    name: "Invoice",
    icon: <ReceiptText />,
    path: '/all-invoices'
};


const paymentNav: NavItem =
{
    name: "Payments",
    icon: <CreditCard />,
    path: '/all-payments'
};

// financials
export const financials: NavItem[] = [
    invoiceNav,
    paymentNav
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


// CLIENT NAVIGATIONS
export const client_items: NavItem[] = [
    {
        name: "Dashboard",
        icon: <Home />,
        path: '/client-dashboard'
    },
    invoiceNav,
    paymentNav
];
