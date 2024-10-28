import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_API_KEY);
const getCheckoutPageFromStripe = async (req, res) => {
  const { item } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: item.description,
            },
            unit_amount: item.price * 100, // Stripe expects amount in cents
          },
          quantity: item.quantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_SIDE_DOMAIN}/payment-success/${item?.uuid}`,
      cancel_url: `${process.env.CLIENT_SIDE_DOMAIN}`,
    });
    res.status(201).send({ url: session.url });
  } catch (err) {
    res.status(400).send({ error: err.message });
    console.log(err);
  }
};

export default getCheckoutPageFromStripe;
