import Groq from "groq-sdk";

let groq;

if (typeof window !== "undefined") {
  const key = localStorage.getItem("groqApiKey");
  groq = new Groq({
    apiKey: key,
    dangerouslyAllowBrowser: true,
  });
}

async function groqResponse(content, context) {
  if (!groq) return "Groq SDK not initialized";

  try {
    const contextMessages = Object.values(context).map(response => ({
      role: response.type === "user" ? "user" : "assistant",
      content: response.text,
    }));

    const messages = [...contextMessages, { role: "user", content: content }];

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
