import { asyncHandler } from "../utils/asyncHandler";
import providerService from "../services/provider.service";

export const getProviderProfile = asyncHandler(async (req, res) => {
  const { providerProfile } = await providerService.getProfile(req.body);
  res.status(200).json({
    success: true,
    data: {
      ...providerProfile,
    },
    message: "Successfully fetched profile!",
  });
});

export const addProfileDetails = asyncHandler(async (req, res) => {
  const { providerProfile } = await providerService.addProfile(req.body);

  res.status(201).json({
    success: true,
    data: {
      profileCompleted: providerProfile.profileCompleted,
      isApproved: providerProfile.isApproved,
    },
    message: "Successfully Profile Created!",
  });
});
