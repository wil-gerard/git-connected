import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg";
import { ReactComponent as GitHubIcon } from "../assets/github-icon.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin-icon.svg";
import { myContext } from "../hooks/Context"
import React, { useContext } from "react";
import { IUser } from "../types/maintypes"


const Container = tw.div`flex-col px-6 md:ml-auto lg:ml-8 xl:ml-64 text-gray-100`;

const Header = tw.h1`flex items-center text-2xl mb-2 font-bold`

const Subhead = tw.h2`font-bold text-lg mb-2`

const ProfilePic = styled.img`
    ${tw`h-40 w-40 rounded-full shadow-xl mb-2`}
`

const ButtonContainer = styled.div`
  ${tw`flex-col flex w-3/12`}
`

const ConnectButton = styled.a`
  ${tw`cursor-pointer py-2 pl-2 pr-8 rounded-full bg-primary-600 text-gray-100 hocus:bg-primary-800 transition duration-300 m-2 text-sm`}
  svg {
    ${tw`inline-block w-8 h-8 mx-2`}
  }
`;



export default function Profile() {

    const user = useContext(myContext) as IUser

    if (!user) {
        return <p>loading...</p>
    }

    return (
        <>
            <Navbar />
            <Container>
                <Header>Hi, {user.username}!</Header>
                <ProfilePic src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="g2k logo" />
                <Subhead>About</Subhead>
                <textarea name="" id="" className="form-textarea text-black w-80 p-1" placeholder="All about you..." />
                <Subhead>Connect Socials</Subhead>
                <ButtonContainer>
                    <ConnectButton>
                        <TwitterIcon />
                        Connect your Twitter
                    </ConnectButton>
                    <ConnectButton>
                        <GitHubIcon />
                        Connect your GitHub
                    </ConnectButton>
                    <ConnectButton>
                        <LinkedInIcon />
                        Connect your LinkedIn
                    </ConnectButton>
                </ButtonContainer>
            </Container>
            <Footer />
        </>
    )
}
