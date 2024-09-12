import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
  useContext,
} from "react";

type AuthUserType = {
  id: string;
  userName: string;
  fullName: string;
  profilePic: string;
  email: string;
  gender: string;
};

// Context type includes the token and setter
const AuthContext = createContext<{
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  authToken: string | null;
  setAuthToken: Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {}, // Ideally, this should be a no-op function
  authToken: null,
  setAuthToken: () => {}, // Ideally, this should be a no-op function
  isLoading: true,
});

// Hook to access the AuthContext
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("jwt"); // Use 'jwt' as the key

    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setAuthToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }

    if (authToken) {
      localStorage.setItem("jwt", authToken); // Store token with 'jwt' as the key
    } else {
      localStorage.removeItem("jwt");
    }
  }, [authUser, authToken]);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, authToken, setAuthToken, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
