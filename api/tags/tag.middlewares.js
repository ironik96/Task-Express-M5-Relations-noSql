const Tag = require("../../models/Tag");

exports.fetchTag = async (tagId, next) => {
  try {
    const tag = await Tag.findById(tagId);
    return tag;
  } catch (error) {
    next(error);
  }
};
