import tw from 'twin.macro';
import styled from 'styled-components';
export const PrimaryButton = tw.button`px-8 py-3 font-semibold rounded-full bg-primary-600 text-gray-100 hocus:bg-primary-800 hocus:text-gray-300 focus:shadow-outline focus:outline-none transition duration-300 tracking-wide`;
export const SmallButton = tw(PrimaryButton)`py-2 px-3 text-sm`;
export const ConnectionButton = styled(PrimaryButton)`
  ${tw`flex pl-2 m-2 justify-center items-center`}
  svg {
    ${tw`w-8 h-8 mx-2`}
  }
`;
