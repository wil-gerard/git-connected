import tw from 'twin.macro'
import styled from "styled-components";
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg'
import { ReactComponent as GitHubIcon } from '../assets/github-icon.svg'
import { myContext } from '../hooks/Context'
import React, { useContext, useState } from 'react'
import { IUser } from '../interface'
import  { UserCard } from '../components/UserCard'


const Container = tw.div`flex flex-col px-6 text-gray-100`

const Content = tw.div`mx-auto justify-center `

const Button = tw.button`focus:outline-none text-gray-100 text-sm py-2 px-4 rounded-full bg-primary-600 hocus:bg-primary-800 transition duration-300 hover:shadow-lg mb-4`

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

const ConnectAccountButton = styled.button`
  ${tw`cursor-pointer py-2 pl-2 pr-8 rounded-full bg-primary-600 text-gray-100 hocus:bg-primary-800 transition duration-300 m-2 text-sm flex justify-start items-center`}
  svg {
    ${tw`w-8 h-8 mx-2`}
  }
`

const ConnectedAccountButton = tw(ConnectAccountButton)`bg-green-800 disabled:hocus:bg-green-800 disabled:cursor-auto`

const LoginContainer = tw.div`px-10 py-2 flex-col flex`

export default function Profile() {

    const gitHubConnect = () => {
        window.open("http://localhost:4000/api/auth/github", "_self")
    }

    const twitterConnect = () => {
        window.open("http://localhost:4000/api/auth/twitter", "_self")
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
                    <UserCard {...user} />
                    <LoginContainer>
                        {user.gitHubConnected ?
                            <ConnectedAccountButton disabled>
                                <GitHubIcon />
                                Connected to GitHub ✔
                            </ConnectedAccountButton>
                            :
                            <ConnectAccountButton onClick={gitHubConnect}>
                                <GitHubIcon />
                                Connect to GitHub
                            </ConnectAccountButton>
                        }
                        {user.twitterConnected ?
                            <ConnectedAccountButton disabled>
                                <TwitterIcon />
                                Connected to Twitter ✔
                            </ConnectedAccountButton>
                            :
                            <ConnectAccountButton onClick={twitterConnect}>
                                <TwitterIcon />
                                Connect to Twitter
                            </ConnectAccountButton>
                        }
                    </LoginContainer>
                </Content>
            </Container>
        </>
    )
}
