import React, { useState, useEffect } from "react";
import { ChatServiceClient } from "./chat_pb_service";
import { ChatMessage } from "./chat_pb";

const client = new ChatServiceClient("http://localhost:8080");

const Chat = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const stream = client.chatStream();
        stream.on("data", (response) => {
            setMessages((prev) => [...prev, { username: response.getUsername(), message: response.getMessage() }]);
        });

        return () => stream.cancel();
    }, []);

    const sendMessage = () => {
        if (message.trim() === "") return;

        const chatMessage = new ChatMessage();
        chatMessage.setUsername(username);
        chatMessage.setMessage(message);

        const stream = client.chatStream();
        stream.write(chatMessage);
        setMessage("");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>gRPC Web Chat</h2>
            {!username && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={() => setUsername(username)}>Join</button>
                </div>
            )}

            {username && (
                <div>
                    <div style={{ border: "1px solid gray", height: "300px", overflowY: "auto" }}>
                        {messages.map((msg, index) => (
                            <p key={index}><strong>{msg.username}:</strong> {msg.message}</p>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Enter message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default Chat;
