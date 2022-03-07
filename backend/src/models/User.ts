import mongoose from 'mongoose';

const User = new mongoose.Schema({
  alreadyFollowingTheseIds: {},
  gitHubConnected: {
    required: true,
    type: Boolean,
  },
  twitterConnected: {
    required: true,
    type: Boolean,
  },
  customBio: {
    type: String,
    maxlength: [40, 'Bio must be less than 40 characters.'],
    trim: true,
  },
  customLocation: {
    type: String,
    maxlength: [20, 'Location must be less than 20 characters.'],
    trim: true,
  },
  customName: {
    type: String,
    maxlength: [20, 'Name must be less than 20 characters.'],
    trim: true,
  },
  discordToken: {
    required: true,
    type: String,
  },
  gitHubToken: {
    type: String,
  },
  twitterToken: {
    type: String,
  },
  twitterTokenSecret: {
    type: String,
  },
  lookingForCoffeeChats: {
    required: true,
    type: Boolean,
  },
  openToCoffeeChats: {
    required: true,
    type: Boolean,
  },
  discord: {
    id: {
      type: String,
    },
    username: {
      type: String,
    },
    avatar: {
      type: String,
    },
    discriminator: {
      required: false,
      type: String,
    },
    banner: {
      type: String,
    },
    banner_color: {
      type: String,
    },
  },
  gitHub: {
    id: {
      type: String,
    },
    json: {
      type: Object,
    },
  },
  twitter: {
    id: {
      type: String,
    },
    username: {
      type: String,
    },
  },
});

export default mongoose.model('User', User);
