import tw from 'twin.macro';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom'
import { ReactComponent as LogoBase } from '../assets/logo.svg';
import { GradientBar } from './GradiantBar';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useUserContext } from '../hooks/UserContext';
import React, { useState } from 'react';
import { ConnectionButton } from './misc/Buttons';
import { ReactComponent as DiscordIcon } from '../assets/discord-icon.svg';
import apiClient from '../api/apiClient';

const NavContainer = styled.nav`
  ${tw`flex items-center justify-between bg-secondary-700 py-6 px-6 lg:px-10 lg:py-8 w-full mb-6 lg:mb-12`}
`;

const Logo = tw(
  LogoBase
)`h-10 w-10 hover:text-primary-500 transition duration-300 text-gray-300`;

const NavLink = tw(
  Link
)`cursor-pointer mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`;

const LoginNavLink = tw.div`cursor-pointer mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`;

const LogoutNavLink = tw.div`cursor-pointer mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`;

const UserContextLinks = tw.div`flex items-center`;

const MainLinks = tw.div`flex items-center`;

const ModalContainer = tw.div`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full`;

const ModalContent = tw.div`relative w-auto my-6 mx-auto max-w-sm rounded shadow-lg bg-secondary-800 p-2`;

const CloseButtonContainer = tw.div`flex flex-col items-end`;

const CloseButton = tw.button`flex items-center justify-center bg-transparent font-semibold hocus:bg-secondary-600 h-10 w-10 text-2xl rounded-full text-gray-100`;

const BgOpacity = tw.div`opacity-25 fixed inset-0 z-40 bg-black`;

const LoginContainer = tw.div`px-10 py-5 flex-col flex`;

const LoginButton = tw(ConnectionButton)``;

export default function Navbar() {
  const { currentUser, setCurrentUser } = useUserContext();

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate()

  const discordLogin = () => {
    window.open(
      `${process.env.REACT_APP_API_ORIGIN}/api/auth/discord`,
      '_self'
    );
  };

  const logout = () => {
    apiClient
      .delete('/api/auth/logout', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        if (res.data.message === 'Logout succesful') {
          window.localStorage.removeItem('id');
          
          // reset user state and navigate to '/'
          setCurrentUser(null);
          navigate('/');
        }
      });
  };

  return (
    <>
      {showModal ? (
        <>
          <ModalContainer>
            <ModalContent>
              <CloseButtonContainer>
                <CloseButton onClick={() => setShowModal(false)}>x</CloseButton>
              </CloseButtonContainer>
              <LoginContainer>
                <LoginButton onClick={discordLogin}>
                  <DiscordIcon />
                  Sign in with Discord
                </LoginButton>
              </LoginContainer>
            </ModalContent>
          </ModalContainer>
          <BgOpacity />
        </>
      ) : null}
      <GradientBar />
      <NavContainer>
        <MainLinks>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <NavLink to="/profiles">Profiles</NavLink>
          <NavLink to="/featured">Featured</NavLink>
        </MainLinks>
        <UserContextLinks>
          {currentUser ? (
            <>
              <NavLink to="/profile">My Profile</NavLink>
              <LogoutNavLink onClick={logout}>Logout</LogoutNavLink>
            </>
          ) : (
            <LoginNavLink onClick={() => setShowModal(true)}>
              Log In
            </LoginNavLink>
          )}
        </UserContextLinks>
      </NavContainer>
    </>
  );
}
