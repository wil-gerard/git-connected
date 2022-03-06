import Axios, { AxiosResponse } from 'axios';
import tw from 'twin.macro';
import styled from 'styled-components';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg';
import { ReactComponent as GitHubIcon } from '../assets/github-icon.svg';
import { ReactComponent as LinkedInIcon } from '../assets/linkedin-icon.svg';

import { myContext } from '../hooks/Context';
import React, { useEffect, useState, useContext } from 'react';
import { IUser } from '../interface';

const Container = tw.div`flex flex-col px-6 text-gray-100`;
const Content = tw.div`flex-row flex max-w-screen-xl mx-auto py-2`;

const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImageContainer = styled.div`
  ${tw`flex justify-center`}
`;
const CardImage = styled.img`
  ${tw`h-4/6 w-4/6 rounded-full shadow-xl mb-2`}
`;

const CardText = tw.div`mt-4`;
const CardLocation = tw.div`font-semibold text-sm text-gray-600`;
const CardBio = tw.h5`text-lg mt-4 font-bold text-gray-100 text-center`;
const CardHeader = tw.div`flex justify-center items-center flex-col`;
const CardName = tw.div`text-primary-500 font-bold text-xl`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-center sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.a`
  ${tw`flex items-center mt-4 mr-4 last:mr-0`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;

const Header = tw.h1`flex flex-col items-center text-5xl font-bold mb-0`;

export default function Featured() {
  const ctx = useContext(myContext);

  const [users, setUsers] = useState<IUser[]>();
  useEffect(() => {
    Axios.get('http://localhost:4000/api/user/getallusers').then(
      (res: AxiosResponse) => {
        setUsers(res.data);
      }
    );
  }, [ctx]);

  if (!users) {
    return <p>Loading...</p>;
  }

  const randomIndex = Math.floor( Math.random() * users.length ) ;
  const randomUser = users[randomIndex];

  return (
    <>
      <Container>
        <Header>Git to Know...</Header>
        <Content>
              <Card key={randomUser.gitHub.id}>
                <CardImageContainer>
                  <CardImage src={randomUser.gitHub.json.avatar_url} />
                </CardImageContainer>
                <CardText>
                  <CardHeader>
                    <CardName>{randomUser.gitHub.json.name}</CardName>
                    <CardLocation>{randomUser.gitHub.json.location}</CardLocation>
                  </CardHeader>
                  <CardBio>{randomUser.gitHub.json.bio}</CardBio>
                  <CardMeta>
                    <CardMetaFeature href={"https://www.twitter.com/" + randomUser.gitHub.json.twitter_username} target="_blank">
                      <TwitterIcon />
                    </CardMetaFeature>
                    <CardMetaFeature href={randomUser.gitHub.json.html_url} target="_blank">
                      <GitHubIcon />
                    </CardMetaFeature>
                    {/* <CardMetaFeature>
                      <LinkedInIcon />
                    </CardMetaFeature> */}
                  </CardMeta>
                </CardText>
              </Card>
            
        </Content>
      </Container>
    </>
  );
}
