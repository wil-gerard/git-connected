import React, { createContext, useEffect, useState, useContext } from 'react';
import { AxiosResponse } from 'axios';
import clientApi from '../api/clientApi';
import { SanitizedUser } from '../interface';

export const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};

const UserContext = createContext({
  currentUser: {} as SanitizedUser,
  setCurrentUser: {} as any,
});

export default function UserContextProvider(props: any) {
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    clientApi
      .get('/api/user/getuser', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        if (res.data) {
          setCurrentUser(res.data);
        }
      });
  }, []);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
