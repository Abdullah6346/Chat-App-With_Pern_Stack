import useChatScroll from '../../hooks/useChatScroll'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessages from '../../hooks/useListenMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import Message from './Message'
import '../../index.css'
import React from "react";

const Messages = () => {
  const { loading, messages } = useGetMessages()
  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>
  useListenMessages()
  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {loading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}
      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send message to start conversation
        </p>
      )}
    </div>
  )
}
export default Messages
