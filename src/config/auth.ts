export default {
  user: {
    secret:
      process.env.NODE_ENV === "test" ? "user_secret" : process.env.USER_SECRET,
    expiresIn: "8h",
  },
  manager: {
    secret:
      process.env.NODE_ENV === "test"
        ? "manager_secret"
        : process.env.MANAGER_SECRET,
    expiresIn: "1d",
  },
  adm: {
    secret:
      process.env.NODE_ENV === "test" ? "adm_secret" : process.env.ADM_SECRET,
    expiresIn: "1d",
  },
};
