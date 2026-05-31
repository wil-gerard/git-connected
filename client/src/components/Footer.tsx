import { GradientBar } from './GradiantBar';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import styled from 'styled-components';

const FooterContainer = tw.footer`container mx-auto px-6 pt-10`;
const Column = tw.div`mt-8 mb-16 sm:mt-0 sm:w-full sm:px-8 lg:px-40 flex flex-col md:flex-row justify-between`;
const FooterContent = tw.div`flex flex-col`;
const FooterContentHeader = tw.h4`font-bold text-fluid-sm text-gray-300 uppercase mb-2`;
const FooterLink = tw.span`my-2 text-fluid-sm text-gray-300 hover:text-primary-500 transition duration-300 cursor-pointer`;
const FooterExternalLink = styled.a`
  ${tw`my-2 text-fluid-sm text-gray-300 hover:text-primary-500 transition duration-300`}
`;

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <FooterContainer>
        <Column>
          <FooterContent>
            <FooterContentHeader>Content</FooterContentHeader>
            <FooterLink onClick={() => navigate('/')}>Home</FooterLink>
            <FooterLink onClick={() => navigate('/profiles')}>Profiles</FooterLink>
            <FooterLink onClick={() => navigate('/featured')}>Featured</FooterLink>
          </FooterContent>
          <FooterContent>
            <FooterContentHeader>100Devs</FooterContentHeader>
            <FooterExternalLink href="https://leonnoel.com/100devs/" target="_blank" rel="noreferrer noopener">
              Info
            </FooterExternalLink>
            <FooterExternalLink href="https://leonnoel.com/discord" target="_blank" rel="noreferrer noopener">
              Discord
            </FooterExternalLink>
          </FooterContent>
          <FooterContent>
            <FooterContentHeader>Contact</FooterContentHeader>
            <FooterExternalLink href="https://github.com/wil-gerard/git-connected" target="_blank" rel="noreferrer noopener">
              Project GitHub repo
            </FooterExternalLink>
            <FooterExternalLink href="https://www.wilgerard.com/" target="_blank" rel="noreferrer noopener">
              Lead developer
            </FooterExternalLink>
          </FooterContent>
        </Column>
      </FooterContainer>
      <GradientBar />
    </>
  );
}
