import tw from 'twin.macro';
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg';
import { ReactComponent as GitHubIcon } from '../assets/github-icon.svg';
import { useUserContext } from '../hooks/UserContext';
import {
  PrimaryButton,
  SmallButton,
  ConnectionButton,
} from '../components/misc/Buttons';
import React, { useState } from 'react';
import { UserCard } from '../components/UserCard';
import apiClient from '../api/apiClient';

const Container = tw.div`flex flex-col px-6 text-gray-100`;

const Content = tw.div`mx-auto justify-center `;

const EditProfileButton = tw(SmallButton)`mb-4`;

const ModalContainer = tw.div`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full`;

const ModalContentContainer = tw.div`relative w-auto my-6 mx-auto max-w-2xl`;

const ModalContent = tw.div`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary-800 outline-none focus:outline-none`;

const ModalHeader = tw.div`flex items-start justify-between p-5 border-b border-solid`;

const ProfileForm = tw.form``;

const FormInputContainer = tw.div`relative p-4 flex-auto w-full`;

const FormTextInput = tw.input`border-0 px-3 py-3 placeholder-gray-600 text-gray-100 bg-secondary-700 rounded text-sm shadow focus:outline-none focus:ring hocus:w-full ease-linear transition-all duration-300`;

const FormTextArea = tw.textarea`w-full border-0 px-3 py-3 placeholder-gray-600 text-gray-100 bg-secondary-700 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-300`;

// const FormCheckbox = tw.input`h-4 w-4 focus:ring border-gray-300 border-0 px-3 py-3 text-gray-100 bg-secondary-700 rounded text-sm shadow focus:outline-none ease-linear transition-all duration-150`;

const FormLabel = tw.label`block uppercase text-gray-300 text-xs font-bold mb-2`;

const ModalHeaderText = tw.h3`text-xl font-semibold`;

const ModalCloseButton = tw.button`flex items-center justify-center bg-transparent font-semibold hocus:bg-secondary-600 h-10 w-10 text-2xl rounded-full`;

const ModalFooter = tw.div`flex items-center justify-center p-6 border-t border-solid rounded-b`;

// const FormSubmitButton = tw.button`bg-green-600 text-white hover:bg-green-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`;

const FormSubmitButton = tw(PrimaryButton)`bg-green-600 hocus:bg-green-800`;

const BgOpacity = tw.div`opacity-25 fixed inset-0 z-40 bg-black`;

const ConnectAccountButton = tw(ConnectionButton)`w-72`;

const ConnectedAccountButton = tw(
  ConnectAccountButton
)`bg-green-800 hocus:bg-red-800`;

const ConnectedAccountText = tw.p` group-hocus:hidden `;
const DisconnectAccountText = tw.p`hidden group-hocus:inline`;

const LoginContainer = tw.div`px-10 py-2 flex-col flex`;

export default function Profile() {
  const gitHubConnect = () => {
    window.open(`${process.env.REACT_APP_API_ORIGIN}/api/auth/github`, '_self');
  };

  const twitterConnect = () => {
    window.open(
      `${process.env.REACT_APP_API_ORIGIN}/api/auth/twitter`,
      '_self'
    );
  };

  const [showModal, setShowModal] = useState(false);

  const { currentUser, setCurrentUser } = useUserContext();

  const [formData, setFormData] = useState({
    customBio: currentUser?.customBio,
    customLocation: currentUser?.customLocation,
    customName: currentUser?.customName,
    lookingForCoffeeChats: currentUser?.lookingForCoffeeChats,
    openToCoffeeChats: currentUser?.openToCoffeeChats,
  });

  const {
    customBio,
    customLocation,
    customName,
    // lookingForCoffeeChats,
    // openToCoffeeChats,
  } = formData;

  const handleInputChange = (e: any) =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });

  const removeConnection = async (platformName: string) => {
    try {
      apiClient({
        method: 'put',
        url: '/api/user/removeConnection',
        data: { platformName },
        withCredentials: true,
        responseType: 'json',
      }).then((res) => {
        if (res) {
          setCurrentUser(res.data);
        }
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleProfileFormSubmit = async () => {
    setShowModal(false);

    try {
      apiClient({
        method: 'put',
        url: '/api/user/update',
        data: formData,
        withCredentials: true,
        responseType: 'json',
      }).then((res: any) => {
        if (res) {
          setCurrentUser(res.data);
        }
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  if (!currentUser) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Container>
        <Content>
          <EditProfileButton type="button" onClick={() => setShowModal(true)}>
            Edit profile
          </EditProfileButton>
          {showModal ? (
            <>
              <ModalContainer>
                <ModalContentContainer>
                  <ModalContent>
                    <ModalHeader>
                      <ModalHeaderText>Edit profile</ModalHeaderText>

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
                          value={customName ?? ''}
                          onChange={handleInputChange}
                        />
                      </FormInputContainer>
                      <FormInputContainer>
                        <FormLabel>Location</FormLabel>
                        <FormTextInput
                          type="text"
                          name="customLocation"
                          value={customLocation ?? ''}
                          onChange={handleInputChange}
                        />
                      </FormInputContainer>
                      <FormInputContainer>
                        <FormLabel>Bio</FormLabel>
                        <FormTextArea
                          rows={2}
                          name="customBio"
                          value={customBio ?? ''}
                          onChange={handleInputChange}
                        />
                      </FormInputContainer>
                      {/* <FormInputContainer>
                        <FormLabel htmlFor="lookingForCoffeeChats">
                          Looking for coffee chat
                        </FormLabel>
                        <FormCheckbox
                          name="lookingForCoffeeChats"
                          type="checkbox"
                          checked={lookingForCoffeeChats}
                          onChange={handleInputChange}
                        />
                        <FormLabel htmlFor="openToCoffeeChats">
                          Open to cofee chat
                        </FormLabel>
                        <FormCheckbox
                          name="openToCoffeeChats"
                          type="checkbox"
                          checked={openToCoffeeChats}
                          onChange={handleInputChange}
                        />
                      </FormInputContainer> */}
                      <ModalFooter>
                        <FormSubmitButton type="submit">
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
          <UserCard {...currentUser} />
          <LoginContainer>
            {currentUser.gitHubConnected ? (
              <ConnectedAccountButton
                className="group"
                onClick={() => {
                  removeConnection('gitHub');
                }}
              >
                <GitHubIcon />
                <ConnectedAccountText>Connected to GitHub</ConnectedAccountText>
                <DisconnectAccountText>Disconnect GitHub</DisconnectAccountText>
              </ConnectedAccountButton>
            ) : (
              <ConnectAccountButton onClick={gitHubConnect}>
                <GitHubIcon />
                Connect to GitHub
              </ConnectAccountButton>
            )}
            {currentUser.twitterConnected ? (
              <ConnectedAccountButton
                className="group"
                onClick={() => {
                  removeConnection('twitter');
                }}
              >
                <TwitterIcon />
                <ConnectedAccountText>
                  Connected to Twitter
                </ConnectedAccountText>
                <DisconnectAccountText>
                  Disconnect Twitter
                </DisconnectAccountText>
              </ConnectedAccountButton>
            ) : (
              <ConnectAccountButton onClick={twitterConnect}>
                <TwitterIcon />
                Connect to Twitter
              </ConnectAccountButton>
            )}
            {/* {user.lookingForCoffeeChats ? (
              <ConnectedAccountButton disabled>
                <LinkedInIcon />
                Connected to LinkedIn ✔
              </ConnectedAccountButton>
            ) : (
              <ConnectAccountButton onClick={twitterConnect}>
                <LinkedInIcon />
                Connect to LinkedIn
              </ConnectAccountButton>
            )} */}
          </LoginContainer>
        </Content>
      </Container>
    </>
  );
}
