import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../auth";
import socketIoClient from "socket.io-client";

export const ConversationPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInputValue, setMessageInputValue] = useState("");
  const { id: conversationId } = useParams();
  const { user } = useUser();

  const postMessage = async (text) => {};

  useEffect(() => {
    const establishSocketConnection = async () => {
      const socket = socketIoClient("http://127.0.0.1:8080", {
        query: { conversationId, token: await user.getIdToken() },
      });

      setSocket(socket); // disconnect the socket when this page is unmounted.
      socket.on("heresYourConversation", (conversation) => {
        console.log("Initial message loaded...");
        console.log(conversation);
        setMessages(conversation.messages);
      });
      return () => socket.disconnect();
    };

    if (user) {
      establishSocketConnection();
    }
  }, []);

  return (
    <div className="centered-container">
      {messages.map((message) => {
        <div key={message._id} className="list-item">
          <h3>{messages.postedBy.name}</h3>
          <p>{message.text}</p>
        </div>;
      })}
      <div className="input-form">
        <input
          type="text"
          placeholder="Enter a new message here... "
          value={messageInputValue}
          onChange={(e) => setMessageInputValue(e.target.value)}
        />
        <button onClick={postMessage}>Send</button>
      </div>
    </div>
  );
};
