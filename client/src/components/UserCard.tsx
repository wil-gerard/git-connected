import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { Subtitle } from './misc/Typography';
import { Subheading } from './misc/Typography';
import { BodyText } from './misc/Typography';
import { SanitizedUser } from '../interface';
import GitHubIcon from '../assets/github-icon.svg?react';
import LinkedInIcon from '../assets/linkedin-icon.svg?react';
import TwitterIcon from '../assets/twitter-icon.svg?react';
import LinkIcon from '../assets/link-icon.svg?react';

const SOCIAL_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
};

const Card = tw.div`mx-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs bg-secondary-800 p-4 rounded shadow-lg`;

const CardImageContainer = styled.div`
  ${tw`flex justify-center`}
`;
const CardImage = styled.img`
  ${tw`h-4/6 w-4/6 rounded-full shadow-md mb-2`}
`;
const CardText = tw.div`mt-4`;
const CardLocation = tw(Subtitle)``;
const CardBio = tw(BodyText)`mt-2 text-center`;
const CardHeaderContainer = tw.div`flex justify-center items-center flex-col`;
const CardName = tw(Subheading)``;

const CardMeta = styled.div`
  ${tw`flex justify-center flex-wrap`}
`;

const CardMetaFeature = styled.a`
  ${tw`mt-4 mr-4 last:mr-0`}
  svg {
    ${tw`w-6 h-6 text-secondary-100 hocus:text-primary-600 transition duration-300`}
  }
`;

export const UserCard: React.FC<SanitizedUser> = (user) => {
  const username = (user: SanitizedUser) => {
    if (user.customName !== '') return user.customName;
    if (user.gitHubConnected) return user.gitHub.json.login;
    if (user.twitterConnected) return user.twitter.username;
    return user.discord.username;
  };

  const location = (user: SanitizedUser) => {
    if (user.customLocation !== '') return user.customLocation;
    if (user.gitHubConnected) return user.gitHub.json.location;
    return null;
  };

  const bio = (user: SanitizedUser) => {
    if (user.customBio !== '') return user.customBio;
    if (user.gitHubConnected) return user.gitHub.json.bio;
    return null;
  };

  const socialAccounts = user.socialAccounts?.length
    ? user.socialAccounts
    : user.linkedInUrl
    ? [{ provider: 'linkedin', url: user.linkedInUrl }]
    : [];

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
        <CardHeaderContainer>
          <CardName>{username(user)}</CardName>
          <CardLocation>{location(user)}</CardLocation>
        </CardHeaderContainer>
        <CardBio>{bio(user)}</CardBio>
        <CardMeta>
          {user.gitHub?.json && (
            <CardMetaFeature href={user.gitHub.json.html_url} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
            </CardMetaFeature>
          )}
          {socialAccounts.map(({ provider, url }) => {
            const Icon = SOCIAL_ICONS[provider] ?? LinkIcon;
            return (
              <CardMetaFeature key={url} href={url} target="_blank" rel="noopener noreferrer" title={provider}>
                <Icon />
              </CardMetaFeature>
            );
          })}
          {!user.gitHub && <div>Connect GitHub to be listed</div>}
        </CardMeta>
      </CardText>
    </Card>
  );
};
