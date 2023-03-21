import { AxiosResponse } from 'axios';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import React, { useEffect, useState } from 'react';
import { SanitizedUser } from '../interface';
import GetWindowSize from '../hooks/GetWindowSize';
import clientApi from '../api/clientApi';
import UserTable from '../components/UserTable';

const Content = tw.div`flex flex-col justify-center px-6 text-gray-100`;

export default function Profiles() {
  let initialState: any = {};
  const [users, setUsers] = useState<SanitizedUser[]>();
  const [alreadyFollowing, setAlreadyFollowing] = useState(initialState);

  const { windowWidth } = GetWindowSize();

  async function getCurrentUserInfo() {
    clientApi
      .get('/api/user/getuser', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        if (res.data.alreadyFollowingTheseIds) {
          setAlreadyFollowing(res.data.alreadyFollowingTheseIds);
        }
      });
  }

  useEffect(() => {
    clientApi.get('/api/user/getallusers').then((res: AxiosResponse) => {
      setUsers(res.data);
    });

    getCurrentUserInfo();
  }, []);

  if (alreadyFollowing) {
    users?.sort((a: SanitizedUser, b: SanitizedUser) => {
      if (alreadyFollowing[a._id]) {
        return 1;
      } else if (alreadyFollowing[b._id]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  return (
    <>
      <Content>
        {users && (
          <UserTable
            users={users}
            alreadyFollowing={alreadyFollowing}
            setAlreadyFollowing={setAlreadyFollowing}
          />
        )}
      </Content>
    </>
  );
}
