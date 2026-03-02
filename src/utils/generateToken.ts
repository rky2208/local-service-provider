import jwt from "jsonwebtoken";

const generateToken = (user: any) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );
};

export default generateToken;
