import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
    const { authToken } = useAuthContext();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return;
      setMessages([]);
      setLoading(true);
      try {
        const res = await fetch(
          `/api/messages/${selectedConversation?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${authToken}`,
            },

          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setMessages(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedConversation, setMessages,authToken]);
  return { loading, messages };
};

export default useGetMessages;
