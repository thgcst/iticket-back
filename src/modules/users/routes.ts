import express from "express";

// import * as Yup from "yup";

// import AuthenticateService from "@modules/users/services/AuthenticateService";

const userRouter = express.Router();

// userRouter.post("/", async (req, res) => {
//   const schema = Yup.object().shape({
//     email: Yup.string().email().required(),
//     password: Yup.string().required(),
//   });

//   if (!(await schema.isValid(req.body))) {
//     return res.status(400).json({ error: "Validation fails" });
//   }

//   const { email, password } = req.body;

//   const result = await AuthenticateService({ email, password });

//   return res.json(result);
// });

export default userRouter;
