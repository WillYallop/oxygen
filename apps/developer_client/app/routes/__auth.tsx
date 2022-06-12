import { Outlet, Link } from '@remix-run/react';
import { Logo } from 'ui';

const AuthLayout = () => {
    return (
        <>
            <header className="auth-layout__col__header l--f l--f-a-c l--pz-at l--bp-h">
                <Link to={'/'}>
                    <Logo size={'medium'} />
                </Link>
            </header>
            <div className="auth-layout l--f">
                <div className="auth-layout__col auth-layout__col__outlet l__width--40 l--f l--f-j-c l--f-a-c">
                    <Outlet />
                </div>
                <div className="auth-layout__col auth-layout__col__alt l__width--60 l--bg-acc"></div>
            </div>
        </>
    );
};

export default AuthLayout;
