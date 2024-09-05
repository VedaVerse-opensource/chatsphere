import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='relative mt-2 mb-2'>
      <CopyToClipboard text={value} onCopy={handleCopy}>
        <button className='absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs z-10'>
          {copied ? "Copied!" : "Copy"}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1em",
          borderRadius: "0.5em",
        }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
