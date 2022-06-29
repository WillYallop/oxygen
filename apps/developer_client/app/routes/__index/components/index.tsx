// Components
import Header from '~/components/Layout/Header';
import { TextBlock } from 'ui';
import { Link } from '@remix-run/react';

const ComponentPage: React.FC = () => {
    return (
        <>
            <Header hasSearch={false} />
            <div className="l--bp">
                <TextBlock>
                    <h1>My Components</h1>
                </TextBlock>
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
