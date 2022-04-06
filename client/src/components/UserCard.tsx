import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { IUser } from '../interface';
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg';
import { ReactComponent as GitHubIcon } from '../assets/github-icon.svg';

const Card = tw.div`mx-auto ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs bg-secondary-800 p-4 rounded shadow-lg`;

const CardImageContainer = styled.div`
  ${tw`flex justify-center`}
`;
const CardImage = styled.img`
  ${tw`h-4/6 w-4/6 rounded-full shadow-md mb-2`}
`;
const CardText = tw.div`mt-4`;

const CardLocation = tw.div`font-semibold text-sm text-gray-600`;

const CardBio = tw.h5`text-base mt-2 font-bold text-gray-100 text-center`;

const CardHeader = tw.div`flex justify-center items-center flex-col`;

const CardName = tw.div`text-primary-500 font-bold text-xl`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-center sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.a`
  ${tw`flex items-center mt-4 mr-4 last:mr-0`}
  svg {
    ${tw`w-6 h-6 mr-1 text-secondary-100 hocus:text-primary-600 transition duration-300`}
  }
`;

export const UserCard: React.FC<IUser> = (user) => {

  const username = (user: IUser) => {
    if (user.customName !== '') {
      return user.customName
    } else if(user.gitHubConnected) {
      return user.gitHub.json.login
    } else if (user.twitterConnected) {
      return user.twitter.username
    } else {
      return user.discord.username
    }
  }

  const location = (user: IUser) => {
    if (user.customLocation !== '') {
      return user.customLocation
    } else if (user.gitHubConnected) {
      return user.gitHub.json.location
    } else {
      return null
    }
  }

  const bio = (user: IUser) => {
    if (user.customBio !== '') {
      return user.customBio
    } else if (user.gitHubConnected) {
      return user.gitHub.json.bio
    } else {
      return null
    }
  }

  return (
    <Card>
      <CardImageContainer>
        <CardImage
          src={
            user.gitHubConnected
              ? user.gitHub.json.avatar_url
              : `https://cdn.discordapp.com/avatars/${user.discord.id}/${user.discord.avatar}.png`
          }
        />
      </CardImageContainer>
      <CardText>
        <CardHeader>
          <CardName>
            {username(user)}
          </CardName>
          <CardLocation>
            {location(user)}
          </CardLocation>
        </CardHeader>
        <CardBio>
          {bio(user)}
        </CardBio>
        <CardMeta>
          {user.twitter?.id && (
            <CardMetaFeature
              href={
                'https://www.twitter.com/' + user.twitter.id
              }
              target="_blank"
            >
              <TwitterIcon />
            </CardMetaFeature>
          )}
          {user.gitHub?.json && (
            <CardMetaFeature href={user.gitHub.json.html_url} target="_blank">
              <GitHubIcon />
            </CardMetaFeature>
          )}
          {user.gitHub && user.twitter ? (
            ''
          ) : (
            <div>{'Connect Github & Twitter to be listed'}</div>
          )}
          {/* <CardMetaFeature>
            <LinkedInIcon />
          </CardMetaFeature> */}
        </CardMeta>
      </CardText>
    </Card>
  );
};
