import { Search } from 'lucide-react'
import { useState } from 'react'
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../hooks/useConversation'
import toast from 'react-hot-toast'
const SearchInput = () => {
  const [search, setSearch] = useState('')
  const { setSelectedConversation } = useConversation()
  const { conversations } = useGetConversations()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!search.trim()) return
    if (search.length < 3) {
      return toast.error('Search Term Should be at least 3 characters long')
    }
    const conversation = conversations.find((c: ConversationType) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()),
    )
    if (conversation) {
      setSelectedConversation(conversation)
      setSearch('')
    } else {
      toast.error('User not found')
    }
  }
  return (
    <form className="flex items-center gap-2 " onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  "
      >
        <Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />
      </button>
    </form>
  )
}
export default SearchInput
