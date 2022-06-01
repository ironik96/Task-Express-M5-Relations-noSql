const express = require("express");
const router = express.Router();
const { postsGet, postsUpdate, postsDelete, addTag } = require("./posts.controllers");
const { fetchPost } = require("./posts.middlewares");

router.param("postId", async (req, res, next, postId) => {
  const post = await fetchPost(postId, next);
  if (post) {
    req.post = post;
    next();
  } else {
    const err = new Error("Post Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", postsGet);
router.delete("/:postId", postsDelete);
router.put("/:postId", postsUpdate);
router.post("/:postId/tags/:tagId", addTag)

module.exports = router;
