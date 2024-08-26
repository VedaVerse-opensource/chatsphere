import React, { useState } from "react";
import groqResponse from "../scripts/groq";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

const Prompt = ({ chatActive, onChatStart }) => {
  const [inputText, setInputText] = useState("");
  const [responses, setResponses] = useState([]);
  const [context, setContext] = useState({});

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    if (!chatActive) {
      onChatStart();
    }

    const newUserResponse = { type: "user", text: inputText };
    setResponses([...responses, newUserResponse]);
    setInputText("");

    const updatedContext = { ...context, [responses.length]: newUserResponse };

    const content = await groqResponse(inputText, updatedContext);
    const newAIResponse = { type: "ai", text: content };

    setResponses((prev) => [...prev, newAIResponse]);

    setContext({ ...updatedContext, [responses.length + 1]: newAIResponse });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ChatContainer responses={responses} />
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
      />
    </div>
  );
};

export default Prompt;
