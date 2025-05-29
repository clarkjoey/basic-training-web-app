import React from 'react';

const AiChatPage = ({ chatPageHTML, chatMessages }) => (
  <div className="max-w-4xl mx-auto p-4">
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">AI Chat Page</h2>
      <div dangerouslySetInnerHTML={{ __html: chatPageHTML }} />
    </section>

    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Fake AI Chat</h2>
      <div className="space-y-2 border rounded-md p-4 bg-gray-50">
        {chatMessages.map((msg, i) => (
          <div key={i} className="text-sm">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default AiChatPage;