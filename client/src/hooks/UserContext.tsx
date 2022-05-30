import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from 'react';
import * as userInfoApi from '../api/userInfoApi';
import * as authApi from '../api/authApi';
import { SanitizedUser } from '../interface';

interface UserContextType {
  currentUser?: SanitizedUser;
  setCurrentUser: any;
  loading: boolean;
  error?: any;
  authState: boolean;
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
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchSessionStatus = () => {
        authApi.getSessionStatus().then((response) => {
          if (response.session === true) {
            setAuthState(true);
          } else {
            setAuthState(false);
            window.localStorage.removeItem('session');
          }
        });
      };
      fetchSessionStatus();
    } catch {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (!authState) {
      return;
    }
    setLoading(true);
    try {
      userInfoApi
        .getCurrentUser()
        .then((currentUser) => setCurrentUser(currentUser));
    } catch {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [error, authState]);

  const logout = () => {
    authApi.logoutCurrentUser()
    .then(() => {
      setAuthState(false);
      setCurrentUser(undefined);
      window.localStorage.removeItem('session');
    })
    .catch((error) => {
      setError(error);
    });
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, loading, error, logout, authState }}
    >
      {children}
    </UserContext.Provider>
  );
}
