import { useEffect, useState } from 'react';
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
    const [isShrink, setIsShrink] = useState(false);

    useEffect(() => {
        const isShrinkLocalS = localStorage.getItem('navIsShrink');
        setIsShrink(isShrinkLocalS === '1' ? true : false);
    }, []);

    return (
        <div
            className={`main-layout ${
                isShrink ? 'main-layout--nav-shrunk' : ''
            }`}
        >
            <Navigation
                isShrink={isShrink}
                setIsShrink={val => {
                    setIsShrink(val);
                    localStorage.setItem('navIsShrink', val ? '1' : '0');
                }}
            />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
