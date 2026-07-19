"use client";

import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState<{name: string, price: number}[]>([]);
  const [loginState, setLoginState] = useState<"idle" | "logged_in">("idle");
  const [password, setPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const addToCart = (name: string, price: number) => {
    setCart([...cart, { name, price }]);
  };

  const checkout = () => {
    // BUG 1 (CRITICAL): crashes if cart is empty because cart[0] is undefined
    const firstItem = cart[0].name.toUpperCase();
    alert(`Order processed starting with ${firstItem}!`);
    setCart([]);
  };

  const login = () => {
    if (password === "demo123") {
      setLoginState("logged_in");
      setShowLoginModal(false);
    } else {
      // BUG 2 (MAJOR): Wrong password fails silently (no UI feedback)
      console.log("Login failed silently");
    }
  };

  return (
    <main>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Next.js Vibe Store</h1>
      
      {/* Auth Flow */}
      <div className="card">
        <h2>Account</h2>
        <p style={{ color: "#94a3b8", marginBottom: "16px" }}>Manage your account settings and preferences.</p>
        
        {loginState === "idle" ? (
          <>
            <button onClick={() => setShowLoginModal(true)}>Log In</button>
            {showLoginModal && (
              <div style={{ marginTop: 20 }}>
                <input 
                  type="password" 
                  placeholder="Password (demo123)" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
                <button onClick={login}>Submit</button>
              </div>
            )}
          </>
        ) : (
          <p className="success">✓ Welcome back, User!</p>
        )}
      </div>

      {/* Shopping Flow */}
      <div className="card">
        <h2>Products</h2>
        <p style={{ color: "#94a3b8", marginBottom: "16px" }}>Browse our latest collection.</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="card" style={{ margin: 0 }}>
            <h3>Smartphone</h3>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "10px 0" }}>$699</p>
            <button onClick={() => addToCart("Smartphone", 699)}>Add to Cart</button>
          </div>
          <div className="card" style={{ margin: 0 }}>
            <h3>Headphones</h3>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "10px 0" }}>$199</p>
            <button onClick={() => addToCart("Headphones", 199)}>Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Checkout Flow */}
      <div className="card">
        <h2>Cart ({cart.length} items)</h2>
        {cart.length === 0 ? (
          <p style={{ color: "#94a3b8", fontStyle: "italic" }}>Your cart is empty.</p>
        ) : (
          <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
            {cart.map((item, i) => <li key={i} style={{ marginBottom: "8px" }}>{item.name} - ${item.price}</li>)}
          </ul>
        )}
        <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #334155" }}>
          <button onClick={checkout} style={{ background: "#10b981" }}>Complete Checkout</button>
        </div>
      </div>
    </main>
  );
}
