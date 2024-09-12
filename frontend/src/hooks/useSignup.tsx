import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

type SignupInputs = {
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, authToken } = useAuthContext();

  const signup = async (inputs: SignupInputs) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://chat-app-withpernstack-production.up.railway.app/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(inputs),
        }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setAuthUser(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;
