const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
    }
});

module.exports = mongoose.model('Post', PostSchema);
