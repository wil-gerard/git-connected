import tw from 'twin.macro';

type LinkProps = {
  icon: JSX.Element;
  href: any;
};
const StyledLink = tw.a`flex rounded shadow cursor-pointer bg-secondary-600 transition duration-300 hover:bg-primary-500 w-6 h-6 ml-1 p-0.5`;

export default function TableLink({ icon, href }: LinkProps) {
  return (
    <StyledLink href={href} target="blank" rel="noopener noreferrer">
      {icon}
    </StyledLink>
  );
}
