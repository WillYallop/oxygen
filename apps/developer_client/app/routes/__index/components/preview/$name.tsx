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

const PreviewComponentPage: React.FC = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <>
            <Header hasSearch={false} />
            <BackBar text={'Back'} link={'/components'} />
            <div className="l--bp">
                <TextBlock>
                    <h1>Preview Component</h1>
                </TextBlock>
            </div>
            <Outlet />
        </>
    );
};

export default PreviewComponentPage;
