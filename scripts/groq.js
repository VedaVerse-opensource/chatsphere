import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: localStorage.getItem("groqApiKey"),
  dangerouslyAllowBrowser: true,
});

async function groqResponse(content, context) {
  try {
    // Convert context object to an array of messages
    const contextMessages = Object.values(context).map(response => ({
      role: response.type === "user" ? "user" : "assistant",
      content: response.text,
    }));

    // Add the new user message
    const messages = [
      ...contextMessages,
      {
        role: "user",
        content: content,
      },
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.1-70b-versatile",
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error in groqResponse:", error);
    return "An error occurred";
  }
}

export default groqResponse;
