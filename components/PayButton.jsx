export default function PayButton({ amount, name, description }) {
  const handlePayment = async () => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100 }), // ₹ to paise
    });
    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: name || "My Store",
      description: description || "Payment",
      order_id: order.id,
      handler: function (response) {
        // Payment success!
        alert("Payment successful! ID: " + response.razorpay_payment_id);
        // Yahan apna redirect ya order confirm logic dalna
      },
      theme: { color: "#528FF0" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment}>
      Pay ₹{amount}
    </button>
  );
}