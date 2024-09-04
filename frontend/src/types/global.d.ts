// Thsi is the special type that you can use without any import and export
type ConversationType = {
  id: string
  fullName: string
  profilePic: string
}

type MessageType = {
  id: string
  body: string
  senderId: string
  createdAt: string
}
