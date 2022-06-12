import * as React from 'react';

interface LogoProps {
    size: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ size }) => {
    return (
        <span className={`logo-root logo-root--${size} l--f l--f-a-c`}>
            <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 30a15 15 0 1 0 0-30 15 15 0 0 0 0 30Z"
                    fill="#484848"
                />
                <path
                    d="M15 29a14 14 0 1 0 0-28 14 14 0 0 0 0 28Z"
                    fill="#141414"
                />
                <path
                    d="M.96 14.56a39.92 39.92 0 0 1 5.83-2.67c2.55-.8 5.29-.73 7.8.19 2.6.94 5.18 2.87 7.78 4 1.97.83 4.04 1.38 6.16 1.66a13.45 13.45 0 0 1-1.31 3.67H2.55c-.56-1-.99-2.07-1.27-3.2a16.2 16.2 0 0 1-.33-3.65Z"
                    fill="#05F"
                />
                <path
                    opacity=".66"
                    d="M28.89 13.46s-.3-.14-.4-.16a14.1 14.1 0 0 0-7.79.16c-2.6.8-5.19 2.45-7.79 3.41-2.1.74-4.27 1.23-6.49 1.47l-1.3.16v2.92h22.1a16 16 0 0 0 1.58-4.1c.22-1.27.25-2.57.09-3.86Z"
                    fill="#05F"
                />
                <path
                    d="M28.7 17.75s-.07 2.8-3.3 6.6a13.99 13.99 0 0 1-15.94 3.5 14.27 14.27 0 0 1-4.7-3.24 15.14 15.14 0 0 1-3.57-6.86H28.7Z"
                    fill="#05F"
                />
            </svg>
            Oxygen
        </span>
    );
};
