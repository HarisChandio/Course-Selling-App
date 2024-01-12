const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");

const jwtPrivateKey = "12345";
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      const newUser = await User.create({
        username: username,
        password: password,
        email: email,
      });
      res.status(201).json({
        msg: "sign up successfully",
        user: username,
        id: newUser._id,
      });
    } else {
      res.status(404).json({ msg: "user already exist" });
    }
  } catch (e) {
    res.json(e);
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username, password: password });
    if (user) {
      const token = jwt.sign(
        {
          username,
        },
        jwtPrivateKey
      );

      
      res.status(200).json({ token });
    } else {
      res.status(401).json({ msg: "Invalid username or password" });
    }
  } catch (e) {
    
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses: courses });
  } catch (e) {
    res.json(e);
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {

  const username = req.headers.username;
  const courseId = req.params.courseId;
  try {
    await User.updateOne(
      {
        username,
      },
      {
        "$push": {
          purchasedCourses: courseId,
        },
      }
    );
    res.status(201).json({
      msg: "courses purchased",
    });
  } catch (e) {
    res.json(e);
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  try {
    const username = req.headers.username;
    const user = await User.findOne({ username: username });
    const courses = await Course.find({
      _id: {
       "$in": user.purchasedCourses,
      },
    });
    res.json({ courses: courses });
  } catch (e) {
    res.status(500).json({ e });
  }
});

module.exports = router;
