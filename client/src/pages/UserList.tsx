import { AxiosResponse } from 'axios';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg';
import { ReactComponent as GitHubIcon } from '../assets/github-icon.svg';
import React, { useEffect, useState } from 'react';
import { IUser } from '../interface';
import { useUserContext } from '../hooks/UserContext';
import apiClient from '../api/apiClient';

const Content = tw.div`flex flex-col justify-center px-6 text-gray-100`;

const Header = tw.header`px-5 py-4 border-b border-gray-100`;

const HeaderText = tw.h2`font-semibold text-gray-300`;

const TableContainer = tw.div`w-full max-w-2xl mx-auto shadow-lg rounded bg-secondary-800`;

const Table = tw.table`table-auto w-full`;

const TablePadding = tw.div`p-3`;

const TableThead = tw.thead`text-xs font-semibold uppercase text-gray-300 bg-secondary-700`;

const TableRow = tw.tr``;

const TableHeader = tw.th`p-2 whitespace-nowrap font-semibold text-left`;

const TableBody = tw.tbody`text-sm divide-y divide-gray-100`;

const TableDataCell = tw.td`p-2 whitespace-nowrap`;

const TableDataNameContainer = tw.div`flex items-center`;

const TableDataImage = tw.img`w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 rounded-full`;

const TableDataName = tw.div`font-medium text-gray-100`;

const TableDataLocation = tw.div`font-medium text-gray-100 text-left`;

const TableActions = tw.div`font-medium text-gray-100 text-left flex flex-row`;

const TableLink = tw.a`flex rounded shadow cursor-pointer bg-secondary-600 transition duration-300 hover:bg-primary-500 w-6 h-6 ml-1 p-0.5`;

const TableFollow = tw.a`flex items-center rounded shadow cursor-pointer bg-secondary-600 transition duration-300 hover:bg-primary-500  ml-1 py-0.5 px-2`;

const TableFollowed = tw.a`flex items-center justify-center rounded shadow cursor-default bg-green-600 transition duration-300  ml-1 py-0.5 px-2`;

export default function Home() {
  //const id = window.localStorage.getItem('id');
  const { currentUser } = useUserContext();

  let initialState: any = {};
  // const [currentUser, setCurrentUser] = useState()
  const [users, setUsers] = useState<IUser[]>();
  const [alreadyFollowing, setAlreadyFollowing] = useState(initialState);

  async function getCurrentUserInfo() {
    apiClient
      .get('/api/user/getuser', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        if (res.data) {
          // setCurrentUser(res.data);
          setAlreadyFollowing(res.data.alreadyFollowingTheseIds);
        }
      });
  }

  const handleFollowSubmit = async (
    gitHubUsername: string,
    twitterUsername: string,
    targetId: string
  ) => {
    try {
      const res = await apiClient({
        method: 'post',
        url: '/api/user/followall',
        params: {
          twitterUsername,
          gitHubUsername,
          targetId,
        },
        withCredentials: true,
      });
      // setCurrentUser(res.data);
      setAlreadyFollowing(res.data.alreadyFollowingTheseIds);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    apiClient.get('/api/user/getallusers').then((res: AxiosResponse) => {
      setUsers(res.data);
    });

    getCurrentUserInfo();
  }, []);

  if (alreadyFollowing) {
    users?.sort((a: IUser, b: IUser) => {
      if (alreadyFollowing[a._id]) {
        return 1;
      } else if (alreadyFollowing[b._id]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  const username = (user: IUser) => {
    if (user.customName !== '') {
      return user.customName;
    } else if (user.gitHubConnected) {
      return user.gitHub.json.login;
    } else if (user.twitterConnected) {
      return user.twitter.username;
    } else {
      return user.discord.username;
    }
  };

  const location = (user: IUser) => {
    if (user.customLocation !== '') {
      return user.customLocation;
    } else if (user.gitHubConnected) {
      return user.gitHub.json.location;
    } else {
      return null;
    }
  };

  return (
    <>
      <Content>
        <TableContainer>
          <Header>
            <HeaderText>Showing all users</HeaderText>
          </Header>
          <TablePadding>
            <Table>
              <TableThead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Location</TableHeader>
                  <TableHeader>Links</TableHeader>
                </TableRow>
              </TableThead>
              <TableBody>
                {users ? (
                  users.map((user: IUser) => {
                    return (
                      <TableRow key={user._id}>
                        <TableDataCell>
                          <TableDataNameContainer>
                            <TableDataImage
                              src={`${user.gitHub.json.avatar_url}`}
                            />
                            <TableDataName>
                              {username(user)}
                            </TableDataName>
                          </TableDataNameContainer>
                        </TableDataCell>
                        <TableDataCell>
                          <TableDataLocation>
                            {location(user)}
                          </TableDataLocation>
                        </TableDataCell>
                        <TableDataCell>
                          <TableActions>
                            <TableLink
                              href={`https://www.twitter.com/${user.twitter.username}`}
                              target="blank"
                              rel="noopener noreferrer"
                            >
                              <TwitterIcon />
                            </TableLink>
                            <TableLink
                              href={user.gitHub.json.html_url}
                              target="blank"
                              rel="noopener noreferrer"
                            >
                              <GitHubIcon />
                            </TableLink>
                            {/* <TableLink
                              href={`https://discordapp.com/channels/@me/${user.discord.username}#${user.discord.discriminator}`}
                              target="blank"
                              rel="noopener noreferrer"
                            >
                              <LinkedInIcon />
                            </TableLink> */}
                            {!currentUser ? (
                              ''
                            ) : alreadyFollowing &&
                              alreadyFollowing[user._id] ? (
                              <TableFollowed>Following</TableFollowed>
                            ) : (
                              <TableFollow
                                onClick={() => {
                                  handleFollowSubmit(
                                    user.gitHub.json.login,
                                    user.twitter.username,
                                    user._id
                                  );
                                }}
                                style={
                                  currentUser._id === user._id
                                    ? { opacity: 0, pointerEvents: 'none' }
                                    : undefined
                                }
                              >
                                Follow All
                              </TableFollow>
                            )}
                          </TableActions>
                        </TableDataCell>
                      </TableRow>
                    );
                  })
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
