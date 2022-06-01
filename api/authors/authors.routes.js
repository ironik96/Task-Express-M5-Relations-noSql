const express = require("express");
const { fetchAuthor } = require("./authors.middlewares");
const {
  authorCreate,
  authorDelete,
  authorsUpdate,
  authorsGet,
  postsCreate
} = require("./authors.controllers");
const router = express.Router();

router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchAuthor(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error("author Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", authorsGet);
router.post("/", authorCreate);
router.post("/:authorId", postsCreate);
router.delete("/:authorId", authorDelete);
router.put("/:authorId", authorsUpdate);

module.exports = router;
