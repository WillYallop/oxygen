import { NavLink } from '@remix-run/react';
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

interface NavItemProps {
    title: string;
    to: string;
    icon: FontAwesomeIconProps['icon'];
    prefetch: 'none' | 'intent' | 'render';
    toggleNav: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
    to,
    prefetch,
    title,
    icon,
    toggleNav,
}) => {
    return (
        <li className="navigation-root__link">
            <NavLink
                to={to}
                prefetch={prefetch}
                className={({ isActive }) =>
                    `${isActive ? 'active' : undefined} `
                }
                onClick={toggleNav}
            >
                <span className="icon">
                    <FontAwesomeIcon icon={icon} />
                </span>
                <span className="text">{title}</span>
            </NavLink>
        </li>
    );
};

export default NavItem;
