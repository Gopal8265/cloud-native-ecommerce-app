import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Order Details</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (order.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Order Details</h2>
        <div className="alert alert-warning">
          Order not found.
        </div>
      </div>
    );
  }

  const orderInfo = order[0];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Order #{orderInfo.id}</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <p>
            <strong>Status:</strong>{" "}
            <span className="badge bg-success">
              {orderInfo.status}
            </span>
          </p>

          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(orderInfo.created_at).toLocaleString()}
          </p>

          <p>
            <strong>Total Amount:</strong> ₹
            {Number(orderInfo.total_amount).toFixed(2)}
          </p>
        </div>
      </div>

      <h4>Products</h4>

      {order.map((item) => (
        <div key={item.product_id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5>{item.name}</h5>

            <p>
              <strong>Price:</strong> ₹
              {Number(item.price).toFixed(2)}
            </p>

            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>

            <p>
              <strong>Total:</strong> ₹
              {(Number(item.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;