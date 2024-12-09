const Post = require('../models/post');

exports.createPost = (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
    });
    // console.log(req);
    // return res.status(200).json({});
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'post created successfully!',
            post: {
                id: createdPost._id,
                title: createdPost.title,
                content: createdPost.content,
                imagePath: createdPost.imagePath
            } 
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Creating a post failed!'
        })
    })
}

exports.getPosts = (req, res) => {
    // console.log(req.query);
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize); 
    }
    postQuery
        .then(docs => {
            fetchedPosts = docs;
            return Post.countDocuments();            
        })
        .then(count => {
            res.status(200).json({
                message: 'posts fetched succefully',
                posts: fetchedPosts,
                maxPosts: count
            })
        });
}

exports.getOnePost = (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: 'Post Not Found!'})
        }
    })
}

exports.updatePost = (req, res) => {
    let imagePath = req.body.imagePath;
    if(req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
        // console.log(result);
        if (result.n > 0) {
            res.status(200).json({message: 'Post updated!'})
        } else {
            res.status(401).json({message: 'Not Authorized!'})
        }
    })
}

exports.deletePost = (req, res) => {
    Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
        console.log(result)
        if (result.n > 0) {
            res.status(200).json({message: 'Post deleted!'})
        } else {
            res.status(401).json({message: 'Not Authorized!'})
        }
    })
}