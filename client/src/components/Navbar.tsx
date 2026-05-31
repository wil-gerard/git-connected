import tw from 'twin.macro';
import styled from 'styled-components';
import LogoBase from '../assets/logo.svg?react';
import { GradientBar } from './GradiantBar';
import { useUserContext } from '../hooks/UserContext';
import React, { useState, useRef, useEffect } from 'react';
import { ConnectionButton, IconButton } from './misc/Buttons';
import { AppNavLink, AppNavButton } from './misc/NavLink';
import DiscordIcon from '../assets/discord-icon.svg?react';

const NavContainer = styled.nav`
  ${tw`flex items-center justify-between bg-secondary-700 py-4 px-6 lg:px-10 lg:py-6 w-full mb-6 lg:mb-12 relative`}
`;

const Logo = tw(
  LogoBase
)`h-10 w-10 hover:text-primary-500 transition duration-300 text-gray-300`;

const DesktopLinks = tw.div`hidden md:flex items-center`;
const DesktopRight = tw.div`hidden md:flex items-center`;

// Hamburger button — mobile only
const HamburgerButton = tw(IconButton)`md:hidden`;

// Mobile menu dropdown
const MobileMenu = styled.div<{ open: boolean }>`
  ${tw`md:hidden absolute left-0 right-0 z-50 bg-secondary-700 shadow-lg flex-col px-6 py-4 gap-4`}
  top: 100%;
  ${({ open }) => (open ? tw`flex` : tw`hidden`)}
`;

const ModalContainer = tw.div`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full`;
const ModalContent = tw.div`relative w-auto my-6 mx-auto max-w-sm rounded shadow-lg bg-secondary-800 p-2`;
const CloseButtonContainer = tw.div`flex flex-col items-end`;
const BgOpacity = tw.div`opacity-25 fixed inset-0 z-40 bg-black`;
const LoginContainer = tw.div`px-10 py-5 flex-col flex`;

export default function Navbar() {
  const { currentUser, logout } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const discordLogin = () => {
    window.open(`${import.meta.env.VITE_API_ORIGIN}/api/auth/discord`, '_self');
  };

  const closeMenu = () => setMenuOpen(false);

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
      <NavContainer ref={menuRef}>
        {/* Logo — always visible */}
        <AppNavLink to="/" onClick={closeMenu}>
          <Logo />
        </AppNavLink>

        {/* Desktop nav */}
        <DesktopLinks>
          <AppNavLink to="/profiles">Profiles</AppNavLink>
          <AppNavLink to="/featured">Featured</AppNavLink>
        </DesktopLinks>
        <DesktopRight>
          {currentUser ? (
            <>
              <AppNavLink to="/profile">My Profile</AppNavLink>
              <AppNavButton onClick={logout}>Sign Out</AppNavButton>
            </>
          ) : (
            <AppNavButton onClick={() => setShowModal(true)}>Sign In</AppNavButton>
          )}
        </DesktopRight>

        {/* Hamburger — mobile only */}
        <HamburgerButton
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </HamburgerButton>

        {/* Mobile dropdown */}
        <MobileMenu open={menuOpen}>
          <AppNavLink to="/profiles" onClick={closeMenu}>Profiles</AppNavLink>
          <AppNavLink to="/featured" onClick={closeMenu}>Featured</AppNavLink>
          {currentUser ? (
            <>
              <AppNavLink to="/profile" onClick={closeMenu}>My Profile</AppNavLink>
              <AppNavButton onClick={() => { logout(); closeMenu(); }}>Sign Out</AppNavButton>
            </>
          ) : (
            <AppNavButton onClick={() => { setShowModal(true); closeMenu(); }}>Sign In</AppNavButton>
          )}
        </MobileMenu>
      </NavContainer>
    </>
  );
}
