import mongoose from 'mongoose'

const user = new mongoose.Schema({
    githubId: {
        required: true,
        type: String
    },
    twitterId: {
        required: false,
        type: String
    },
    linkedinId : {
        required: false,
        type: String
    },
    username: {
        required: true,
        type: String
    }
})

export default mongoose.model("User", user)