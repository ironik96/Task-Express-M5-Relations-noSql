const Tag = require("../../models/Tag");

exports.tagsGet = async (req, res) => {
  try {
    const tags = await Tag.find().populate("posts");
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.tagsDelete = async (req, res, next) => {
  try {
    await Tag.findByIdAndRemove({ _id: req.tag.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
