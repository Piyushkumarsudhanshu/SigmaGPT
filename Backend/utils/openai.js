import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();

        // If API returned an error
        if (!response.ok) {
            console.error("OpenAI API Error:", data);
            return "Sorry, I couldn't generate a response right now.";
        }

        // Validate choices array
        if (!data.choices || !data.choices[0]) {
            console.error("Invalid OpenAI Response:", data);
            return "Sorry, I couldn't understand the API response.";
        }

        const content = data?.choices?.[0]?.message?.content;

        if (!content) {
            console.error("Missing assistant message:", data);
            return "Sorry, the assistant returned an empty response.";
        }

        return content;

    } catch (err) {
        console.error("OpenAI Fetch Error:", err);
        return "Sorry, something went wrong while contacting AI service.";
    }
};

export default getOpenAIAPIResponse;
