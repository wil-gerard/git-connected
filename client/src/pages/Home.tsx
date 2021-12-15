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

const ThreeColumn = tw.div`flex flex-wrap`;
const Column = tw.div`xl:mr-12 xl:last:mr-0`;
const CardColumn = tw(Column)`w-full md:flex-initial xl:w-3/12`;

const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div(props => [
  `background-image: url("${props}");`,
  tw`h-20 bg-cover bg-center rounded`
]);

const CardText = tw.div`mt-4`;

const CardHeader = tw.div`flex justify-between items-center`;
const CardName = tw.div`text-primary-500 font-bold text-lg`;
const CardTech = tw.div`font-semibold text-sm text-gray-600`;

const CardBio = tw.h5`text-xl mt-4 font-bold text-gray-100`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-center sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4 mr-4 last:mr-0`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;
// const CardAction = tw(PrimaryButtonBase)`w-full mt-6`;

export default function Home() {
  const context = useContext(myContext) as IUser
  const cards = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      name: "Steve Austin",
      tech: "Frontend",
      bio: "Hey folks! I'm looking for Twitter endorsments",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1573165231977-3f0e27806045?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      name: "Jan Uary",
      tech: "Full-stack",
      bio: "I'd love LinkedIn endorsements. Holler at me for group project work",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1573165231977-3f0e27806045?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      name: "Mary Ander",
      tech: "Backend",
      bio: "GitHub followers please!",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      name: "Steve Austin",
      tech: "Frontend",
      bio: "Hey folks! I'm looking for Twitter endorsments",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1573165231977-3f0e27806045?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      name: "Jan Uary",
      tech: "Full-stack",
      bio: "I'd love LinkedIn endorsements. Holler at me for group project work",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1573165231977-3f0e27806045?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      name: "Mary Ander",
      tech: "Backend",
      bio: "GitHub followers please!",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      name: "Steve Austin",
      tech: "Frontend",
      bio: "Hey folks! I'm looking for Twitter endorsments",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1573165231977-3f0e27806045?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      name: "Jan Uary",
      tech: "Full-stack",
      bio: "I'd love LinkedIn endorsements. Holler at me for group project work",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1573165231977-3f0e27806045?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      name: "Mary Ander",
      tech: "Backend",
      bio: "GitHub followers please!",
    },
  ];
  return (
    <>
      <Navbar />
      
      <Container>
        <Content>
          <ThreeColumn>
            {cards.map((card, index) => (
              <CardColumn key={index}>
                <Card>
                  <CardImage />
                  <CardText>
                    <CardHeader>
                      <CardName>{context.username}</CardName>
                      <CardTech>{card.tech}</CardTech>
                    </CardHeader>
                    <CardBio>{card.bio}</CardBio>
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
                    {/* <CardAction>{cardLinkText}</CardAction> */}
                  </CardText>
                </Card>
              </CardColumn>
            ))}
          </ThreeColumn>
        </Content>
      </Container>
      <Footer />
    </>
  );
};
