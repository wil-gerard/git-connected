import tw from 'twin.macro';
import { SectionHeading as BaseSectionHeading } from '../components/misc/Typography';
import { Description as BaseDescription } from '../components/misc/Typography';
import { Subtitle, BodyText } from '../components/misc/Typography';
import {
  SignInIcon,
  AppsIcon,
  PencilIcon,
  CodeOfConductIcon,
} from '@primer/octicons-react';

const Container = tw.div`relative w-full px-10 lg:mx-auto py-20 lg:py-24 bg-secondary-900`;
const Column = tw.div`flex flex-col justify-between max-w-screen-xl mx-auto items-center`;
const TextColumn = tw(Column)`md:w-8/12 mt-16 md:mt-0`;
const TextContent = tw.div`py-8 text-center`;
const StepsContainer = tw.div`mt-8 flex flex-wrap max-w-screen-md items-center mx-auto text-gray-100`;
const Step = tw.div`flex py-4 w-full md:w-1/2 tracking-wide`;
const StepKey = tw(Subtitle)`text-sm font-medium text-left`;
const StepTitle = tw(BodyText)`font-medium text-primary-400`;
const StepInfoContainer = tw.div`text-left pr-4 flex flex-col justify-center`;
const Description = tw(BaseDescription)`text-center`;
const SectionHeading = tw(BaseSectionHeading)`text-center`;
const Link = tw.a`text-primary-900`;
const IconContainer = tw.div`mr-4`;
const Icon = tw.div`bg-primary-200 p-4 text-primary-700 rounded-full`;

export default function HowItWorks() {
  const heading = `How it works`;
  const description = `Sign in with Discord, get to know other 100Devs, and conect with the community on Twitter and GitHub at the click of a button.`;
  const stats = [
    {
      title: 'Join 100Devs',
      link: 'asdf',
      details: 'Already a member? Cool! Follow ahead.',
      icon: <SignInIcon size="large" />,
    },
    {
      title: 'Connect Twitter and Github',
      details: 'Other users can then follow both your accounts in-app.',
      icon: <AppsIcon size="large" />,
    },
    {
      title: 'Edit Profile',
      details: `Edit the name, location, and bio you'd like to be displayed`,
      icon: <PencilIcon size="large" />,
    },
    {
      title: 'Connect with 100Devs',
      details: 'Visit the Profiles and Featured page to connect with folks.',
      icon: <CodeOfConductIcon size="large" />,
    },
  ];
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
          <StepsContainer>
            {stats.map((step, index) => (
              <Step key={index}>
                <IconContainer>
                  <Icon>{step.icon}</Icon>
                </IconContainer>
                <StepInfoContainer>
                  <StepKey>Step {index + 1}</StepKey>
                  <StepTitle>{step.title}</StepTitle>
                  <BodyText>
                    {step.link && (
                      <Link href={step.link}>Learn more here. </Link>
                    )}
                    {step.details}
                  </BodyText>
                </StepInfoContainer>
              </Step>
            ))}
          </StepsContainer>
        </Column>
      </Container>
    </>
  );
}
