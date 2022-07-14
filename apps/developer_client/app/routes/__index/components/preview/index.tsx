import { Outlet } from '@remix-run/react';

const PreviewComponent = () => {
    return (
        <div>
            <h1>PREVIEW</h1>
            <Outlet />
        </div>
    );
};

export default PreviewComponent;
