/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { PageTitle } from '../components/misc/Typography';
import { SectionHeading } from '../components/misc/Typography';
import { Subheading } from '../components/misc/Typography';
import { Description } from '../components/misc/Typography';
import { BodyText } from '../components/misc/Typography';
import { PrimaryButton as PrimaryButtonBase } from '../components/misc/Buttons.js';
import ConnectPic from '../assets/connect.jpg';

const Container = tw.div`relative mx-10`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-1/2 flex-shrink-0 relative`;
const TextColumn = tw(
  Column
)`md:w-6/12 mt-16 md:mt-0 md:mr-12 lg:mr-16 md:order-first`;

const Image = tw.img`rounded-md shadow`;

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

// const PageTitle = tw(
//   SectionHeading
// )`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

export default function Home() {
  const heading = <>Git Connected</>

  const description = (
    <>A social networking hub built by and for the 100Devs community. </>
  );
 
  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image src={ConnectPic}/>
        </ImageColumn>
        <TextColumn>
          <TextContent>
            <PageTitle>{heading}</PageTitle>
            <Description>{description}</Description>
            <Subheading>{description}</Subheading>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
