import React from 'react'
import tw from "twin.macro"
import styled from "styled-components"
import { ReactComponent as LogoBase } from "../assets/logo.svg"
import { GradientBar } from "./GradiantBar"
import { Link } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'

const NavContainer = styled.nav`
    ${tw`flex bg-secondary-700 p-6 lg:p-10 w-full mb-6 lg:mb-12`}
`

const Logo = tw(LogoBase)`mr-6 h-8 w-8`

const NavLink = tw(Link)`cursor-pointer flex items-center mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`

const LogoutNavLink = styled.div`${tw`cursor-pointer flex items-center mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`}`

export default function Navbar() {

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
                <NavLink to="/">
                    <Logo />
                </NavLink>
                <NavLink to="/profile">My Profile</NavLink>
                <NavLink to="/">Profiles</NavLink>
                <NavLink to="/featured">Featured</NavLink>
                <NavLink to="/login">Log In</NavLink>
                <LogoutNavLink onClick={logout}>Logout</LogoutNavLink>
            </NavContainer>
        </>
    )
}