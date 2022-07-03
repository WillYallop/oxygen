import { Link, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import {
    D_Library_GetMultipleLibraryBody,
    D_Library_GetMultipleLibraryRes,
} from 'oxygen-types';
import axiosWrapper from '~/util/axios-wrapper';
// Components
import Header from '~/components/Layout/Header';
import { TextBlock } from 'ui';
import LibraryComponentRow from '~/components/Library/ComponentRow';

export const loader: LoaderFunction = async ({ request }) => {
    const cookieHeader = request.headers.get('Cookie');
    const componentsRes = await axiosWrapper<
        D_Library_GetMultipleLibraryRes,
        D_Library_GetMultipleLibraryBody
    >({
        path: `v1/dev/library/component/start/10/desc`,
        method: 'get',
        Cookie: cookieHeader,
    });
    if (componentsRes.success) {
        return json({
            success: true,
            components: componentsRes.response?.data,
        });
    } else {
        return json({ success: false, components: [] });
    }
};

interface ComponentPageLoader {
    success: boolean;
    components: D_Library_GetMultipleLibraryRes;
}

const ComponentPage: React.FC = () => {
    const data = useLoaderData<ComponentPageLoader>();

    return (
        <>
            <Header hasSearch={false} />
            <div className="l--bp">
                <TextBlock>
                    <h1>My Components</h1>
                </TextBlock>
                {/* top row */}
                <div className="l--f l--f-j-sb  l--bm-t-l">
                    <div></div>
                    <Link
                        to={'/components/register'}
                        className={`btn-style__main`}
                    >
                        Register Component
                    </Link>
                </div>
                {/* body */}
                <div className="l--bm-t-l">
                    {data.components.data.map(c => (
                        <LibraryComponentRow key={c.id} component={c} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ComponentPage;
