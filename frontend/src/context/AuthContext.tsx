import  {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
  useContext,
} from 'react'

type AuthUserType = {
  id: string
  userName: string
  fullName: string
  profilePic: string
  email: string
  gender: string
}

const AuthContext = createContext<{
  authUser: AuthUserType | null
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>
  isLoading: boolean
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
})
//eslint-disable-next-line
export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser')
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser)) 
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (authUser) {
      localStorage.setItem('authUser', JSON.stringify(authUser)) 
    } else {
      localStorage.removeItem('authUser') 
    }
  }, [authUser])

  return (
    <AuthContext.Provider value={{ authUser, isLoading, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}
