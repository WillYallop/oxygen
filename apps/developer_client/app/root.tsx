import type { MetaFunction, LinksFunction } from '@remix-run/node';
import styles from './styles/main.css';
require('../public/fonts/Inter-Bold.woff');
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react';
import { useEffect } from 'react';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }];
};

const App = () => {
    useEffect(() => {
        setTimeout(() => {
            document.body.classList.remove('disable-animations');
        }, 300);
    }, []);

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="disable-animations">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
};

export default App;
