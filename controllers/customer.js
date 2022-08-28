import Customer from "../models/Customer.js";
import moment from "moment";

export const updateCustomer = async (req, res, next) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (err) {
    next(err);
  }
};
export const deleteCustomer = async (req, res, next) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json("Customer has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};
export const getCustomers = async (req, res, next) => {
  const { skip, limit, search, startDate, endDate } = req.query;

  try {
    let option = {};
    let regexQuery = [
      { username: { $regex: search, $options: "i" } },
      { phoneNumber: { $regex: search, $options: "i" } },
      { nrcNumber: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
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
    const total = await Customer.find(option).countDocuments();
    // const skip = req.query.skip || 0;
    // const limit = req.query.limit || 5;
    const customers = await Customer.find(option, {}, { skip, limit }).sort({
      createdAt: -1,
    });
    // const users = await User.find().skip(skip).limit(limit);
    res.status(200).json({ data: customers, total: total });
  } catch (err) {
    next(err);
  }
};
