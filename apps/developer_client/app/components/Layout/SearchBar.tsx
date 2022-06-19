import { Form } from '@remix-run/react';

interface SearchBarProps {
    action: () => void;
}

const SearchBar: React.FC<SearchBarProps> = () => {
    return (
        <div className="search-root">
            <button type="submit">S</button>
            <input placeholder="search" />
        </div>
    );
};

export default SearchBar;
