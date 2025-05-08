import React, { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);

    const formData = new FormData();
    formData.append("message", input);
    if (file) formData.append("file", file);

    const res = await fetch("https://cravetech-legal-chatbot-demo.onrender.com/api/chat", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Legal Chatbot Assistant</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />

      <div className="border p-4 h-96 overflow-y-scroll bg-gray-100 rounded mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 text-${msg.role === "user" ? "right" : "left"}`}>
            <div className={`inline-block p-2 rounded ${msg.role === "user" ? "bg-blue-100" : "bg-gray-200"}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Describe your case or ask something…"
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
}

export default App;
