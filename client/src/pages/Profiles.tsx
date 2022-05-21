import { AxiosResponse } from 'axios';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import React, { useEffect, useState } from 'react';
import { SanitizedUser } from '../interface';
import { useUserContext } from '../hooks/UserContext';
import GetWindowSize from '../hooks/GetWindowSize';
import clientApi from '../api/clientApi';
import TableUserRow from '../components/TableUserRow';

const Content = tw.div`flex flex-col justify-center px-6 text-gray-100`;

const Header = tw.header`px-5 py-4 border-b border-gray-100`;

const HeaderText = tw.h2`font-semibold text-gray-100`;

const TableContainer = tw.div`w-full max-w-2xl mx-auto shadow-lg rounded bg-secondary-800`;

const Table = tw.table`table-auto w-full`;

const TablePadding = tw.div`p-3`;

const TableThead = tw.thead`text-sm font-semibold text-gray-300 bg-secondary-600`;

const TableRow = tw.tr``;

const TableHeader = tw.th`p-2 whitespace-nowrap font-semibold text-left`;

const TableBody = tw.tbody`text-sm divide-y divide-gray-100`;

const TableDataCell = tw.td`p-2 whitespace-nowrap`;

export default function Profiles() {
  const { currentUser } = useUserContext();

  let initialState: any = {};
  const [users, setUsers] = useState<SanitizedUser[]>();
  const [alreadyFollowing, setAlreadyFollowing] = useState(initialState);

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

  const { windowWidth } = GetWindowSize();

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

  const followingCount = Object.keys(alreadyFollowing).length;
  const totalUserCount = users?.length;

  return (
    <>
      <Content>
        <TableContainer>
          <Header>
            <HeaderText>
              {currentUser
                ? `You are following ${followingCount} out of ${totalUserCount} users`
                : `Listing all ${totalUserCount} users`}
            </HeaderText>
          </Header>
          <TablePadding>
            <Table>
              <TableThead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  {windowWidth > 500 && <TableHeader>Location</TableHeader>}
                  <TableHeader>Links</TableHeader>
                </TableRow>
              </TableThead>
              <TableBody>
                {users ? (
                  users.map((user: SanitizedUser) => (
                    <TableUserRow
                      key={user._id}
                      user={user}
                      alreadyFollowing={alreadyFollowing}
                      setAlreadyFollowing={setAlreadyFollowing}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableDataCell>
                      <p>loading...</p>
                    </TableDataCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TablePadding>
        </TableContainer>
      </Content>
    </>
  );
}
