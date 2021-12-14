// import logo from "../images/logo.svg";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg";
import { ReactComponent as GitHubIcon } from "../assets/github-icon.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin-icon.svg";


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
  ${tw`cursor-pointer py-2 pl-2 pr-8 rounded-full bg-primary-600 text-gray-100 hocus:bg-primary-800 transition duration-300 m-2 text-sm`}
  svg {
    ${tw`inline-block w-8 h-8 mx-2`}
  }
`;

export default function Login() {

  const twitterLogin = () => {
    window.open("http://localhost:4000/auth/twitter", "_self")
  }

  return (
    <Container>
      <LoginContainer>
        <ButtonContainer>
          <LoginButton onClick={twitterLogin}>
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
