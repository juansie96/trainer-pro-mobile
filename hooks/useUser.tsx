import { User } from "firebase/auth";
import { useState, createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "../firebase/api";
import { auth } from "../firebase/firebase";
import { Client } from "../types/client";

interface IUserContext {
  userData: Client | null;
  isFetching: boolean;
  error: boolean;
  fetchUserData(): void;
}

const UserContext = createContext<IUserContext>({
  userData: null,
  isFetching: false,
  error: false,
  fetchUserData: () => null,
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [session] = useAuthState(auth);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      setUserData(await getUserData((session as User).email as string));
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, isFetching: isLoading, error, fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default useUser;
