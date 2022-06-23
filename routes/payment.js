const express = require('express')

const router = express.Router()


router.post("/stripePay", async (req, res) => {
    const { email } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
      receipt_email: email,
    });
  
    res.json({ client_secret: paymentIntent["client_secret"] });
  });
  
  module.exports = router
  