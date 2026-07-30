import { useEffect, useState } from "react";
import {
  getCart,
  updateCart,
  removeCartItem,
} from "../services/cartService";
import { placeOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = async (item) => {
    try {
      await updateCart(item.cart_id, item.quantity + 1);
      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Failed to update quantity");
    }
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity === 1) return;

    try {
      await updateCart(item.cart_id, item.quantity - 1);
      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Failed to update quantity");
    }
  };

  const removeItem = async (cartId) => {
    if (!window.confirm("Remove this item from cart?")) return;

    try {
      await removeCartItem(cartId);
      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    try {
      await placeOrder();

      alert("🎉 Order placed successfully!");

      fetchCart();

      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to place order"
      );
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.total_price),
    0
  );

  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Shopping Cart</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.cart_id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h4>{item.name}</h4>

                <p>{item.description}</p>

                <p>
                  <strong>Price:</strong> ₹{item.price}
                </p>

                <div className="d-flex align-items-center mb-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => decreaseQuantity(item)}
                  >
                    -
                  </button>

                  <span className="mx-3 fs-5">
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-success"
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </button>
                </div>

                <p>
                  <strong>Total:</strong> ₹{item.total_price}
                </p>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeItem(item.cart_id)}
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          ))}

          <div className="card shadow mt-4">
            <div className="card-body">
              <h4>Order Summary</h4>

              <hr />

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>Shipping</span>
                <strong className="text-success">
                  FREE
                </strong>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>GST (18%)</span>
                <strong>₹{gst.toFixed(2)}</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between fs-4">
                <strong>Grand Total</strong>
                <strong className="text-primary">
                  ₹{grandTotal.toFixed(2)}
                </strong>
              </div>

              <button
                className="btn btn-primary w-100 mt-4"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;