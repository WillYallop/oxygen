// Components
import { Logo } from 'ui';
import { NavLink } from '@remix-run/react';

interface NavigationSidebarProps {
    navChild: React.ReactElement;
    footerChild?: React.ReactElement;
}

const Navigation: React.FC<NavigationSidebarProps> = ({
    navChild,
    footerChild,
}) => {
    return (
        <div className="navigation-root">
            <nav className="navigation-root__nav">
                <div className="navigation-root__nav--top">
                    <div className="navigation-root__nav__header l--f l--f-a-c">
                        <NavLink to={'/'} prefetch={'intent'}>
                            <Logo size="medium" />
                        </NavLink>
                    </div>
                    <ul>{navChild}</ul>
                </div>
                {footerChild ? (
                    <div className="navigation-root__nav--bot">
                        {footerChild}
                    </div>
                ) : null}
            </nav>
        </div>
    );
};

export default Navigation;
