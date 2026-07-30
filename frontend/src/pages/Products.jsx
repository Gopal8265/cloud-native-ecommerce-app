import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h4>Loading products...</h4>
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
      <h2 className="mb-4">Products</h2>

      {products.length === 0 ? (
        <div className="alert alert-warning">
          No products found.
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">

                <img
                  src={product.image_url}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250?text=No+Image";
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5>{product.name}</h5>

                  <p>{product.description}</p>

                  <h4 className="text-success">
                    ₹{product.price}
                  </h4>

                  <p>
                    Stock: <strong>{product.stock}</strong>
                  </p>

                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;