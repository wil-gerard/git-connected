import tw from 'twin.macro';

// Fluid type scale — perfect-fourth ratio (clamp-based, responsive without breakpoints)

export const PageTitle = tw.h1`
  text-fluid-xl font-extrabold leading-heading
  text-gray-100 md:text-left text-center
`;

export const SectionHeading = tw.h2`
  text-fluid-lg font-bold leading-heading
  text-gray-100 md:text-left text-center
`;

export const Subheading = tw.h3`
  text-fluid-md font-bold leading-heading
  text-primary-500
`;

export const Description = tw.p`
  text-fluid-base font-normal leading-reading
  text-gray-100 mt-4
`;

export const BodyText = tw.p`
  text-fluid-base font-medium leading-reading
  text-gray-100
`;

export const Subtitle = tw.p`
  text-fluid-sm font-semibold leading-normal
  text-secondary-100
`;

export const Caption = tw.p`
  text-fluid-xs font-normal leading-normal
  text-secondary-100
`;

export const Mono = tw.span`
  text-fluid-sm font-mono
  text-gray-100
`;
