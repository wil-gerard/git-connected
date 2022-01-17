import React from "react"
import tw from "twin.macro";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    // window.open("http://localhost:4000/auth/twitter", "_self")
  }

  const githubLogin = () => {
    window.open("https://git-connected.herokuapp.com/auth/github", "_self")
  }

  const linkedinLogin = () => {
    // window.open("http://localhost:4000/auth/linkedin", "_self")
  }

  return (
    <>
      < Navbar />
      <Container>
        <LoginContainer>
          <ButtonContainer>
            <LoginButton onClick={twitterLogin}>
              <TwitterIcon />
              Sign in with Twitter
            </LoginButton>
            <LoginButton onClick={linkedinLogin}>
              <LinkedInIcon />
              Sign in with LinkedIn
            </LoginButton>
            <LoginButton onClick={githubLogin}>
              <GitHubIcon />
              Sign in with GitHub
            </LoginButton>
          </ButtonContainer>
        </LoginContainer>
      </Container >
      < Footer />
    </>
  );
}
