import express from "express";

import {
  getCheckoutPageFromStripe,
  subscribeUserAfterPayment,
  getSubscriptionExpireDetails,
} from "../controllers/index.js";

const router = express.Router();

router.post("/create-checkout-session", getCheckoutPageFromStripe);
router.post("/subscribe-user", subscribeUserAfterPayment);
router.get("/subscription-expire-details", getSubscriptionExpireDetails);

export default router;
