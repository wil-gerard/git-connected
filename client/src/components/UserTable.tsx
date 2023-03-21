import React from 'react';
import tw from 'twin.macro';
import { useUserContext } from '../hooks/UserContext';
import TableUserRow from './TableUserRow';
import GetWindowSize from '../hooks/GetWindowSize';
import { SanitizedUser } from '../interface';

type UserTableProps = {
  users: SanitizedUser[];
  alreadyFollowing: any;
  setAlreadyFollowing: any;
};

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

export default function UserTable({
  users,
  alreadyFollowing,
  setAlreadyFollowing,
}: UserTableProps) {
  const { currentUser } = useUserContext();
  const { windowWidth } = GetWindowSize();

  const followingCount = Object.keys(alreadyFollowing).length;
  const totalUserCount = users?.length;

  return (
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
  );
}
