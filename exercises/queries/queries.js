const Post = require("./post");

const postByTitle = title => {
  return Post.findOne({ title }).exec();
};

const postsForAuthor = authorId => {
  return Post.find({ author: authorId }).exec();
};

const fullPostById = id => {
  return Post.findById(id).populate("author");
};

const allPostsSlim = fieldsToSelect => {
  return Post.find({})
    .select(fieldsToSelect)
    .exec();
};

const postByContentLength = (maxContentLength, minContentLength) => {
  return Post.find({
    contentLength: {
      $lt: maxContentLength,
      $gt: minContentLength
    }
  }).exec();
};

const addSimilarPosts = (postId, similarPosts) => {
  return Post.findByIdAndUpdate(id, {
    $push: { similarPosts: { $each: similarPosts } }
  });
};

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts
};
