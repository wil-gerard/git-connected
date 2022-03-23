import React, { createContext, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import apiClient from '../api/apiClient';

export const myContext = createContext({});

export default function Context(props: any) {
  const [userObject, setUserObject] = useState<any>();

  useEffect(() => {
    apiClient.get('/api/user/getuser', {
      withCredentials: true,
    }).then((res: AxiosResponse) => {
      if (res.data) {
        setUserObject(res.data);
      }
    });
  }, []);
  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  );
}
