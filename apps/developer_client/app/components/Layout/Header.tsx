// Components
import SearchBar from '~/components/Layout/SearchBar';

interface HeaderProps {
    hasSearch: boolean;
    searchAction?: () => void;
}

const Header: React.FC<HeaderProps> = ({ hasSearch, searchAction }) => {
    return (
        <header className="header-root">
            {hasSearch && searchAction ? (
                <SearchBar action={searchAction} />
            ) : null}
            {/* <div className="header-root__profile l--f l--f-j-c l--f-a-c">
                WY
            </div> */}
        </header>
    );
};

export default Header;
