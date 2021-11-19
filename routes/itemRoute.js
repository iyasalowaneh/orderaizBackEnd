const passport = require("passport");

const multer = require("multer");
const {
  fetchItem,
  itemList,
  createItem,
} = require("../controllers/itemController");
const express = require("express");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("itemId", async (req, res, next, itemId) => {
  const item = await fetchItem(itemId, next);
  if (item) {
    req.item = item;

    next();
  } else {
    const err = new Error("item not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", itemList);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createItem
);
module.exports = router;
