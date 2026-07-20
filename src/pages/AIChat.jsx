import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiTrash2 } from "react-icons/fi";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import EmptyChat from "../components/EmptyChat";
import TypingIndicator from "../components/TypingIndicator";
import { generateGeminiResponse } from "../lib/gemini";
import { showError, showInfo } from "../lib/toast";
import { useAuth } from "../contexts/AuthContext";
import { saveChatHistory } from "../lib/history";

export default function AIChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Keep the newest message or typing indicator visible after every update.
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const prompt = draft.trim();
    if (!prompt || isLoading) return;

    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      showError("Gemini API key not configured.");
      return;
    }

    const userMessage = { role: "user", text: prompt, createdAt: new Date() };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setDraft("");
    setIsLoading(true);

    try {
      const responseText = await generateGeminiResponse(conversation);
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", text: responseText, createdAt: new Date() },
      ]);
      if (user?.id) {
        try {
          await saveChatHistory(user.id, { prompt, response: responseText });
        } catch {
          showError("Response received, but it could not be saved to history.");
        }
      }
    } catch (error) {
      showError(
        error.message === "GEMINI_KEY_MISSING"
          ? "Gemini API key not configured."
          : "Unable to get an AI response right now."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (!messages.length) return;
    setMessages([]);
    showInfo("Chat cleared.");
  };

  return (
    <section className="mx-auto flex h-[calc(100vh-13rem)] min-h-[560px] max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <FiMessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-semibold text-slate-900">AI Assistant</h1>
            <p className="text-xs text-slate-500">Your freelance workflow partner</p>
          </div>
        </div>
        <button
          type="button"
          onClick={clearChat}
          disabled={!messages.length || isLoading}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiTrash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-6 sm:px-6">
        {messages.length ? (
          <div className="space-y-5">
            {messages.map((message, index) => (
              <ChatMessage key={`${message.role}-${message.createdAt.getTime()}-${index}`} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        ) : (
          <EmptyChat />
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput value={draft} onChange={setDraft} onSend={handleSend} disabled={isLoading} />
    </section>
  );
}
