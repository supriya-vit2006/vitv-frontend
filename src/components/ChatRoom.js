import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { getToken, getUser } from '../utils/auth';

const ChatRoom = ({ groupId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);
  const user = getUser();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000', {
      auth: { token: getToken() },
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    socketRef.current.emit('joinGroup', groupId);

    socketRef.current.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Load previous messages from backend?
    // For simplicity, messages can be fetched via API (not implemented here),
    // or stored in group.chatMessages on backend. For brevity, omitted.

    return () => socketRef.current.disconnect();
  }, [groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      socketRef.current.emit('sendMessage', { groupId, text: input });
      setMessages((prev) => [...prev, { sender: user.username, text: input, timestamp: new Date() }]);
      setInput('');
    }
  };

  return (
    <div className="border p-4 rounded h-80 flex flex-col">
      <div className="flex-grow overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-1 ${msg.sender === user.username ? 'text-right' : 'text-left'}`}>
            <span className="font-semibold">{msg.sender}</span>: {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          className="flex-grow p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;