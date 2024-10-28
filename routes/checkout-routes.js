import express from "express";

import {
  getCheckoutPageFromStripe,
  subscribeUserAfterPayment,
} from "../controllers/index.js";

const router = express.Router();

router.post("/create-checkout-session", getCheckoutPageFromStripe);
router.post("/subscribe-user", subscribeUserAfterPayment);

export default router;
