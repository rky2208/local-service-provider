import { asyncHandler } from "../utils/asyncHandler";
import authService from "../services/auth.service";

export const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);

  res.cookie("token", token, {
    httpOnly: true, // Protects against XSS
    secure: true, // HTTPS only
    //sameSite: "strict",             // Protects against CSRF
    expires: new Date(Date.now() + 900000),
  });

  res.status(201).json({
    success: true,
    data: {
      userId: user._id,
      email: user.email,
      role: user.role,
      profileCompleted: false,
    },
    message: "Successfully register!",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { token, user, profileCompleted, isApproved } = await authService.login(
    req.body
  );

  res.cookie("token", token, {
    httpOnly: true, // Protects against XSS
    secure: true, // HTTPS only
    //sameSite: "strict",             // Protects against CSRF
    expires: new Date(Date.now() + 900000),
  });

  res.status(200).json({
    success: true,
    data: {
      userId: user._id,
      email: user.email,
      role: user.role,
      profileCompleted,
      isApproved,
    },
    message: "Logged in successfully!",
  });
});
