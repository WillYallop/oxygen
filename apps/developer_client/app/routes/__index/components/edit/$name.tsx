import { Outlet, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import {
    D_Library_GetSingleLibraryBody,
    D_Library_GetSingleLibraryRes,
} from 'oxygen-types';
import axiosWrapper from '~/util/axios-wrapper';
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

const RegisterComponentPage: React.FC = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <>
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
            </div>
            <Outlet />
        </>
    );
};

export default RegisterComponentPage;
