const Post = require('../models/post')

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
        res.status(200).json({ feed: posts.map((p) => ({
            id: p._id,
            title: p.title,
            content: p.content,
            authorId: p.authorId,
            tags: p.tags,
            createdAt: p.createdAt
        }))})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const getPost = async (req, res) => {
    try {
        const p = await Post.findById(req.params.id)
        if(!p) {
            return res.status(404).json({ message: "The post doesn't exist" })
        }
        res.status(200).json({ post: {
            id: p._id,
            title: p.title,
            content: p.content,
            authorId: p.authorId,
            tags: p.tags,
            createdAt: p.createdAt
        }})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({operation: "success"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = { createPost, getPosts, getPost, updatePost, deletePost }