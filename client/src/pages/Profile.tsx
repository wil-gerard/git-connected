import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg";
import { ReactComponent as GitHubIcon } from "../assets/github-icon.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin-icon.svg";

let username = "Bob"

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
    return (
        <>
            <Navbar />
            <div className="flex-col px-6  md:ml-auto lg:ml-8 xl:ml-64 container text-gray-100">

                <div className="mb-6">
                    <h1 className="flex items-center text-2xl mb-4 font-bold">Hi, {username}!</h1>
                    <img className="flex h-40 w-40 rounded-full ring-2 ring-gray mb-4" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="g2k logo" />
                </div>

                <div className="mb-6">
                    <h2 className="font-bold text-lg mb-2">About</h2>
                    <textarea name="" id="" className="form-textarea text-black w-80" placeholder="All about you..." />
                </div>

                <div className="mb-12">
                    <h2 className="font-bold text-lg mb-2">Connect Socials</h2>
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
                </div>

            </div>
            <Footer />
        </>
    )
}
