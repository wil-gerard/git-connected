import React from 'react';
import tw from 'twin.macro';
import TableLink from './TableLink';
import clientApi from '../api/clientApi';
import { SanitizedUser } from '../interface';
import GetWindowSize from '../hooks/GetWindowSize';
import { useUserContext } from '../hooks/UserContext';
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg';
import { ReactComponent as GitHubIcon } from '../assets/github-icon.svg';

type UserRowProps = {
  user: SanitizedUser;
  alreadyFollowing: any;
  setAlreadyFollowing: any;
};

const TableRow = tw.tr``;

const TableDataNameContainer = tw.div`flex items-center`;

const TableDataImage = tw.img`w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 rounded-full`;

const TableDataName = tw.div`font-medium text-gray-100`;

const TableDataLocation = tw.div`font-medium text-gray-100 text-left`;

const TableActions = tw.div`font-medium text-gray-100 text-left flex flex-row`;

const TableFollow = tw.a`flex items-center rounded shadow cursor-pointer bg-secondary-600 transition duration-300 hover:bg-primary-500  ml-1 py-0.5 px-2`;

const TableFollowed = tw.a`flex items-center justify-center rounded shadow cursor-default bg-green-600 transition duration-300  ml-1 py-0.5 px-2`;

const TableDataCell = tw.td`p-2 whitespace-nowrap`;

export default function TableUserRow({
  user,
  alreadyFollowing,
  setAlreadyFollowing,
}: UserRowProps) {
  const { windowWidth } = GetWindowSize();
  const { currentUser } = useUserContext();

  const handleFollowSubmit = async (
    gitHubUsername: string,
    twitterUsername: string,
    targetId: string
  ) => {
    try {
      const res = await clientApi({
        method: 'post',
        url: '/api/user/followall',
        params: {
          twitterUsername,
          gitHubUsername,
          targetId,
        },
        withCredentials: true,
      });
      setAlreadyFollowing(res.data.alreadyFollowingTheseIds);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const username = (user: SanitizedUser) => {
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

  const location = (user: SanitizedUser) => {
    if (user.customLocation !== '') {
      return user.customLocation;
    } else if (user.gitHubConnected) {
      return user.gitHub.json.location;
    } else {
      return null;
    }
  };

  const userLinks = [
    {
      name: 'Twitter',
      href: `https://www.twitter.com/${user.twitter.username}`,
      icon: <TwitterIcon />,
    },
    {
      name: 'GitHub',
      href: user.gitHub.json.html_url,
      icon: <GitHubIcon />,
    },
  ];

  return (
    <TableRow>
      <TableDataCell>
        <TableDataNameContainer>
          <TableDataImage src={`${user.gitHub.json.avatar_url}`} />
          <TableDataName>{username(user)}</TableDataName>
        </TableDataNameContainer>
      </TableDataCell>
      {windowWidth > 500 && (
        <TableDataCell>
          <TableDataLocation>{location(user)}</TableDataLocation>
        </TableDataCell>
      )}
      <TableDataCell>
        <TableActions>
          {userLinks.map((platform) => (
            <TableLink
              key={platform.name}
              href={platform.href}
              icon={platform.icon}
            />
          ))}
          {/* <TableLink
                href={`https://discordapp.com/channels/@me/${user.discord.username}#${user.discord.discriminator}`}
                target="blank"
                rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </TableLink> */}
          {!currentUser ? (
            ''
          ) : alreadyFollowing && alreadyFollowing[user._id] ? (
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
}
