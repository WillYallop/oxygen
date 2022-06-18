import {
    faBackwardStep,
    faForwardStep,
    faGauge,
    faCube,
    faPlugCirclePlus,
    faBasketShopping,
    faGear,
} from '@fortawesome/free-solid-svg-icons';
import { faUikit } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Components
import { Logo } from 'ui';
import { NavLink } from '@remix-run/react';
import NavItem from '~/components/Partials/NavItem';

interface NavigationSidebarProps {
    isShrink: boolean;
    setIsShrink: (state: boolean) => void;
}

const Navigation: React.FC<NavigationSidebarProps> = ({
    isShrink,
    setIsShrink,
}) => {
    return (
        <div
            className={`navigation-root ${
                isShrink ? 'navigation-root--shrink' : ''
            }`}
        >
            <nav className="navigation-root__nav">
                <div className="navigation-root__nav--top">
                    <div className="navigation-root__nav__header l--f l--f-a-c">
                        <button
                            className="navigation-root__nav__header__minimise-btn"
                            onClick={() => setIsShrink(!isShrink)}
                        >
                            <FontAwesomeIcon
                                icon={
                                    !isShrink ? faBackwardStep : faForwardStep
                                }
                            />
                        </button>
                        <NavLink
                            to={'/'}
                            prefetch={'intent'}
                            tabIndex={isShrink ? -1 : 0}
                        >
                            <Logo size="medium" />
                        </NavLink>
                    </div>
                    <ul>
                        <NavItem
                            to="/"
                            prefetch="intent"
                            title="Dashboard"
                            icon={faGauge}
                        />
                        <NavItem
                            to="/components"
                            prefetch="intent"
                            title="Components"
                            icon={faCube}
                        />
                        <NavItem
                            to="/plugins"
                            prefetch="intent"
                            title="Plugins"
                            icon={faPlugCirclePlus}
                        />
                        <NavItem
                            to="/kits"
                            prefetch="intent"
                            title="Kits"
                            icon={faUikit}
                        />
                        <NavItem
                            to="/orders"
                            prefetch="intent"
                            title="Orders"
                            icon={faBasketShopping}
                        />
                        <NavItem
                            to="/settings"
                            prefetch="intent"
                            title="Settings"
                            icon={faGear}
                        />
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;
