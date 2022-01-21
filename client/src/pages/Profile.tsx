import tw, { styled } from "twin.macro"
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg";
import { ReactComponent as GitHubIcon } from "../assets/github-icon.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin-icon.svg";
import { myContext } from "../hooks/Context"
import React, { useContext, useState } from "react";
import { IUser } from "../interface"


const Container = tw.div`flex flex-col px-6 text-gray-100`

const Content = tw.div`max-w-screen-xl mx-auto py-2 lg:py-24`

const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`

const CardImageContainer = styled.div`
    ${tw`flex justify-center`}
`
const CardImage = styled.img`
    ${tw`h-4/6 w-4/6 rounded-full shadow-xl mb-2`}
`
const CardText = tw.div`mt-4`

const CardLocation = tw.div`font-semibold text-sm text-gray-600`

const CardBio = tw.h5`text-lg mt-4 font-bold text-gray-100 text-center`

const CardHeader = tw.div`flex justify-center items-center flex-col`

const CardName = tw.div`text-primary-500 font-bold text-xl`

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-center sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`

const CardMetaFeature = styled.a`
  ${tw`flex items-center mt-4 mr-4 last:mr-0`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`

const Button = tw.button`focus:outline-none text-gray-100 text-sm py-2 px-4 rounded-full bg-primary-600 hocus:bg-primary-800 transition duration-300 hover:shadow-lg`

const ModalContainer = tw.div`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full`

const ModalContentContainer = tw.div`relative w-auto my-6 mx-auto max-w-2xl`

const ModalContent = tw.div`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary-800 outline-none focus:outline-none`

const ModalHeader = tw.div`flex items-start justify-between p-5 border-b border-solid`

const ModalInputContainer = tw.div`relative p-4 flex-auto w-full`

const ModalInput = tw.input`border-0 px-3 py-3 placeholder-gray-600 text-gray-100 bg-secondary-700 rounded text-sm shadow focus:outline-none focus:ring hocus:w-full ease-linear transition-all duration-150`

const ModalBioInput = tw.textarea`w-full border-0 px-3 py-3 placeholder-gray-600 text-gray-100 bg-secondary-700 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150`

const ModalInputLabel = tw.label`block uppercase text-gray-300 text-xs font-bold mb-2`

const H3 = tw.div`text-xl font-semibold`

const CloseButton = tw.button`flex items-center justify-center bg-transparent font-semibold hocus:bg-secondary-600 h-10 w-10 text-2xl rounded-full`

const BgOpacity = tw.div`opacity-25 fixed inset-0 z-40 bg-black`

const LoginButton = styled.a`
  ${tw`cursor-pointer py-2 pl-2 pr-8 rounded-full bg-primary-600 text-gray-100 hocus:bg-primary-800 transition duration-300 m-2 text-sm`}
  svg {
    ${tw`inline-block w-8 h-8 mx-2`}
  }
`;

const LoginContainer = tw.div`px-10 py-5 flex-col flex`

export default function Profile() {

    const githubLogin = () => {
        window.open("http://localhost:4000/auth/github", "_self")
    }

    const twitterLogin = () => {
        window.open("http://localhost:4000/auth/twitter", "_self")
    }

    const [showModal, setShowModal] = useState(false)

    const user = useContext(myContext) as IUser

    if (!user) {
        return <p>loading...</p>
    }

    return (
        <>

            <Container>
                <Content>
                    <Button type="button" onClick={() => setShowModal(true)}>Edit profile</Button>
                    {showModal ? (
                        <>
                            <ModalContainer>
                                <ModalContentContainer>
                                    <ModalContent>
                                        <ModalHeader>
                                            <H3>
                                                Edit profile
                                            </H3>

                                            <CloseButton onClick={() => setShowModal(false)}>
                                                x
                                            </CloseButton>
                                        </ModalHeader>
                                        <ModalInputContainer>
                                            <ModalInputLabel>Twitter</ModalInputLabel>
                                            <ModalInput>
                                            </ModalInput>
                                        </ModalInputContainer>
                                        <ModalInputContainer>
                                            <ModalInputLabel>LinkedIn</ModalInputLabel>
                                            <ModalInput>

                                            </ModalInput>
                                        </ModalInputContainer>
                                        <ModalInputContainer>
                                            <ModalInputLabel>About me</ModalInputLabel>
                                            <ModalBioInput rows={2}>
                                                bio...
                                            </ModalBioInput>
                                        </ModalInputContainer>
                                        <div className="flex items-center justify-center p-6 border-t border-solid rounded-b">
                                            <button
                                                className="bg-green-600 text-white hover:bg-green-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Save Changes
                                            </button>
                                        </div>

                                    </ModalContent>
                                </ModalContentContainer>
                            </ModalContainer>
                            <BgOpacity />
                        </>
                    ) : null}
                    <Card>
                        <CardImageContainer>
                            <CardImage src={`https://cdn.discordapp.com/avatars/${user.discord.id}/${user.discord.avatar}.png`} />
                        </CardImageContainer>
                        <CardText>
                            <CardHeader>
                                <CardName>{user.discord.username}</CardName>
                                <CardLocation>{user.discord.username}</CardLocation>
                            </CardHeader>
                            <CardBio>{user.discord.username}</CardBio>
                            <CardMeta>
                                <CardMetaFeature href={user.discord.username}>
                                    <TwitterIcon />
                                </CardMetaFeature>
                                <CardMetaFeature>
                                    <GitHubIcon />
                                </CardMetaFeature>
                                <CardMetaFeature>
                                    <LinkedInIcon />
                                </CardMetaFeature>
                            </CardMeta>
                        </CardText>
                    </Card>
                    <LoginContainer>
                        <LoginButton onClick={githubLogin}>
                            <GitHubIcon />
                            Link account to GitHub
                        </LoginButton>
                        <LoginButton onClick={twitterLogin}>
                            <TwitterIcon />
                            Link account to Twitter
                        </LoginButton>
                    </LoginContainer>
                </Content>
            </Container>
        </>
    )
}
