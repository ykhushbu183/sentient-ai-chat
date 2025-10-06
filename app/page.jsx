
"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              msg.role === "user"
                ? "text-right text-blue-600"
                : "text-left text-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-400">Sentient is typing...</div>}
      </div>

      <form
        onSubmit={sendMessage}
        className="p-4 border-t bg-white flex items-center gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message to Sentient..."
          className="flex-1 resize-none border rounded-2xl px-4 py-2 focus:outline-none"
          rows={1}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-2xl"
        >
          Send
        </button>
      </form>
    </div>
  );
}
