import express from "express";
import {
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
} from "../controllers/customer.js";
import {
  verifyAdmin,
  verifyToken,
  verifyCustomer,
} from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user, you are logged in");
});

router.get("/checkuser/:id", verifyCustomer, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete your account");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("hello admin, you are logged in and you can delete all accounts");
});

//UPDATE
router.put("/:id", verifyCustomer, updateCustomer);

//DELETE
router.delete("/:id", verifyCustomer, deleteCustomer);

//GET
router.get("/:id", verifyCustomer, getCustomer);

//GET ALL
router.get("/", getCustomers);

export default router;
