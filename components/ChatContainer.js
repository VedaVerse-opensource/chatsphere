import React, { useEffect, useState } from "react";
import groqResponse from "@/scripts/groq";
import { UserBubble, AIBubble } from "./ChatBubbles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const summarizeSearchResults = async () => {
      const urls = responses
        .filter(response => response.text.startsWith("Search Results:"))
        .flatMap(response =>
          response.text
            .split("---")
            .filter(Boolean)
            .map(result => {
              const lines = result.split("\n").filter(Boolean);
              const url = lines.find(line => line.startsWith("URL:"));
              return url ? url.replace("URL: ", "") : "";
            }),
        )
        .filter(Boolean)
        .join("\n");

      if (urls) {
        const contextMessages = [
          {
            role: "system",
            content: "Summarize the following search results using these URLs.",
          },
          {
            role: "user",
            content: `URLs:\n${urls}`,
          },
        ];

        const groqGenerator = groqResponse(urls, contextMessages);
        let fullSummary = "";

        for await (const chunk of groqGenerator) {
          fullSummary += chunk;
        }

        setSummary(fullSummary);
      }
    };

    if (
      responses.some(response => response.text.startsWith("Search Results:"))
    ) {
      summarizeSearchResults();
    }
  }, [responses]);

  return (
    <div className='w-full max-w-3xl mx-auto'>
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
              onSave={newText => onSavePrompt(index, newText)}
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

                    {summary && (
                      <div className='mt-6 p-4 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md'>
                        <h3 className='text-lg font-semibold mb-2'>
                          Summary of Search Results:
                        </h3>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {summary}
                        </ReactMarkdown>
                      </div>
                    )}
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
