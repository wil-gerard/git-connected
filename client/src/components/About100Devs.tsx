import React from 'react';
import tw from 'twin.macro';
import { SectionHeading as BaseSectionHeading } from '../components/misc/Typography';
import { Description as BaseDescription } from '../components/misc/Typography';
import { PrimaryButton as PrimaryButtonBase } from '../components/misc/Buttons';

const Container = tw.div`relative w-full px-10 lg:mx-auto py-20 lg:py-24 bg-secondary-800`;
const Column = tw.div`flex flex-col justify-between max-w-screen-xl mx-auto items-center`;
const TextColumn = tw(Column)`md:w-8/12 mt-16 md:mt-0`;

const TextContent = tw.div`py-8 text-center`;

const SectionHeading = tw(BaseSectionHeading)`text-center`;
const Description = tw(BaseDescription)`text-center`;

export default function FeatureStats() {
  const heading = `What is 100Devs?`;

  const description = `100Devs is a free full-stack JavaScript bootcamp that has grown into a community of over 30,000 on the Discord server. The bootcamp director, Leon Noel, teaches classes via Twitch and posts study material on the Discord server. We are a diverse global community that helps build each other up - all are welcome to join!`;

  return (
    <>
      <Container>
        <Column>
          <TextColumn>
            <TextContent>
              <SectionHeading>{heading}</SectionHeading>
              <Description>{description}</Description>
            </TextContent>
          </TextColumn>
          <a
            href="https://leonnoel.com/100devs"
            target="_blank"
            rel="noreferrer"
          >
            <PrimaryButtonBase>Learn more</PrimaryButtonBase>
          </a>
        </Column>
      </Container>
    </>
  );
}
