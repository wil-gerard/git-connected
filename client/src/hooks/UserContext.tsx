import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from 'react';
import * as userInfoApi from '../api/userInfoApi';
import * as authApi from '../api/authApi';
import { SanitizedUser } from '../interface';

interface UserContextType {
  currentUser?: SanitizedUser;
  setCurrentUser: any;
  error?: any;
  logout: () => void;
}

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [currentUser, setCurrentUser] = useState<SanitizedUser>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      userInfoApi
        .getCurrentUser()
        .then((currentUser) => setCurrentUser(currentUser));
    } catch {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [error]);

  const logout = () => {
    authApi.logoutCurrentUser().then(() => setCurrentUser(undefined));
  }

  const memoedValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      loading,
      error,
      logout,
    }),
    [currentUser, loading, error]
  );

  return (
    <UserContext.Provider value={memoedValue}>
      {!loading && children}
    </UserContext.Provider>
  );
}
