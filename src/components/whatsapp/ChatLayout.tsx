import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import ChatUsersSkeleton from "./ChatUserSkeleton";
import ChatWindowSkeleton from "./ChatWindowSkeleton";
import EmptyChat from "./EmptyChat";
import type { ChatUser, Message } from "../../types/Chat";

interface Props {
  loadingUsers: boolean;
  loadingMessages: boolean;
  users: ChatUser[];
  selectedUser: ChatUser | null;
  messages: Message[];
  onSelectUser: (user: ChatUser) => void;
}

export default function ChatLayout({
  loadingUsers,
  loadingMessages,
  users,
  selectedUser,
  messages,
  onSelectUser,
}: Props) {
  return (
    <div className="h-[calc(100vh-120px)] grid grid-cols-[320px_1fr] rounded-2xl overflow-hidden border border-[#3A1A22] bg-[#1F1216]">
      
      {/* LEFT SIDEBAR */}
      <div className="h-full">
        {loadingUsers ? (
          <ChatUsersSkeleton />
        ) : (
          <ChatSidebar
            loading={loadingUsers}
            users={users}
            selectedUser={selectedUser}
            onSelect={onSelectUser}
          />
        )}
      </div>

      {/* RIGHT CHAT */}
      <div className="h-full">
        {loadingMessages ? (
          <ChatWindowSkeleton />
        ) : selectedUser ? (
          <ChatWindow loading={loadingMessages} user={selectedUser} messages={messages} />
        ) : (
          <EmptyChat />
        )}
      </div>
    </div>
  );
}
