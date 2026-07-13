function AIRecommendation({ text }) {

    return (
        <div className="bg-green-100 border border-green-300 rounded-xl p-5 mt-6">

            <h2 className="text-xl font-bold mb-3">
                🤖 AI Recommendation
            </h2>

            <p>{text}</p>

        </div>
    );

}

export default AIRecommendation;