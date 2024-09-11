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
  shouldShake?: boolean
}
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly MODE: string;
  // Add any other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
