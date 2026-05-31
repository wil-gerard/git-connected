import tw from 'twin.macro';
import { Link } from 'react-router-dom';

// Styled router link — for internal navigation
export const AppNavLink = tw(
  Link
)`cursor-pointer mr-6 text-fluid-base font-semibold text-gray-300 hover:text-primary-500 transition duration-300 focus-visible:outline-none focus-visible:text-primary-500`;

// Same style on a button/div — for logout, sign-in triggers
export const AppNavButton = tw.div`cursor-pointer mr-6 text-fluid-base font-semibold text-gray-300 hover:text-primary-500 transition duration-300`;
