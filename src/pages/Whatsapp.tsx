import { useEffect, useState } from "react";
import ChatSidebar from "../components/whatsapp/ChatSidebar";
import EmptyChat from "../components/whatsapp/EmptyChat";
import ChatWindow from "../components/whatsapp/ChatWindow";
import type { ChatUser, Message } from "../types/Chat";
import api from "../lib/axios-interceptor";

export default function WhatsAppPage() {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      const res = await api.get("/whatsapp/users");
      setUsers(res.data.data);
      setLoadingUsers(false);
    };
    fetchUsers();
  }, []);

  const handleSelectUser = async (user: ChatUser) => {
    setSelectedUser(user);
    setLoadingMessages(true);
    setMessages([]);

    const res = await api.get(`/whatsapp/messages/${user.phone}`);
    setMessages(
      res.data.data.map((m: any) => ({
        id: String(m.id),
        text: m.message,
        fromMe: m.sender_type === "ai",
        time: new Date(m.created_at).toLocaleTimeString([], {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }))
    );
    setLoadingMessages(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-7xl h-[calc(100vh-6rem)] bg-[#1F1216] rounded-2xl overflow-hidden border border-[#3A1A22] flex">
        <ChatSidebar
          loading={loadingUsers}
          users={users}
          selectedUser={selectedUser}
          onSelect={handleSelectUser}
        />

        {!selectedUser ? (
          <EmptyChat />
        ) : (
          <ChatWindow
            user={selectedUser}
            messages={messages}
            loading={loadingMessages}
          />
        )}
      </div>
    </div>
  );
}
