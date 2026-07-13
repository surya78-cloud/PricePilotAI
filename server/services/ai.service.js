const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const generateRecommendation = async (products) => {

    try {

        const prompt = `
You are an expert shopping assistant.

Below are products found for a user's search.

${JSON.stringify(products, null, 2)}

Your job:

1. Pick the best overall product.
2. Explain why it is the best value.
3. Mention the cheapest product.
4. Mention if paying extra is worth it.
5. Mention seller reliability and ratings if available.

Keep your answer under 120 words.

Use simple English and bullet points.
`;

        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],

            temperature: 0.4,

            max_tokens: 250

        });

        return completion.choices[0].message.content;

    } catch (error) {

        console.error("Groq Error:", error);

        return "AI recommendation is currently unavailable.";

    }

};

module.exports = {
    generateRecommendation
};