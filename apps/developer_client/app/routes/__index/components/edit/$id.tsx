// Components
import Header from '~/components/Layout/Header';
import { Textarea } from 'ui';
import { Outlet, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ params }) => {
    const id = params.id;

    return json({});
};

const RegisterComponentPage: React.FC = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <>
            <Header hasSearch={false} />
            <div className="l--bp">
                <Textarea className="t__wrapper--m">
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
                </Textarea>
            </div>
            <Outlet />
        </>
    );
};

export default RegisterComponentPage;
