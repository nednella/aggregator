interface SearchBarProps {
    onSearch: (username: string) => void;
}

export default function SearchBar({ onSearch: _onSearch }: SearchBarProps) {
    return (
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <input
                className="search-input"
                type="text"
                placeholder="Search GitHub username..."
                aria-label="GitHub username"
            />
            <button className="search-button" type="submit">
                Search
            </button>
        </form>
    );
}
