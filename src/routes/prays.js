const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, hasRole } = require("../shared/auth");
const {
  postNewsSchema,
  patchNewsSchema,
  getNewsSchema,
} = require("../controllers/prays/schemas/index");
const newsController = require("../controllers/prays");
const upload = require("../uploads");

const router = express.Router();

const sPostNews = [
  upload.single("image"),
  isLoggedIn,
  genValidator(postNewsSchema),
];
// const sGetNews = [isLoggedIn];
// const mShowNews = [isLoggedIn];

const sGetNews = [
  // isLoggedIn,
  //
  genValidator(getNewsSchema),
];

const sPatchNews = [
  upload.single("image"),
  isLoggedIn,
  //   genValidator(patchNewsSchema),
];

const mDeleteNews = [isLoggedIn];

router.post("/prays", sPostNews, newsController.postNews);

router.get("/prays", newsController.getNews);

router.get("/prays/:id", sGetNews, newsController.showNews);

router.patch("/prays/:id", sPatchNews, newsController.patchNews);

router.delete("/prays/:id", mDeleteNews, newsController.deleteNews);

router.get("/", newsController.getRun);
router.get("/dev", newsController.getMain);

module.exports = router;
