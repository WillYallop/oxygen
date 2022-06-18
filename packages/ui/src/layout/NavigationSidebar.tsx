interface NavigationSidebarProps {
    navChild: React.ReactElement;
    footerChild?: React.ReactElement;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
    navChild,
    footerChild,
}) => {
    // Footer navigation
    const FooterNavigation: React.FC<{ child?: React.ReactElement }> = ({
        child,
    }) => {
        if (child) {
            return <nav>{child}</nav>;
        } else return null;
    };

    return (
        <div className="">
            <nav>{navChild}</nav>
            <FooterNavigation child={footerChild} />
        </div>
    );
};
