const mongoose = require("mongoose");


const url =
"mongodb+srv://admin:BM2WTRgyukCchLFF@test.bkup85k.mongodb.net/course_selling_app"

mongoose.connect(url);


const AdminSchema = new mongoose.Schema({
  
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    purchasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const CourseSchema = new mongoose.Schema({

  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  imageLink: { type: String, required: true },
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
