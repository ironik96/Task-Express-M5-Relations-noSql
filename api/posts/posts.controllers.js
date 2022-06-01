const Post = require("../../models/Post");
const Tag = require("../../models/Tag");

exports.addTag = async (req, res, next) => {
  const { postId, tagId } = req.params;
  try {
    const tagExists = tagId !== ":tagId";
    let tag;

    tagExists
      ? (tag = await Tag.findByIdAndUpdate(tagId, { $push: { posts: postId } }))
      : (tag = await Tag.create({ ...req.body, posts: [postId] }));

    await Post.findByIdAndUpdate(postId, { $push: { tags: tag._id } });
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res, next) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author").populate("tags");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
