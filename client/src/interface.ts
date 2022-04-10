export interface IUser {
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
    avatar: string;
    discriminator: string;
    banner: string;
    banner_color: string;
  };
  gitHub: {
    id: string;
    json: {
      login: string;
      avatar_url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      name: string;
      company: string;
      hireable: string;
      blog: string;
      location: string;
      bio: string;
      twitter_username: string;
      followers: number;
      following: number;
    };
  };
  twitter: {
    id: string;
    username: string;
  };
}
