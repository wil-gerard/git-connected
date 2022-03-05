import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { IUser } from '../interface';
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg';
import { ReactComponent as GitHubIcon } from '../assets/github-icon.svg';
import { ReactComponent as LinkedInIcon } from '../assets/linkedin-icon.svg';

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
            {user.gitHubConnected
              ? user.gitHub.json.name || user.gitHub.json.login
              : user.discord.username}
          </CardName>
          <CardLocation>
            {user.gitHubConnected ? user.gitHub.json.location : null}
          </CardLocation>
        </CardHeader>
        <CardBio>{user.gitHubConnected ? user.gitHub.json.bio : null}</CardBio>
        <CardMeta>
          <CardMetaFeature href={user.discord.username}>
            <TwitterIcon />
          </CardMetaFeature>
          <CardMetaFeature>
            <GitHubIcon />
          </CardMetaFeature>
          <CardMetaFeature>
            <LinkedInIcon />
          </CardMetaFeature>
        </CardMeta>
      </CardText>
    </Card>
  );
};
