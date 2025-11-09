import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-Gfm";
import rehypeKatex from "rehype-katex";
// import "katex/dist/katex.min.css";


export default function MessageBubble ({text,sender})
{
    const isUser = sender === "user";

    // Sending html to the webpage
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
            <div className={`max-w-[75%] rounded-2x1 px-4 py-2 text-sm ${isUser ? "bg-blue-600 text-white rounded-br-none":  "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
                    // className="prose prose-sm max-w-none text-gray-800 dark::text-gray-100"
                >
                    {text}
                </ReactMarkdown>
            </div>
        </div>
    );
}