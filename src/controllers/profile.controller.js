import { User } from "../models/user.model.js";

const getProfile = async (req, res) => {
  const { user } = req;

  const foundUser = await User.findOne({ _id: user });
  // todo: delete password of the returned user info.
  res.status(200).json({
    ok: true,
    foundUser,
  });
};

export { getProfile };

