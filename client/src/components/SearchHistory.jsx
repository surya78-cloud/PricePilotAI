function SearchHistory({ history }) {
    return (
        <div className="bg-white rounded-lg shadow p-5 mt-6">
            <h2 className="text-2xl font-bold mb-4">
                🕒 Recent Searches
            </h2>

            {history.length === 0 ? (
                <p>No recent searches.</p>
            ) : (
                history.map((item) => (
                    <div
                        key={item._id}
                        className="border-b py-2"
                    >
                        {item.query}
                    </div>
                ))
            )}
        </div>
    );
}

export default SearchHistory;