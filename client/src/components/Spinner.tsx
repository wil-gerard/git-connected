import tw from 'twin.macro';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
0% { -webkit-transform: rotate(0deg); }
100% { -webkit-transform: rotate(360deg);
`

export const Spinner = styled.span`
border-top-color: #1f48ff;
-webkit-animation: ${spin} 1.5s linear infinite;
animation: ${spin} 1.5s linear infinite;
${tw`rounded-full border-8 border-t-8 h-32 w-32`}
`;

export default Spinner