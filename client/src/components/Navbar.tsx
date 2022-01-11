import tw from "twin.macro"
import styled from "styled-components"
import { ReactComponent as LogoBase } from "../assets/logo.svg"
import { GradientBar } from "./GradiantBar"
import { Link } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { myContext } from "../hooks/Context"
import React, { useContext } from "react";
import { IUser } from "../interface"

const NavContainer = styled.nav`
    ${tw`flex items-center justify-start bg-secondary-700 p-6 lg:p-10 w-full mb-6 lg:mb-12`}
`

const Logo = tw(LogoBase)`mr-6 h-8 w-8`

const NavLink = tw(Link)`cursor-pointer mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`

const LoginNavLink = tw(Link)`cursor-pointer mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`

const LogoutNavLink = tw.div`cursor-pointer mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`

const UserContextLinks = tw.div`absolute right-0 flex items-center justify-center pr-2 `

const MainLinks = tw.div`flex items-center`


export default function Navbar() {

    const user = useContext(myContext) as IUser

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
                        <LoginNavLink to="/login">Log In</LoginNavLink>
                    )}
                </UserContextLinks>
            </NavContainer>
        </>
    )
}