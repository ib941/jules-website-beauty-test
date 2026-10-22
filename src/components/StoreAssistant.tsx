"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  User,
  Send,
  X,
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  RefreshCw,
  Cpu,
  AlertCircle,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { products } from "@/data/products";

/**
 * Strips <think>...</think> reasoning tags and detects if the model is currently generating reasoning tokens.
 */
function processReasoning(rawText: string) {
  if (!rawText) return { cleanText: "", isThinking: false };

  // Detect if there is an unclosed <think> tag (i.e. model is actively outputting thoughts)
  const hasUnclosedThink = /<think>(?![\s\S]*<\/think>)/i.test(rawText);

  // Strip all completed <think>...</think> blocks
  let cleanText = rawText.replace(/<think>[\s\S]*?<\/think>/gi, "");

  // Strip any trailing unclosed <think> block
  cleanText = cleanText.replace(/<think>[\s\S]*$/gi, "");

  cleanText = cleanText.trim();

  return {
    cleanText,
    isThinking: hasUnclosedThink,
  };
}

export default function StoreAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status, error, clearError } = useChat();
  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom on message stream updates
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, status, error]);

  // Sync added items to the global Zustand cart
  const handleSyncToStore = (productId: string, quantity: number = 1) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      useStore.getState().addToCart(product, quantity);
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;
    if (clearError) clearError();
    sendMessage({ text: query.trim() });
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <aside aria-label="AI Shopping Assistant" className="fixed bottom-6 right-4 sm:right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full font-bold shadow-2xl shadow-violet-900/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
          aria-label="Open AI Shopping Assistant"
        >
          <div className="relative">
            <Bot size={20} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0B0D13]" />
          </div>
          <span className="text-sm tracking-wide">AI Assistant</span>
          <span className="hidden sm:inline-block text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded-full text-violet-200 border border-white/10">
            GPT OSS 120B
          </span>
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div
          role="region"
          aria-label="AI Shopping Assistant Chat"
          className="w-[92vw] sm:w-[440px] h-[580px] max-h-[85vh] bg-[#0B0D13] border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200 relative backdrop-blur-xl"
        >
          {/* Top Header */}
          <div className="p-4 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-violet-900/30">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">Tech Haven Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] font-mono text-zinc-400">
                  Groq Engine • openai/gpt-oss-120b
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm">
            {/* Initial Welcome Greeting */}
            {messages.length === 0 && (
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-300 space-y-3">
                <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>Welcome to Tech Haven</span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-300">
                  I&apos;m your AI hardware specialist powered by Groq&apos;s{" "}
                  <code className="text-violet-300 font-mono text-[11px] bg-zinc-800 px-1 py-0.5 rounded">
                    openai/gpt-oss-120b
                  </code>
                  . Ask me to recommend laptops for your workload, or tell me to add any flagship
                  directly to your cart.
                </p>

                {/* Quick Suggestion Pills */}
                <div className="pt-2 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold">
                    Try asking:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() =>
                        handleSend("Recommend the best flagship laptop for software development")
                      }
                      className="text-left text-xs bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 hover:border-violet-500/50 p-2.5 rounded-xl text-zinc-200 transition-all cursor-pointer"
                    >
                      💻 Best laptop for software development?
                    </button>
                    <button
                      onClick={() =>
                        handleSend("Tell me about the Quantum X Pro 16\" specs and price")
                      }
                      className="text-left text-xs bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 hover:border-violet-500/50 p-2.5 rounded-xl text-zinc-200 transition-all cursor-pointer"
                    >
                      ⚡ Quantum X Pro 16&quot; specs &amp; pricing
                    </button>
                    <button
                      onClick={() =>
                        handleSend("Please add the Quantum X Pro laptop (prod-1) to my cart")
                      }
                      className="text-left text-xs bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 hover:border-emerald-500/50 p-2.5 rounded-xl text-emerald-300 font-medium transition-all cursor-pointer"
                    >
                      🛍️ Add Quantum X Pro to my cart
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Render Conversation Messages */}
            {messages.map((message: any, index: number) => {
              const isUser = message.role === "user";
              const isLastMessage = index === messages.length - 1;

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-zinc-500 font-mono">
                    {isUser ? (
                      <>
                        <span>You</span>
                        <User size={11} />
                      </>
                    ) : (
                      <>
                        <Bot size={11} className="text-violet-400" />
                        <span className="text-violet-400 font-semibold">Tech Haven Agent</span>
                      </>
                    )}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl max-w-[90%] leading-relaxed ${
                      isUser
                        ? "bg-violet-600 text-white rounded-tr-sm shadow-md shadow-violet-900/30"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-sm shadow-md"
                    }`}
                  >
                    {/* Message Body with Text and Tool Invocations */}
                    <MessageRenderer
                      message={message}
                      onSyncToStore={handleSyncToStore}
                      isMessageStreaming={isLastMessage && isLoading}
                    />
                  </div>
                </div>
              );
            })}

            {/* General Thinking Indicator when no assistant message has arrived yet */}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-900 border border-zinc-800 w-fit text-xs text-zinc-400">
                <Sparkles size={13} className="text-violet-400 animate-spin" />
                <span>Analyzing options...</span>
              </div>
            )}

            {/* Error Notification Banner */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs flex items-start justify-between gap-2.5 animate-in fade-in">
                <div className="flex items-start gap-2">
                  <AlertCircle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-rose-300">Connection error</p>
                    <p className="text-[11px] text-rose-200/80 mt-0.5 leading-relaxed">
                      {error.message || "Failed to reach the assistant. Please try again."}
                    </p>
                  </div>
                </div>
                {clearError && (
                  <button
                    type="button"
                    onClick={() => clearError()}
                    className="p-1 hover:bg-rose-900/40 rounded-lg text-rose-400 hover:text-rose-200 transition-colors cursor-pointer shrink-0"
                    aria-label="Dismiss error"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sticky Bottom Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-zinc-900/95 border-t border-zinc-800/80 flex flex-col gap-2 shrink-0 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for recommendations or say 'add to cart'..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600 text-white transition-all cursor-pointer shadow-md shadow-violet-900/30 active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-500 px-1 font-mono">
              <span className="flex items-center gap-1">
                <Cpu size={10} className="text-violet-400" /> Groq Cloud API
              </span>
              <span>Tool Calling Enabled</span>
            </div>
          </form>
        </div>
      )}
    </aside>
  );
}

/* =========================================================================
   Message Renderer (strips <think> tags, renders placeholder, and shows tool cards)
   ========================================================================= */
interface MessageRendererProps {
  message: any;
  onSyncToStore: (productId: string, quantity?: number) => void;
  isMessageStreaming?: boolean;
}

function MessageRenderer({
  message,
  onSyncToStore,
  isMessageStreaming,
}: MessageRendererProps) {
  const parts = message.parts || [];
  const toolInvocations = message.toolInvocations || [];

  // Extract raw text from message content or text parts
  let rawText = message.content || "";
  if (!rawText && parts.length > 0) {
    const textParts = parts.filter((p: any) => p.type === "text").map((p: any) => p.text);
    rawText = textParts.join("\n");
  }

  // Intercept and strip <think>...</think> reasoning tags
  const { cleanText, isThinking } = processReasoning(rawText);

  // Check if there is an explicit reasoning part in the message
  const hasReasoningPart = parts.some((p: any) => p.type === "reasoning");

  // Show "Analyzing options..." placeholder if AI is currently generating reasoning tokens
  const showAnalyzingPlaceholder =
    isThinking || hasReasoningPart || (!cleanText && isMessageStreaming);

  return (
    <div className="space-y-3">
      {/* "Analyzing options..." placeholder while generating reasoning */}
      {showAnalyzingPlaceholder && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-950/40 border border-violet-500/30 text-xs text-violet-300 animate-pulse">
          <Sparkles size={13} className="text-violet-400" />
          <span>Analyzing options...</span>
        </div>
      )}

      {/* Clean response text with all <think> tags stripped */}
      {cleanText && (
        <div className="whitespace-pre-wrap leading-relaxed">{cleanText}</div>
      )}

      {/* Tool invocations in parts (AI SDK UIMessage protocol) */}
      {parts.map((part: any, idx: number) => {
        // Skip text and reasoning parts
        if (part.type === "text" || part.type === "reasoning") return null;

        const isAddToCart =
          part.type === "tool-addToCart" ||
          (part.type === "dynamic-tool" && part.toolName === "addToCart");

        if (
          isAddToCart &&
          (part.state === "result" ||
            part.state === "output-available" ||
            part.output ||
            part.result)
        ) {
          const result = part.output || part.result;
          return (
            <AddToCartResultBadge
              key={idx}
              result={result}
              onSyncToStore={onSyncToStore}
            />
          );
        }

        if (isAddToCart && part.state === "call") {
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 text-xs text-zinc-300"
            >
              <RefreshCw size={12} className="animate-spin text-emerald-400" />
              <span>Executing addToCart tool...</span>
            </div>
          );
        }

        return null;
      })}

      {/* Tool invocations array (legacy / prompt specification) */}
      {toolInvocations.map((inv: any, idx: number) => {
        if (inv.toolName === "addToCart" && inv.state === "result") {
          return (
            <AddToCartResultBadge
              key={idx}
              result={inv.result}
              onSyncToStore={onSyncToStore}
            />
          );
        }

        if (inv.toolName === "addToCart" && inv.state === "call") {
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 text-xs text-zinc-300"
            >
              <RefreshCw size={12} className="animate-spin text-emerald-400" />
              <span>Executing addToCart tool...</span>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

/* =========================================================================
   Visual Confirmation Badge for addToCart Tool Results
   ========================================================================= */
interface AddToCartResultBadgeProps {
  result: any;
  onSyncToStore: (productId: string, quantity?: number) => void;
}

function AddToCartResultBadge({ result, onSyncToStore }: AddToCartResultBadgeProps) {
  // Sync to local Zustand cart store on mount
  useEffect(() => {
    if (result?.productId) {
      onSyncToStore(result.productId, result.quantity || 1);
    }
  }, [result, onSyncToStore]);

  const productName = result?.productName || "Product Added";
  const quantity = result?.quantity || 1;
  const price = result?.price ? `$${result.price.toFixed(2)}` : "";

  return (
    <div className="mt-2 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 shadow-lg shadow-emerald-950/40 text-white flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>Successfully Added to Cart</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
          Tool Executed
        </span>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-emerald-900/40 text-xs">
        <div>
          <span className="font-bold text-white block">{productName}</span>
          <span className="text-[11px] text-zinc-400 font-mono">
            Qty: {quantity} {price && `• ${price}`}
          </span>
        </div>

        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
        >
          <ShoppingCart size={13} />
          <span>View Cart</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
