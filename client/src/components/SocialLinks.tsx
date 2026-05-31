import React from 'react';
import LinkedInIcon from '../assets/linkedin-icon.svg?react';
import TwitterIcon from '../assets/twitter-icon.svg?react';
import LinkIcon from '../assets/link-icon.svg?react';

interface SocialAccount {
  provider: string;
  url: string;
}

const ICON_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
};

interface Props {
  socialAccounts?: SocialAccount[];
  linkedInUrl?: string;
  className?: string;
  linkClassName?: string;
}

export const SocialLinks: React.FC<Props> = ({
  socialAccounts,
  linkedInUrl,
  className,
  linkClassName,
}) => {
  const accounts: SocialAccount[] = socialAccounts?.length
    ? socialAccounts
    : linkedInUrl
    ? [{ provider: 'linkedin', url: linkedInUrl }]
    : [];

  if (!accounts.length) return null;

  return (
    <span className={className}>
      {accounts.map(({ provider, url }) => {
        const Icon = ICON_MAP[provider] ?? LinkIcon;
        return (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={provider}
            className={linkClassName}
          >
            <Icon />
          </a>
        );
      })}
    </span>
  );
};
