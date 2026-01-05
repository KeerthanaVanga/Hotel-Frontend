import type { ChatUser } from "../../types/Chat";

export default function ChatUserItem({
  user,
  active,
  onClick,
}: {
  user: ChatUser;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 text-left flex items-center gap-3
        ${active ? "bg-[#2A161B]" : "hover:bg-[#241217]"}`}
    >
      <div className="h-10 w-10 rounded-full bg-[#3A1A22] flex items-center justify-center text-[#D4AF37] font-semibold">
        {user.name[0]}
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{user.name}</span>
          <span className="text-xs text-[#F5DEB3]/50">{user.time}</span>
        </div>
        <p className="text-xs text-[#F5DEB3]/60 truncate">
          {user.lastMessage}
        </p>
      </div>
    </button>
  );
}
