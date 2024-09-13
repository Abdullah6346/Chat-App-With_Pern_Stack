import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext(); // Removed authToken as it is not needed

  const login = async (userName: string, password: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://chat-app-withpernstack-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
          credentials: "include", // Ensures cookies are included with the request
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setAuthUser(data); // This should handle the user data and any tokens
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
