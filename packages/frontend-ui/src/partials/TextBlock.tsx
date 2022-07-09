import * as React from 'react';

interface TextBannerProps {
    children: React.ReactElement;
    className?: string;
}

export const TextBlock: React.FC<TextBannerProps> = ({
    children,
    className,
}) => {
    return (
        <div className={`t__textarea ${className ? className : ''}`}>
            {children}
        </div>
    );
};
