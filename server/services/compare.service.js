const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const compareService = async (product1, product2) => {

    const prompt = `
You are an expert shopping assistant.

Compare these two products.

Product 1
Title: ${product1.title}
Price: ₹${product1.price}
Seller: ${product1.seller}
Rating: ${product1.rating}

Product 2
Title: ${product2.title}
Price: ₹${product2.price}
Seller: ${product2.seller}
Rating: ${product2.rating}

Give your response in this format:

🏆 Winner

Reason

✅ Pros of Product 1

✅ Pros of Product 2

💡 Final Recommendation

Keep the response under 200 words.
`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.4,
        max_tokens: 300,
    });

    return completion.choices[0].message.content;
};

module.exports = {
    compareService,
};