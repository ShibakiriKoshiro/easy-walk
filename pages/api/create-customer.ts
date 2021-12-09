const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // const { user } = useAuth();
  const customer = await stripe.customers.create();
  res.status(200).json({ customer });
}
