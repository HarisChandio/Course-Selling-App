const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const jwtPrivateKey = "12345";

// Admin Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  await Admin.create({
    username,
    password,
  });
  res.json({
    msg: "user created successfully",
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({
      username: username,
      password: password,
    });
    if (!admin) {
      res.json("invalid credentials");
    } else {
      const token = jwt.sign(
        {
          username,
        },
        jwtPrivateKey
      );
      res.json({ token: token });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body;
  try {
    const newCourse = await Course.create({
      title,
      description,
      imageLink,
      price,
    });
    res.json({
      msg: "course created",
      newcourseId: newCourse._id,
      course: newCourse,
    });
  } catch (e) {
    res.json(e);
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({ courses: courses });
  } catch (e) {
    res.json("internal server issue");
  }
});

router.delete("/courses/:courseId", adminMiddleware, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    await Course.deleteOne({ _id: courseId });
    res.status(200).json({ msg: "course deleted" });
  } catch (e) {
    res.json(e);
  }
});
module.exports = router;
