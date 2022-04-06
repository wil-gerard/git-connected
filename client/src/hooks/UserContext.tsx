import React, { createContext, useEffect, useState, useContext } from 'react';
import { AxiosResponse } from 'axios';
import apiClient from '../api/apiClient';
import { IUser } from '../interface';

export const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};

const UserContext = createContext({
  user: {} as IUser,
  setUser: {} as any
});

export default function UserContextProvider(props: any) {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    apiClient
      .get('/api/user/getuser', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        if (res.data) {
          setUser(res.data);
        }
      });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}