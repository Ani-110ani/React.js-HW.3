import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = (productToDelete) => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== productToDelete.id),
    );
    setDeletedProducts((prev) => [...prev, productToDelete]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>პროდუქტები</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", height: "200px", objectFit: "contain" }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
              {product.title}
            </h3>
            <p style={{ fontWeight: "bold", color: "green" }}>
              ${product.price}
            </p>
            <button
              onClick={() => handleDelete(product)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              წაშლა
            </button>
          </div>
        ))}
      </div>

      {deletedProducts.length > 0 && (
        <div
          style={{
            marginTop: "50px",
            borderTop: "2px solid #eee",
            paddingTop: "20px",
          }}
        >
          <h2 style={{ color: "#ff4d4f" }}>წაშლილი პროდუქტები</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {deletedProducts.map((product) => (
              <div
                key={`deleted-${product.id}`}
                style={{
                  border: "1px solid #ffccc7",
                  backgroundColor: "#fff2f0",
                  padding: "15px",
                  borderRadius: "8px",
                  opacity: 0.8,
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    filter: "grayscale(100%)",
                  }}
                />
                <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
                  {product.title}
                </h3>
                <p style={{ fontWeight: "bold" }}>${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
