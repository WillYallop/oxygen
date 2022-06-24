// Components
import Header from '~/components/Layout/Header';
import { Textarea } from 'ui';
import { Link } from '@remix-run/react';

const ComponentPage: React.FC = () => {
    return (
        <>
            <Header hasSearch={false} />
            <div className="l--bp">
                <Textarea>
                    <h1>My Components</h1>
                </Textarea>
                <div className="l--f l--f-j-sb  l--bm-t-l">
                    <div></div>
                    <Link
                        to={'/components/register'}
                        className={`btn-style__main`}
                    >
                        Register Component
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ComponentPage;
