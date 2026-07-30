import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);

      if (response.data) {
        setProduct(response.data);
      } else {
        setProduct(response);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load product"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAdding(true);

      await addToCart(product.id, 1);

      alert("Product added to cart successfully!");
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to add product to cart."
      );
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2>{product.name}</h2>

        <p className="mt-3">{product.description}</p>

        <h3 className="text-success">₹{product.price}</h3>

        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <button
          className="btn btn-success"
          onClick={handleAddToCart}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;