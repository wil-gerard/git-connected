/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { SectionHeading as BaseSectionHeading } from '../components/misc/Typography';
import { Subheading } from '../components/misc/Typography';
import { Description as BaseDescription } from '../components/misc/Typography';
import { Subtitle } from '../components/misc/Typography';
import { PrimaryButton as PrimaryButtonBase } from '../components/misc/Buttons';

const Container = tw.div`relative w-full mx-auto py-20 lg:py-24 bg-secondary-700`;
const Column = tw.div`flex flex-col justify-between max-w-screen-xl mx-auto items-center`;
const TextColumn = tw(Column)`md:w-8/12 mt-16 md:mt-0`;

const TextContent = tw.div`lg:py-8 text-center`;

const StatsContainer = tw.div`mt-8 flex flex-col sm:flex-row items-center flex-wrap max-w-screen-md justify-between mx-auto text-gray-100`;
const Stat = tw.div`flex flex-col text-center p-4 tracking-wide`;
const StatKey = tw(Subtitle)`text-xl font-medium`;
const StatValue = tw(Subheading)`text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-black`;

export default function FeatureStats() {
  const heading = <>Open-source development</>;

  const description = (
    <>
      We are driving development through a GitHub monorepo. Your feedback helps
      us understand what works, what doesn't, and what features the community
      would like to see.
    </>
  );

  const stats = [
    {
      key: 'Clients',
      value: '2500+',
    },
    {
      key: 'Revenue',
      value: '$100M+',
    },
    {
      key: 'Employees',
      value: '150+',
    },
  ];

  const SectionHeading = tw(BaseSectionHeading)`text-center`;
  const Description = tw(BaseDescription)`text-center`;

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
          <PrimaryButtonBase>Join the discussion</PrimaryButtonBase>
          <StatsContainer>
            {stats.map((stat, index) => (
              <Stat key={index}>
                <StatValue>{stat.value}</StatValue>
                <StatKey>{stat.key}</StatKey>
              </Stat>
            ))}
          </StatsContainer>
        </Column>
      </Container>
    </>
  );
}
