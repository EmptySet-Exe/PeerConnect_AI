import {useState, useEffect, useRef} from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow()
{
    // Not entirely sure what's going on here (?)
    const [messages, setMessages] = useState ([
            {
                sender: "ai",
                text: "Hi! I'm PeerConnect AI. What topic would you like to study today?"
            }
        ]);

    // This sends the text to the "AI" (NeuralSeek)
    const handleSend = async (text) =>
    {
        // Add user message
        const newMessages = [...messages, {sender: "user",text}];
        setMessages(newMessages);

        // Connecting to the Backend server
        try
        {
            const res = await fetch("https://stagingapi.neuralseek.com/v1/stony41/seek",
                {
                    method: "POST",
                    headers:
                    {
                        "accept": "application/json",
                        "Content-Type": "application/json",
                        "apikey": `${import.meta.env.VITE_NEURALSEEK_API_KEY}`
                    },
                    body: JSON.stringify(
                        {
                            question: text,
                        }
                    )
                }
            );

            if(!res.ok) throw new Error("API request failed!"); // Guard clause
            
            const data = await res.json();
            const aiReply = data.answer || data.response || "I'm not sure how to help with that.";

            setMessages((prev) => [...prev, {sender: "ai", text: aiReply}]);
        }
        catch(e)
        {
            console.error(e);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "Connection error. Try again later."
                }
            ]);
        }  
    };

    const bottomRef = useRef(null);

    useEffect (() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    // Sending html to the webpage
    return (
        <div className="flex flex-col h-[85vh] bg-gray-50 border rounded-2x1 shadow-lg overflow-hidden">
            <div className="flex-grow overflow-y-auto p-4">
                // Why is this in a codeblock? Chances are to return a non-standard value?
                {
                    // What is this? This isn't an arrow function (?)
                    messages.map((msg,idx) => ( 
                        // Custom Component Tag
                        <MessageBubble
                            key={idx} // Why is there an idx here?
                            text={msg.text}
                            sender={msg.sender}
                        />
                    ))
                }
                <div ref={bottomRef}/> // This autoscrolls to the latest MessageBubble
            </div>
            // Sets handleSend function to the onSend argument for the MessageInput function
            <MessageInput onSend={handleSend} />
        </div>
    );
}