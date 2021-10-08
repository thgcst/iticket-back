export default {
  user: {
    secret: process.env.NODE_ENV === "test" ? "test" : process.env.APP_SECRET,
    expiresIn: "8h",
  },
};
