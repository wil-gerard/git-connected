import tw from 'twin.macro';
import styled from 'styled-components';
import LogoBase from '../assets/logo.svg?react';
import { GradientBar } from './GradiantBar';
import { useUserContext } from '../hooks/UserContext';
import React, { useState } from 'react';
import { ConnectionButton, IconButton } from './misc/Buttons';
import { AppNavLink, AppNavButton } from './misc/NavLink';
import DiscordIcon from '../assets/discord-icon.svg?react';

const NavContainer = styled.nav`
  ${tw`flex items-center justify-between bg-secondary-700 py-6 px-6 lg:px-10 lg:py-8 w-full mb-6 lg:mb-12`}
`;

const Logo = tw(
  LogoBase
)`h-10 w-10 hover:text-primary-500 transition duration-300 text-gray-300`;

const UserContextLinks = tw.div`flex items-center`;
const MainLinks = tw.div`flex items-center`;

const ModalContainer = tw.div`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full`;
const ModalContent = tw.div`relative w-auto my-6 mx-auto max-w-sm rounded shadow-lg bg-secondary-800 p-2`;
const CloseButtonContainer = tw.div`flex flex-col items-end`;
const BgOpacity = tw.div`opacity-25 fixed inset-0 z-40 bg-black`;
const LoginContainer = tw.div`px-10 py-5 flex-col flex`;

export default function Navbar() {
  const { currentUser, logout } = useUserContext();
  const [showModal, setShowModal] = useState(false);

  const discordLogin = () => {
    window.open(`${import.meta.env.VITE_API_ORIGIN}/api/auth/discord`, '_self');
  };

  return (
    <>
      {showModal && (
        <>
          <ModalContainer>
            <ModalContent>
              <CloseButtonContainer>
                <IconButton onClick={() => setShowModal(false)}>✕</IconButton>
              </CloseButtonContainer>
              <LoginContainer>
                <ConnectionButton onClick={discordLogin}>
                  <DiscordIcon />
                  Sign in with Discord
                </ConnectionButton>
              </LoginContainer>
            </ModalContent>
          </ModalContainer>
          <BgOpacity />
        </>
      )}
      <GradientBar />
      <NavContainer>
        <MainLinks>
          <AppNavLink to="/">
            <Logo />
          </AppNavLink>
          <AppNavLink to="/profiles">Profiles</AppNavLink>
          <AppNavLink to="/featured">Featured</AppNavLink>
        </MainLinks>
        <UserContextLinks>
          {currentUser ? (
            <>
              <AppNavLink to="/profile">My Profile</AppNavLink>
              <AppNavButton onClick={logout}>Sign Out</AppNavButton>
            </>
          ) : (
            <AppNavButton onClick={() => setShowModal(true)}>Sign In</AppNavButton>
          )}
        </UserContextLinks>
      </NavContainer>
    </>
  );
}
