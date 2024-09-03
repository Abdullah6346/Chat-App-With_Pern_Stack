import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
  useContext,
} from 'react'

type authUserType = {
  id: string
  userName: string
  fullName: string
  profilePic: string
  email: string
  gender: string
}
const AuthContext = createContext<{
  authUser: authUserType | null
  setAuthUser: Dispatch<SetStateAction<authUserType | null>>
  isLoading: boolean
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<authUserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        if (!data.ok) {
          throw new Error(data.error)
        }
        setAuthUser(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAuthUser()
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, isLoading, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}
