import User from "../models/User.js";
import moment from "moment";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  const { skip, limit, search, startDate, endDate } = req.query;

  try {
    let option = {};
    let regexQuery = [
      { username: { $regex: search } },
      { phone: { $regex: search } },
      { nrcNumber: { $regex: search } },
      { email: { $regex: search } },
    ];

    let dateQuery = {
      $gte: new Date(moment(startDate).startOf("day").format()),
      $lte: new Date(moment(endDate).endOf("day").format()),
    };

    if (search && startDate) {
      option = {
        $or: regexQuery,
        createdAt: dateQuery,
      };
    } else if (startDate) {
      option = { createdAt: dateQuery };
    } else if (search) {
      option = { $or: regexQuery };
    }
    const total = await User.find(option).countDocuments();
    const users = await User.find(option, {}, { skip, limit }).sort({
      createdAt: -1,
    });
    res.status(200).json({ data: users, total: total });
  } catch (err) {
    next(err);
  }
};
