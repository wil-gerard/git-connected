import React, { createContext, useEffect, useState, useContext } from 'react';
import { AxiosResponse } from 'axios';
import apiClient from '../api/apiClient';

export const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};

const UserContext = createContext({});

export default function UserContextProvider(props: any) {
  const [userObject, setUserObject] = useState<any>();

  useEffect(() => {
    apiClient
      .get('/api/user/getuser', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        if (res.data) {
          setUserObject(res.data);
        }
      });
  }, []);
  return (
    <UserContext.Provider value={userObject}>{props.children}</UserContext.Provider>
  );
}