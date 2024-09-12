import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://chat-app-withpernstack-production.up.railway.app/api/auth/logout",
        {
          method: "POST",
          mode: "cors",
        }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setAuthUser(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
