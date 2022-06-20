import { json, LoaderFunction, redirect } from '@remix-run/node';
import checkAuth from '../util/check-auth';
import { Outlet } from '@remix-run/react';

// Components
import Navigation from '~/components/Layout/Navigation';

export const loader: LoaderFunction = ({ request }) => {
    const cookieHeader = request.headers.get('Cookie');
    const hasAuth = checkAuth(cookieHeader);
    if (!hasAuth) return redirect('/signin');
    return json({});
};

const MainLayout = () => {
    return (
        <div className={`main-layout`}>
            <Navigation />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
