import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://chat-app-withpernstack-production.up.railway.app/api/messages/conversations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // This ensures cookies (JWT) are included in the request
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []); // Removed `authToken` from the dependency array since it's unnecessary

  return { loading, conversations };
};

export default useGetConversations;
