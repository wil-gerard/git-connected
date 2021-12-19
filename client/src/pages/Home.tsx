import tw from "twin.macro";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg";
import { ReactComponent as GitHubIcon } from "../assets/github-icon.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin-icon.svg";

import { myContext } from "../hooks/Context"
import React, { useContext } from "react";
import { IUser } from "../types/maintypes"

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-2 lg:py-24`;


const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div(props => [
  `background-image: url("${props}");`,
  tw`h-20 bg-cover bg-center rounded`
]);

const CardText = tw.div`mt-4`;

const CardHeader = tw.div`flex justify-between items-center`;
const CardName = tw.div`text-primary-500 font-bold text-lg`;
// const CardTech = tw.div`font-semibold text-sm text-gray-600`;

// const CardBio = tw.h5`text-xl mt-4 font-bold text-gray-100`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-center sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4 mr-4 last:mr-0`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;

export default function Home() {
  const user = useContext(myContext) as IUser

  console.log(user)
  if (!user) {
    return <p>loading...</p>
  }
  return (
    <>
      <Navbar />
      <Container>
        <Content>
          <Card>
            <CardImage />
            <CardText>
              <CardHeader>
                <CardName>{user.username}</CardName>
                {/* <CardTech>{user.tech}</CardTech> */}
              </CardHeader>
              {/* <CardBio>{user.bio}</CardBio> */}
              <CardMeta>
                <CardMetaFeature>
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
        </Content>
      </Container>
      <Footer />
    </>
  );
};
