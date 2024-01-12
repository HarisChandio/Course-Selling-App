# Course-Selling-App

## Server Documentation

## Introduction
This server is built using Node.js and Express.js to provide functionality related to user authentication, course management, and purchase tracking. It includes two main routers: `adminRouter` and `userRouter`. The server uses MongoDB to store data.

## Getting Started

### Installation
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Provide your mongo db url to db/index.js file.

## User Routes (`/user`)

### Sign Up
- **Endpoint:** `POST /user/signup`
- **Description:** Create a new user account.
- **Request Body:**
  ```json
  {
    "username": "example",
    "password": "securePassword",
    "email": "example@example.com"
  }
- **Response**
- {
  "msg": "sign up successfully",
  "user": "example",
  "id": "user_id"
}

