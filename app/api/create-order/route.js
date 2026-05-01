import Razorpay from "razorpay";

export async function POST(req) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return Response.json({ error: 'Razorpay is not configured' }, { status: 503 });
    }

    const { amount } = await req.json();
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    return Response.json(order);
  } catch (err) {
    return Response.json({ error: err.message || 'Could not create order' }, { status: 500 });
  }
}
