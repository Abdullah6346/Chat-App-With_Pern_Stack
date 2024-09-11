import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificaionSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificaionSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
