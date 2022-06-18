import { json, LoaderFunction, redirect } from '@remix-run/node';
import checkAuth from '../util/check-auth';
import { Outlet } from '@remix-run/react';
// Components
import Navigation from '~/components/Layout/Navigation';
import NavItem from '~/components/Partials/NavItem';

export const loader: LoaderFunction = ({ request }) => {
    const cookieHeader = request.headers.get('Cookie');
    const hasAuth = checkAuth(cookieHeader);
    if (!hasAuth) return redirect('/signin');
    return json({});
};

const MainLayout = () => {
    const navItems = (
        <>
            <NavItem to="/" prefetch="intent" title="Dashboard" />
            <NavItem to="/components" prefetch="intent" title="Components" />
            <NavItem to="/kits" prefetch="intent" title="Kits" />
            <NavItem to="/plugins" prefetch="intent" title="Plugins" />
            <NavItem to="/orders" prefetch="intent" title="Orders" />
            <NavItem to="/settings" prefetch="intent" title="Settings" />
        </>
    );

    return (
        <div className="main-layout">
            <Navigation
                navChild={navItems}
                footerChild={<>I AM THE FOOTER</>}
            />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
