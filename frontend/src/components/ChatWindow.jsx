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
            const res = await fetch("http://localhost:3000/api/message",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({text})
                }
            );
            
            const data = await res.json();

            setMessages((prev) => [...prev, {sender: "ai", text: data.reply}]);
        }
        catch(e)
        {
            console.error(e);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "Server error. Try again later."
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
                // Why is this in a codeblock?
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