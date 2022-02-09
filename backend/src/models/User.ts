import mongoose from 'mongoose'

const User = new mongoose.Schema({
    gitHubConnected: {
        required: true,
        type: Boolean
    },
    twitterConnected: {
        required: true,
        type: Boolean
    },
    customBio: {
        required: false,
        type: String
    },
    customLocation: {
        required: false,
        type: String
    },
    customName: {
        required: false,
        type: String
    },
    tags: {
        lookingForCoffeeChats:{
            required: true,
            type: Boolean
        },
        openToCoffeeChats:{
            required: true,
            type: Boolean
        }
    },
    discord: {
        id: {
            required: false,
            type: String
        },
        token: {
            required: false,
            type: String
        },
        username: {
            required: false,
            type: String
        },
        avatar: {
            required: false,
            type: String
        },
        discriminator: {
            required: false,
            type: String
        },
        banner: {
            required: false,
            type: String
        },
        banner_color: {
            required: false,
            type: String
        }
    },
    github: {
        id: {
            required: false,
            type: String
        },
        token: {
            required: false,
            type: String
        },
        json: {
            require: false,
            type: Object
        }
    },
    twitter: {
        id: {
            required: false,
            type: String
        },
        token: {
            required: false,
            type: String
        },
        tokenSecret: {
            required: false,
            type: String
        },
        username: {
            required: false,
            type: String
        }
    }
})

export default mongoose.model("User", User)