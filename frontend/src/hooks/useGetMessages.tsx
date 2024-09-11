import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return
      setMessages([])
      setLoading(true)
      try {
        const res = await fetch(`/api/messages/${selectedConversation?.id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        setMessages(data)
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    getMessages()
  }, [selectedConversation, setMessages])
  return { loading, messages }
}

export default useGetMessages
