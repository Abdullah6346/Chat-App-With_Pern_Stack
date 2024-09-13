import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://chat-app-withpernstack-production.up.railway.app/api/messages/send/${selectedConversation.id}`, // Simplified selectedConversation?.id to selectedConversation.id
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
          credentials: "include", // Ensures cookies are included with the request
        }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendMessage,
  };
};

export default useSendMessage;
