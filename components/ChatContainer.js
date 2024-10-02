import React, { useState } from "react";
import { UserBubble, AIBubble } from "./ChatBubbles";
import Image from "next/image";

const SearchResult = ({ result }) => (
  <div className='mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
    <h3 className='text-lg font-semibold text-primary hover:text-primary/80 transition-colors duration-300'>
      <a
        href={result.url}
        target='_blank'
        rel='noopener noreferrer'
        className='hover:underline'
      >
        {result.title}
      </a>
    </h3>
    <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
      {result.url}
    </p>
    <p className='mt-2 text-sm text-gray-700 dark:text-gray-300'>
      {result.snippet || "No snippet available"}
    </p>
  </div>
);

const ChatContainer = ({ responses, onEditPrompt, onSavePrompt }) => {
  return (
    <div className='w-full max-w-7xl absolute top-20 p-2 mx-auto'>
      {responses.map((response, index) => (
        <div
          key={index}
          className={`mb-4 ${
            response.type === "user" ? "text-right" : "text-left"
          }`}
        >
          {response.type === "user" ? (
            <UserBubble
              text={response.text}
              onEdit={() => onEditPrompt(index, response.text)}
              onSave={(newText) => onSavePrompt(index, newText)}
            />
          ) : (
            <div className='flex items-end'>
              <div className='flex-grow inline-block rounded-lg p-3 shadow-sm'>
                {response.text.startsWith("Search Results:") ? (
                  <div>
                    <h2 className='text-xl font-bold mb-4 text-primary dark:text-primary/80'>
                      Search Results:
                    </h2>
                    {response.text
                      .split("---")
                      .filter(Boolean)
                      .map((result, idx) => {
                        const lines = result.split("\n").filter(Boolean);
                        const title = lines.find(line =>
                          line.startsWith("Title:"),
                        );
                        const url = lines.find(line => line.startsWith("URL:"));
                        const snippet = lines.find(line =>
                          line.startsWith("Snippet:"),
                        );
                        return (
                          <SearchResult
                            key={idx}
                            result={{
                              title: title
                                ? title.replace("Title: ", "")
                                : "No title",
                              url: url ? url.replace("URL: ", "") : "#",
                              snippet: snippet
                                ? snippet.replace("Snippet: ", "")
                                : "No snippet available",
                            }}
                          />
                        );
                      })}
                  </div>
                ) : (
                  <AIBubble key={index} text={response.text} />
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
