// import logo from "../images/logo.svg";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as TwitterIcon } from "../images/twitter-icon.svg";
import { ReactComponent as GitHubIcon } from "../images/github-icon.svg";
import { ReactComponent as LinkedInIcon } from "../images/linkedin-icon.svg";


const Container = styled.div`
  ${tw`flex justify-center items-center h-screen`}
`

const LoginContainer = styled.div`
  ${tw`max-w-sm rounded shadow-lg bg-secondary-800`}
`

const ButtonContainer = styled.div`
  ${tw`px-10 py-5 flex-col flex`}
`

const LoginButton = styled.a`
  ${tw`cursor-pointer py-2 pl-2 pr-8 rounded-full bg-primary-600 text-gray-100 hocus:bg-primary-800 transition duration-300 m-2`}
  svg {
    ${tw`inline-block w-8 h-8 mx-2`}
  }
`;

export default function Login() {
  return (
    <Container>
      <LoginContainer>
        <ButtonContainer>
          <LoginButton>
            <TwitterIcon />
            Sign in with Twitter
          </LoginButton>
          <LoginButton>
            <LinkedInIcon />
            Sign in with LinkedIn
          </LoginButton>
          <LoginButton>
            <GitHubIcon />
            Sign in with GitHub
          </LoginButton>
        </ButtonContainer>
      </LoginContainer>
    </Container >
  );
}
