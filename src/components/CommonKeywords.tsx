import { useState } from "react";
import { Tag, message } from "antd";

const commonKeywords: Record<string, string[]> = {
  general: ["masterpiece", "best quality"],
  style: [
    "photorealistic",
    "realistic",
    "hyperrealism",
    "chibi",
    "line art",
    "retro art",
    "sketch",
    "science fiction",
    "cyberpunk",
    "Steampunk",
  ],
  shot: ["low angle", "close-up shot", "wide shot", "ultrawide shot"],
  artist: [
    "Leonardo da Vinci",
    "Vincent van Gogh",
    "Pablo Picasso",
    "Michelangelo Buonarroti",
    "Claude Monet",
    "Johannes Vermeer",
    "Henri Matisse",
  ],
};

export const CommonKeywords = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [copied, setCopied] = useState("");

  const copyText = (text: string) => () => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    messageApi.open({
      type: "success",
      content: `Copied: 「${text}」`,
    });

    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <>
      <div className="p-2">
        {Object.entries(commonKeywords).map(([key, value]) => (
          <div key={key} className="mb-8">
            <h3 className="text-gray-200">{key.toUpperCase()}</h3>
            <div>
              {value.map((str) => (
                <Tag
                  key={str}
                  color={str === copied ? "#666" : "#333"}
                  className="mb-2 cursor-pointer"
                  onClick={copyText(str)}
                >
                  {str}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
      {contextHolder}
    </>
  );
};
