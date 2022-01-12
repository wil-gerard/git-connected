import mongoose from 'mongoose'

const user = new mongoose.Schema({
    githubId: {
        required: true,
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
        require: true,
        type: Object
    }
})

export default mongoose.model("User", user)