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
  setAuthUser: () => {},
  authToken: null,
  setAuthToken: () => {},
  isLoading: true,
});

// Hook to access the AuthContext
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null); // Manage JWT state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken"); // Retrieve token

    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setAuthToken(storedToken); // Set the token in state
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
      localStorage.setItem("authToken", authToken); // Store token in localStorage
    } else {
      localStorage.removeItem("authToken");
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
