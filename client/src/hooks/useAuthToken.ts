import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export const useAuthToken = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        setToken(token);
      } catch (error) {
        console.error("Error fetching auth token:", error);
        setToken(null);
      }
    };

    fetchToken();
  }, [getToken]);

  return token;
};
