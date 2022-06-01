const express = require("express");
const router = express.Router();
const { tagsGet, tagsDelete } = require("./tags.controllers");
const { fetchTag } = require("./tag.middlewares");

router.param("tagId", async (req, res, next, tagId) => {
  const tag = await fetchTag(tagId, next);
  if (tag) {
    req.tag = tag;
    next();
  } else {
    const err = new Error("Tag Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", tagsGet);
router.delete("/:tagId", tagsDelete);

module.exports = router;
