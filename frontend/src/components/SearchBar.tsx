import { useState } from "react";

interface SearchBarProps {
    onSearch: (username: string) => void;
}

export default function SearchBar({ onSearch: _onSearch }: SearchBarProps) {
    const [username, setUsername] = useState<string>("");

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        _onSearch(username);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
