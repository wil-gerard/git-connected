import mongoose from 'mongoose'

const User = new mongoose.Schema({
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
        accent_color: {
            required: false,
            type: Number
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