import { useState } from "react";

function SearchBar({ onSearch }) {

    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!query.trim()) return;

        onSearch(query);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-3"
        >
            <input
                className="border rounded-lg p-3 flex-1"
                placeholder="Search iPhone 16..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button
                className="bg-blue-600 text-white px-6 rounded-lg"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;