import { NavLink } from '@remix-run/react';

interface NavItemProps {
    title: string;
    to: string;
    prefetch: 'none' | 'intent' | 'render';
}

const NavItem: React.FC<NavItemProps> = ({ to, prefetch, title }) => {
    return (
        <li className="navigation-root__link">
            <NavLink
                to={to}
                prefetch={prefetch}
                className={({ isActive }) =>
                    `${isActive ? 'active' : undefined} `
                }
            >
                <span className="icon">I</span>
                {title}
            </NavLink>
        </li>
    );
};

export default NavItem;
