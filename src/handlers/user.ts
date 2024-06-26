import prisma from "../db";
import { comparePassword, createJwt, hashPassword } from "../modules/auth";

export const createUser = async (req, res, next) => {
  try {
    const hash = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });
    const token = await createJwt(user);
    res.json({ token });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  const isValid = await comparePassword(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }
  const token = await createJwt(user);
  res.json({ token });
};
