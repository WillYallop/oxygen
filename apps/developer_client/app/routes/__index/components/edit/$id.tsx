// Components
import Header from '~/components/Layout/Header';
import { Textarea } from 'ui';
import { Outlet } from '@remix-run/react';

const RegisterComponentPage: React.FC = () => {
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
