import { NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { json, LoaderFunction } from '@remix-run/node';
import {
    D_Library_GetSingleLibraryBody,
    D_Library_GetSingleLibraryRes,
    D_Library_GetSingleLibraryResBodyData,
} from 'oxygen-types';
import axiosWrapper from '~/util/axios-wrapper';
// Context
import { LibraryComponentContext } from '~/context/libraryComponent';
// Components
import Header from '~/components/Layout/Header';
import { TextBlock } from 'frontend-ui';
import BackBar from '~/components/Layout/BackBar';

export const loader: LoaderFunction = async ({ request, params }) => {
    const libraryName = params.name;
    const cookieHeader = request.headers.get('Cookie');

    const env = {
        API_DOMAIN: process.env.API_DOMAIN,
    };

    const componentsRes = await axiosWrapper<
        D_Library_GetSingleLibraryRes,
        D_Library_GetSingleLibraryBody
    >({
        path: `v1/dev/library/component/${libraryName}`,
        method: 'get',
        Cookie: cookieHeader,
    });
    if (componentsRes.success) {
        return json({
            success: true,
            component: componentsRes.response?.data.data[0],
            env,
        });
    } else {
        return json({
            success: false,
            component: {},
            env,
        });
    }
};

interface LoaderData {
    success: boolean;
    component: D_Library_GetSingleLibraryResBodyData;
    env: {
        API_DOMAIN: string;
    };
}

const RegisterComponentPage: React.FC = () => {
    const data = useLoaderData<LoaderData>();

    const [component, setComponent] = useState(data.component);

    return (
        <LibraryComponentContext.Provider value={{ component, setComponent }}>
            <Header hasSearch={false} />
            <BackBar text={'Back'} link={'/components'} />
            <div className="l--bp">
                <TextBlock className="t__wrapper--m">
                    <>
                        <h1>Edit Component</h1>
                        <p>
                            The better listing you create for your component:
                            the higher chance it has to become popular! This
                            means having an eye catching title, multiple images
                            to show off the power of your component and an in
                            depth description - letting the user know all the
                            ins and outs.
                        </p>
                    </>
                </TextBlock>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to={`/components/edit/${component?.attributes.libraryName}`}
                                className={({ isActive }) =>
                                    isActive ? '' : undefined
                                }
                            >
                                Overview
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/components/edit/${component?.attributes.libraryName}/gallery`}
                                className={({ isActive }) =>
                                    isActive ? '' : undefined
                                }
                            >
                                Gallery
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/components/edit/${component?.attributes.libraryName}/config`}
                                className={({ isActive }) =>
                                    isActive ? '' : undefined
                                }
                            >
                                Config
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/components/edit/${component?.attributes.libraryName}/versions`}
                                className={({ isActive }) =>
                                    isActive ? '' : undefined
                                }
                            >
                                Versions
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </LibraryComponentContext.Provider>
    );
};

export default RegisterComponentPage;
