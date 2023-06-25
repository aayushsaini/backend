export const messages = {
  success: {
    server: {
      serverStarted: "StreamSocial BE Server started 🚀\nListening @ port:",
      dbConnected: "Database connected successfully ✅",
    },
    controller: {
      user: {
        registered: "User is now registered",
      },
    },
  },
  error: {
    server: {
      serverError: "Server error, please try again later",
      dbConnectFail: "Database connection failed ❌",
    },
    controller: {
      user: {
        invalidEmail: "Invalid email format",
        invalidFirstName:
          "Invalid first name, first name must be at least 3 characters long",
        invalidLastName:
          "Invalid last name, last name must be at least 3 characters long",
        invalidPassword:
          "Invalid password, password must be at least 6 characters long",
        invalidUserName:
          "Invalid username, username must be at least 3 characters long",
        userNameAlreadyExists:
          "This username already exists, please try using another one",
        emailAlreadyExists:
          "This email already exists, please try using another one",
      },
    },
  },
};
