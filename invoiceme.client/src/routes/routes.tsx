import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router'
import type { RouteObject } from 'react-router'

import type { AuthGuardProps } from '../@types/auth.type'
import { useAuth } from '../hooks'

import AppLayout from '../layout/AppLayout'

import Dashboard from '../pages/Dashboard/Analytics'
import ClientDashboard from '../pages/Dashboard/ClientDashboard'

import LoadingScreen from '../components/skeleton/LoadingScreen'
import Unauthorized from '../pages/AuthPages/Unauthorized'

import AllInvoicePage from '../pages/Invoice/AllInvoicePage'
import AllPaymentsPage from '../pages/PaymentPages/AllPaymentsPage'
import AllClientsPage from '../pages/ClientPages/AllClientsPage'
import AllDeletedClientsPage from '../pages/ClientPages/AllDeletedClientsPage'
import ClientDetailsPage from '../pages/ClientPages/ClientDetailsPage'

const SignIn = lazy(() => import('../pages/AuthPages/SignIn'));


export const AuthGuard = ({ children, roles }: AuthGuardProps) => {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/signin" replace />;
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
        return (
            <AppLayout>
                <Unauthorized />
            </AppLayout>
        );
    }

    return <AppLayout>{children}</AppLayout>;
};


const publicRoutes: RouteObject[] = [
    {
        path: '/signin',
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <SignIn />
            </Suspense>
        ),
    },
];

const protectedRoutes: RouteObject[] = [
    {
        path: '/',
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <AuthGuard roles={['ADMIN']}>
                    <Dashboard />
                </AuthGuard>
            </Suspense>
        ),
    },
    {
        path: '/client-dashboard',
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <AuthGuard roles={['CLIENT']}>
                    <ClientDashboard />
                </AuthGuard>
            </Suspense>
        ),
    },
    {
        path: '/all-invoices',
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <AuthGuard roles={['ADMIN', 'CLIENT']}>
                    <AllInvoicePage />
                </AuthGuard>
            </Suspense>
        ),
    },
    {
        path: '/all-payments',
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <AuthGuard roles={['ADMIN', 'CLIENT']}>
                    <AllPaymentsPage />
                </AuthGuard>
            </Suspense>
        ),
    },
    {
        path: '/clients',
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <AuthGuard roles={['ADMIN']}>
                    <AllClientsPage />
                </AuthGuard>
            </Suspense>
        ),
    },
    {
        path: '/clients/deleted',
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <AuthGuard roles={['ADMIN']}>
                    <AllDeletedClientsPage />
                </AuthGuard>
            </Suspense>
        ),
    },
    {
        path: '/clients/:clientId',
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <AuthGuard roles={['ADMIN']}>
                    <ClientDetailsPage />
                </AuthGuard>
            </Suspense>
        ),
    },
];


export const routes: RouteObject[] = [
    ...publicRoutes,
    ...protectedRoutes,
];
