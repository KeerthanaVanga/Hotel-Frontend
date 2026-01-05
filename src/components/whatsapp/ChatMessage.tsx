import type { Message } from "../../types/Chat";

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div
      className={`
        max-w-[70%]
        rounded-lg
        px-4 py-2
        text-sm
        ${message.fromMe
          ? "ml-auto bg-[#0A5C44] text-white"
          : "bg-[#2A161B] text-[#F5DEB3]"
        }
      `}
    >
      <p className="whitespace-pre-line">{message.text}</p>
      <span className="block text-[10px] opacity-60 text-right">
        {message.time}
      </span>
    </div>
  );
}
