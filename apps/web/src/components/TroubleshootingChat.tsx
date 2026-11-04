import { useState } from "react";
import { askTroubleshootingAssistant } from "../services/troubleshootingApi";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

function TroubleshootingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const message = input.trim();

    if (!message || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: message }
    ]);

    setInput("");
    setLoading(true);

    try {
      const result = await askTroubleshootingAssistant(message);

      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: result.response }
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "Unable to connect to the assistant. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="troubleshooting-chat">
      <h2>AI Troubleshooting Assistant</h2>
      <p>Describe your fan problem and get troubleshooting guidance.</p>

      <div className="chat-messages">
        {messages.length === 0 && (
          <p>Example: My fan is not turning on.</p>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <strong>
              {message.role === "user" ? "You" : "Assistant"}
            </strong>
            <p>{message.text}</p>
          </div>
        ))}

        {loading && <p>Assistant is thinking...</p>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") void sendMessage();
          }}
          placeholder="Describe your fan problem..."
        />

        <button onClick={() => void sendMessage()} disabled={loading}>
          Send
        </button>
      </div>
    </section>
  );
}

export default TroubleshootingChat;