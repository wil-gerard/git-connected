import tw from 'twin.macro'
import styled from "styled-components";
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg'
import { ReactComponent as GitHubIcon } from '../assets/github-icon.svg'
import { ReactComponent as LinkedInIcon } from '../assets/linkedin-icon.svg'
import { myContext } from '../hooks/Context'
import React, { useContext, useState } from 'react'
import { IUser } from '../interface'
import { UserCard } from '../components/UserCard'
import axios from 'axios';

const Container = tw.div`flex flex-col px-6 text-gray-100`

const Content = tw.div`mx-auto justify-center `

const Button = tw.button`focus:outline-none text-gray-100 text-sm py-2 px-4 rounded-full bg-primary-600 hocus:bg-primary-800 transition duration-300 hover:shadow-lg mb-4`

const ModalContainer = tw.div`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full`

const ModalContentContainer = tw.div`relative w-auto my-6 mx-auto max-w-2xl`

const ModalContent = tw.div`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary-800 outline-none focus:outline-none`

const ModalHeader = tw.div`flex items-start justify-between p-5 border-b border-solid`

const ProfileForm = tw.form``

const FormInputContainer = tw.div`relative p-4 flex-auto w-full`

const FormTextInput = tw.input`border-0 px-3 py-3 placeholder-gray-600 text-gray-100 bg-secondary-700 rounded text-sm shadow focus:outline-none focus:ring hocus:w-full ease-linear transition-all duration-150`

const FormTextArea = tw.textarea`w-full border-0 px-3 py-3 placeholder-gray-600 text-gray-100 bg-secondary-700 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150`

const FormCheckbox = tw.input`h-4 w-4 focus:ring border-gray-300 border-0 px-3 py-3 text-gray-100 bg-secondary-700 rounded text-sm shadow focus:outline-none ease-linear transition-all duration-150`

const FormLabel = tw.label`block uppercase text-gray-300 text-xs font-bold mb-2`

const ModalHeaderText = tw.h3`text-xl font-semibold`

const ModalCloseButton = tw.button`flex items-center justify-center bg-transparent font-semibold hocus:bg-secondary-600 h-10 w-10 text-2xl rounded-full`

const ModalFooter = tw.div`flex items-center justify-center p-6 border-t border-solid rounded-b`

const FormSubmitButton = tw.button`bg-green-600 text-white hover:bg-green-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`

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

    const [formData, setFormData] = useState({
        customBio: '',
        customLocation: '',
        customName: '',
        lookingForCoffeeChats: false,
        openToCoffeeChats: false,
    });

    const { customBio, customLocation, customName, lookingForCoffeeChats, openToCoffeeChats } = formData;

    const handleInputChange = (e: any) =>
        setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

    const handleProfileFormSubmit = async () => {
        setShowModal(false)

        try {
            axios({
                method: 'put',
                url: 'http://localhost:4000/api/user/update',
                data: formData,
                withCredentials: true,
                responseType: 'json'
            }).then((res) => {
                if (res) {
                    console.log(res)
                }
            })

        } catch (err: any) {
            console.error(err)
        }
    }

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
                                            <ModalHeaderText>
                                                Edit profile
                                            </ModalHeaderText>

                                            <ModalCloseButton onClick={() => setShowModal(false)}>
                                                x
                                            </ModalCloseButton>
                                        </ModalHeader>
                                        <ProfileForm
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleProfileFormSubmit();
                                            }}
                                        >
                                            <FormInputContainer>
                                                <FormLabel>Name</FormLabel>
                                                <FormTextInput
                                                    type="text"
                                                    name="customName"
                                                    value={customName}
                                                    onChange={handleInputChange}
                                                />

                                            </FormInputContainer>
                                            <FormInputContainer>
                                                <FormLabel>Location</FormLabel>
                                                <FormTextInput
                                                    type="text"
                                                    name="customLocation"
                                                    value={customLocation}
                                                    onChange={handleInputChange}
                                                />

                                            </FormInputContainer>
                                            <FormInputContainer>
                                                <FormLabel>Bio</FormLabel>
                                                <FormTextArea rows={2}
                                                    name="customBio"
                                                    value={customBio}
                                                    onChange={handleInputChange}
                                                />

                                            </FormInputContainer>
                                            <FormInputContainer>
                                                <FormLabel htmlFor="lookingForCoffeeChats">Looking for coffee chat</FormLabel>
                                                <FormCheckbox
                                                    name="lookingForCoffeeChats"
                                                    type="checkbox"
                                                    checked={lookingForCoffeeChats}
                                                    onChange={handleInputChange}
                                                />
                                                <FormLabel htmlFor="openToCoffeeChats">Open to cofee chat</FormLabel>
                                                <FormCheckbox
                                                    name="openToCoffeeChats"
                                                    type="checkbox"
                                                    checked={openToCoffeeChats}
                                                    onChange={handleInputChange}
                                                />
                                            </FormInputContainer>
                                            <ModalFooter>
                                                <FormSubmitButton
                                                    type="submit"
                                                >
                                                    Save Changes
                                                </FormSubmitButton>
                                            </ModalFooter>
                                        </ProfileForm>
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
                        {user.twitterConnected ?
                            <ConnectedAccountButton disabled>
                                <LinkedInIcon />
                                Connected to LinkedIn ✔
                            </ConnectedAccountButton>
                            :
                            <ConnectAccountButton onClick={twitterConnect}>
                                <LinkedInIcon />
                                Connect to LinkedIn
                            </ConnectAccountButton>
                        }
                    </LoginContainer>
                </Content>
            </Container>
        </>
    )
}
