import React from 'react'
import tw from "twin.macro"
import styled from "styled-components"
import { ReactComponent as LogoBase } from "../assets/logo.svg"
import { GradientBar } from "./GradiantBar"
import { Link } from 'react-router-dom'

const NavContainer = styled.div`
    ${tw`flex bg-secondary-700 p-6 lg:p-10 w-full`}
`

const Logo = tw(LogoBase)`mr-6 h-8 w-8`

const NavLink = tw(Link)`cursor-pointer flex items-center mr-6 hover:text-primary-500 transition duration-300 text-base font-semibold text-gray-300`

export default function Navbar() {
    return (
        <>
            <GradientBar />
            <NavContainer>
                <NavLink to="/home">
                    <Logo />
                </NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/home">Connect</NavLink>
                <NavLink to="/login">Logout</NavLink>
            </NavContainer>
        </>
    )
}