import { Request } from 'express';

export interface DatabaseUser {
  _id: string;
  __v: number;
  alreadyFollowingTheseIds: any;
  twitterConnected: boolean;
  gitHubConnected: boolean;
  customBio: string;
  customLocation: string;
  customName: string;
  discordToken: string;
  gitHubToken?: string;
  twitterToken?: string;
  twitterTokenSecret?: string;
  lookingForCoffeeChats: boolean;
  openToCoffeeChats: boolean;
  discord: {
    id: string;
    username: string;
    avatar?: string;
    discriminator: string;
    banner?: string;
    banner_color?: string;
  };
  gitHub: {
    id: string;
    json?: any;
  };
  twitter: {
    id: string;
    username: string;
  };
}

export interface CurrentUser {
  _id: string;
  alreadyFollowingTheseIds: any;
  twitterConnected: boolean;
  gitHubConnected: boolean;
  customBio: string;
  customLocation: string;
  customName: string;
  lookingForCoffeeChats: boolean;
  openToCoffeeChats: boolean;
  discord: {
    id: string;
    username: string;
    avatar?: string;
    discriminator: string;
    banner?: string;
    banner_color?: string;
  };
  gitHub?: {
    id: string;
    json?: {
      login?: string;
      avatar_url?: string;
      html_url?: string;
      followers_url?: string;
      following_url?: string;
      name?: string;
      company?: string;
      hireable?: string;
      blog?: string;
      location?: string;
      bio?: string;
      twitter_username?: string;
      followers?: number;
      following?: number;
    };
  };
  twitter?: {
    id: string;
    username: string;
  };
}

export interface UserUpdateForm {
  customBio: string;
  customLocation: string;
  customName: string;
  lookingForCoffeeChats: boolean;
  openToCoffeeChats: boolean;
}

export interface ReqAuth extends Request {
  user?: DatabaseUser;
}
