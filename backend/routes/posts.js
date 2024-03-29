const express = require('express');

const Post = require('../models/post');

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully!',
      postId: result._id
    });
  });
});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  console.log(pageSize, currentPage)
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  postQuery.then(posts => {
    fetchedPosts = posts;
    return Post.countDocuments();
  }).then(count => {
    res.status(200).json({
      message: 'Posts fetched succesfully!',
      posts: fetchedPosts,
      maxPosts: count
    })
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  })
  Post.updateOne({_id: req.params.id}, post).then(() => {
    res.status(203).json({
      message: 'Update successfull!'
    });
  })
})

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'Post not found!'})
    }
  })
})

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(202).json({ message: "Postdeleted!"})
  });
})


module.exports = router;
