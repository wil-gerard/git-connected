const DiscordStrategy = require('passport-discord').Strategy;
import User from '../models/User';
import { IDatabaseUser, IReqAuth } from '../interface';

const discordScopes = [
  'identify',
  'guilds',
  'guilds.join',
  'guilds.members.read',
];
const discordStrategySettings: any = {
  clientID: `${process.env.DISCORD_CLIENT_ID}`,
  clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`,
  callbackURL: '/api/auth/discord/callback',
  scope: discordScopes,
  passReqToCallback: true,
};
export const discordStrategy: any = new DiscordStrategy(
  discordStrategySettings,
  handleDiscordLogin
);

async function handleDiscordLogin(
  req: IReqAuth,
  discordAccessToken: String,
  refreshToken: String,
  discordProfile: any,
  callback: Function
) {
  if (
    !discordProfile.guilds.some(
      (guild: any) => guild.id === '735923219315425401'
    )
  ) {
    console.log('not a member of the 100devs discord server');
    return;
  }
  User.findOne(
    { 'discord.id': discordProfile.id },
    async (err: Error, userInDatabase: IDatabaseUser) => {
      if (err) {
        return callback(err, null);
      }
      if (userInDatabase) {
        return callback(null, userInDatabase);
      }
      const newUser = getNewUser(discordProfile, discordAccessToken);
      await newUser.save();
      return callback(null, newUser);
    }
  );
}

function getNewUser(discordProfile: any, discordAccessToken: String) {
  const newUser = new User();
  newUser.gitHubConnected = false;
  newUser.twitterConnected = false;
  newUser.customBio = '';
  newUser.customLocation = '';
  newUser.customName = '';
  newUser.lookingForCoffeeChats = false;
  newUser.openToCoffeeChats = false;
  newUser.discord.id = discordProfile.id;
  newUser.discordToken = discordAccessToken;
  newUser.discord.username = discordProfile.username;
  newUser.discord.avatar = discordProfile.avatar;
  newUser.discord.discriminator = discordProfile.discriminator;
  newUser.discord.banner = discordProfile.banner;
  newUser.discord.banner_color = discordProfile.banner_color;
  return newUser;
}
