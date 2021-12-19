import mongoose from 'mongoose'

const user = new mongoose.Schema({
    githubId: {
        required: true,
        type: String
    },
    username: {
        required: true,
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