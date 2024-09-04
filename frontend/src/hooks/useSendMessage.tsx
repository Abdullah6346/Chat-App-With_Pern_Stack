import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  const sendMessage = async (message: string) => {
    if (!selectedConversation) return
    setLoading(true)
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation?.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        },
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessages([...messages, data])
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return {
    loading,
    sendMessage,
  }
}

export default useSendMessage
