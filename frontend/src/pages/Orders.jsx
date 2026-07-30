import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>My Orders</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          No orders found.
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card shadow-sm mb-3">
            <div className="card-body">
              <h4>Order #{order.id}</h4>

              <p>
                <strong>Total Amount:</strong> ₹
                {Number(order.total_amount).toFixed(2)}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    order.status === "Pending"
                      ? "bg-warning text-dark"
                      : order.status === "Delivered"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {order.status}
                </span>
              </p>

              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>

              <Link
                to={`/orders/${order.id}`}
                className="btn btn-primary"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;