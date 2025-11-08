import {useState} from "react"; // useState is used to managethe state of messages in a chat application

export default function MessageInput({onSend})
{
    const [message,setMessage] = useState(""); // Don't quite understand useState, yet

    // ???
    const handleSend = () =>
    {
        if(message.trim() === "") return; // Guard clause, kinda
        onSend(message);    // This invokes a callback function to send a passed in message?
        setMessage("");     // This resets the message variable
    };

    // This looks to be a key callback handler
    const handleKeyPress = (e) =>
    {
        if(e.key === "Enter") handleSend();
    }

    // Sending html to the webpage
    return (
        <div className="flex items-center gap-2 p-3 border-t bg-white">
            <input
                type="text"                                     // A text field
                style={{color: 'black'}}                        // Sets the color of the input text
                value={message}                                 // This updates the text field to reflect the message?
                onChange={(e) => setMessage(e.target.value)}    // This sets the message based on the target.value?
                onKeyDown={handleKeyPress}                      // Assigns the handleKeyPress callback handler to the onKeyDown eventhandler
                placeholder="Ask PeerConnect AI..."            // Placeholder value for the textfield
                className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-blue-300"
            />
            <button
                onClick={handleSend}    // Invokes the handleSend function to send a message?
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
                Send
            </button>
        </div>
    );
}