import tw from "twin.macro"
import styled from "styled-components"
import { ReactComponent as LogoBase } from "../assets/logo.svg"
import { GradientBar } from "./GradiantBar"
import { Link } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { myContext } from "../hooks/Context"
import React, { useContext, useState } from "react";
import { IUser } from "../interface"
import { ReactComponent as GitHubIcon } from "../assets/github-icon.svg";

const NavContainer = styled.nav`
    ${tw`flex items-center justify-start bg-secondary-700 p-6 lg:p-10 w-full mb-6 lg:mb-12`}
`

const Logo = tw(LogoBase)`mr-6 h-8 w-8`

const NavLink = tw(Link)`cursor-pointer mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`

const LoginNavLink = tw.div`cursor-pointer mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`

const LogoutNavLink = tw.div`cursor-pointer mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`

const UserContextLinks = tw.div`absolute right-0 flex items-center justify-center pr-2 `

const MainLinks = tw.div`flex items-center`

const ModalContainer = tw.div`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full`

const ModalContent = tw.div`relative w-auto my-6 mx-auto max-w-sm rounded shadow-lg bg-secondary-800 p-2`

const CloseButton = tw.button`flex items-center justify-center bg-transparent font-semibold hocus:bg-secondary-600 h-10 w-10 text-2xl rounded-full`

const BgOpacity = tw.div`opacity-25 fixed inset-0 z-40 bg-black`

const LoginContainer = tw.div`px-10 py-5 flex-col flex`

const LoginButton = styled.a`
  ${tw`cursor-pointer py-2 pl-2 pr-8 rounded-full bg-primary-600 text-gray-100 hocus:bg-primary-800 transition duration-300 m-2 text-sm`}
  svg {
    ${tw`inline-block w-8 h-8 mx-2`}
  }
`;

export default function Navbar() {

    const user = useContext(myContext) as IUser

    const [showModal, setShowModal] = useState(false)

    const login = () => {
        window.open("http://localhost:4000/auth/github", "_self")
    }

    const logout = () => {
        axios.get("http://localhost:4000/auth/logout", {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if (res.data === "done") {
                window.location.href = "/"
            }
        })
    }

    return (
        <>
            {showModal ? (
                <>
                    <ModalContainer>
                        <ModalContent>
                            <CloseButton onClick={() => setShowModal(false)}>
                                x
                            </CloseButton>
                            <LoginContainer>
                                <LoginButton onClick={login}>
                                    <GitHubIcon />
                                    Sign in with GitHub

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
                    <NavLink to="/">Profiles</NavLink>
                    <NavLink to="/featured">Featured</NavLink>
                </MainLinks>
                <UserContextLinks>
                    {user ? (
                        <>
                            <NavLink to="/profile">My Profile</NavLink>
                            <LogoutNavLink onClick={logout}>Logout</LogoutNavLink>
                        </>
                    ) : (
                        <LoginNavLink onClick={() => setShowModal(true)}>Log In</LoginNavLink>
                    )}
                </UserContextLinks>
            </NavContainer>
        </>
    )
}