import React, { useRef, useEffect } from "react";
import { UserBubble, AIBubble } from "./ChatBubbles";

const ChatContainer = ({ responses }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [responses]);

  return (
    <div
      ref={chatContainerRef}
      className="overflow-y-auto space-y-4 w-[80%] px-2 mb-[4.5rem]">
      {responses.map((response, index) =>
        response.type === "user" ? (
          <UserBubble key={index} text={response.text} />
        ) : (
          <AIBubble key={index} text={response.text} />
        )
      )}
    </div>
  );
};
export default ChatContainer;
