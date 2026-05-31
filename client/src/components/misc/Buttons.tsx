import tw from 'twin.macro';
import styled from 'styled-components';

// Base — all shared interactive behaviour
const ButtonBase = tw.button`
  inline-flex items-center justify-center
  font-semibold rounded-full
  transition duration-300
  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
  cursor-pointer
`;

// Primary — filled, main CTA
export const PrimaryButton = tw(ButtonBase)`
  px-8 py-3 tracking-wide
  bg-primary-600 text-gray-100
  hocus:bg-primary-800 hocus:text-gray-300
  focus:shadow-outline
`;

// Secondary — muted fill
export const SecondaryButton = tw(ButtonBase)`
  px-4 py-2
  bg-secondary-600 text-gray-100
  hocus:bg-primary-500
`;

// Ghost — transparent background, used for close / icon actions
export const GhostButton = tw(ButtonBase)`
  bg-transparent text-gray-100
  hocus:bg-secondary-600
`;

// Small variant of Primary
export const SmallButton = tw(PrimaryButton)`py-2 px-4 text-fluid-sm`;

// Icon button — square, ghost, holds an SVG
export const IconButton = tw(GhostButton)`
  h-10 w-10 rounded-full text-fluid-md
`;

// Connection button — large, flex with icon gap
export const ConnectionButton = styled(PrimaryButton)`
  ${tw`flex pl-2 m-2 justify-center items-center`}
  svg {
    ${tw`w-8 h-8 mx-2`}
  }
`;

// Connected variant (green, disconnects on hover)
export const ConnectedButton = styled(ConnectionButton)`
  ${tw`bg-green-800 hocus:bg-red-800`}
`;
