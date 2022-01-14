import mongoose from 'mongoose'

const user = new mongoose.Schema({
    githubInfo: {
        githubId: {
            required: false,
            type: String
        },
        displayName: {
            required: false,
            type: String
        },
        photos: {
            required: false,
            type: Array
        },
        json: {
            require: false,
            type: Object
        }
    },
    discordInfo: {
        discordId: {
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
        }, discriminator: {
            required: false,
            type: String
        }, accent_color: {
            required: false,
            type: Number
        }
    }
})

export default mongoose.model("User", user)