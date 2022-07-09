import { Outlet, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
// Components
import Header from '~/components/Layout/Header';
import { TextBlock } from 'frontend-ui';
import BackBar from '~/components/Layout/BackBar';

export const loader: LoaderFunction = ({ params }) => {
    const id = params.id;

    return json({});
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
