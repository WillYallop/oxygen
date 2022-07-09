import { useState } from 'react';

import {
    faBars,
    faXmark,
    faGauge,
    faCube,
    faPlugCirclePlus,
    faBasketShopping,
    faGear,
} from '@fortawesome/free-solid-svg-icons';
import { faUikit } from '@fortawesome/free-brands-svg-icons';
// Components
import { Logo } from 'frontend-ui';
import { NavLink } from '@remix-run/react';
import NavItem from '~/components/Partials/NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NavigationSidebarProps {}

const Navigation: React.FC<NavigationSidebarProps> = ({}) => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <button
                id="navigation-toggle"
                className={`navigation-root__toggle ${
                    navOpen ? 'navigation-root__toggle--open' : ''
                }`}
                onClick={() => setNavOpen(!navOpen)}
                aria-expanded={navOpen}
                aria-controls="navigation-slider"
            >
                {navOpen ? (
                    <FontAwesomeIcon icon={faXmark} />
                ) : (
                    <FontAwesomeIcon icon={faBars} />
                )}
                <span className="navigation-root__toggle__overlay"></span>
            </button>
            <div
                id="navigation-slider"
                className={`navigation-root ${
                    navOpen ? 'navigation-root--open' : ''
                }`}
            >
                <nav className="navigation-root__nav" role={'navigation'}>
                    <div className="navigation-root__nav--top">
                        <div className="navigation-root__nav__header l--f l--f-a-c">
                            <NavLink to={'/'} prefetch={'intent'}>
                                <Logo size="medium" />
                            </NavLink>
                        </div>
                        <ul>
                            <NavItem
                                to="/"
                                prefetch="intent"
                                title="Dashboard"
                                icon={faGauge}
                                toggleNav={() => setNavOpen(!navOpen)}
                            />
                            <NavItem
                                to="/components"
                                prefetch="intent"
                                title="Components"
                                icon={faCube}
                                toggleNav={() => setNavOpen(!navOpen)}
                            />
                            <NavItem
                                to="/plugins"
                                prefetch="intent"
                                title="Plugins"
                                icon={faPlugCirclePlus}
                                toggleNav={() => setNavOpen(!navOpen)}
                            />
                            <NavItem
                                to="/kits"
                                prefetch="intent"
                                title="Kits"
                                icon={faUikit}
                                toggleNav={() => setNavOpen(!navOpen)}
                            />
                            <NavItem
                                to="/orders"
                                prefetch="intent"
                                title="Orders"
                                icon={faBasketShopping}
                                toggleNav={() => setNavOpen(!navOpen)}
                            />
                            <NavItem
                                to="/settings"
                                prefetch="intent"
                                title="Settings"
                                icon={faGear}
                                toggleNav={() => setNavOpen(!navOpen)}
                            />
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navigation;
