import React from "react";
type Props = {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  cart: any[];
};

export default function BottomNav({
  tab,
  setTab,
  cart,
}: Props) {
    return (
<div
  style={{
    position: "fixed",
    bottom: "20px",
    left: "15px",
    right: "15px",

    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "14px 10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    zIndex: 999,
  }}
>
  <button
  onClick={() => setTab("shop")}
  style={{
    border: "none",
    background:
  tab === "shop"
    ? "linear-gradient(135deg,#229ED9,#0088cc)"
    : "transparent",
    boxShadow:
  tab === "shop"
    ? "0 0 20px rgba(34,158,217,0.7)"
    : "none",
    transition: "all 0.3s ease",
    transform: 
    tab === "shop"
    ? "scale(1.05)"
    : "scale(1)",
    color: tab === "shop" ? "#fff" : "#555",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
alignItems: "center",
justifyContent: "center",
padding: 0,
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 3L3 10h2v10h5v-6h4v6h5V10h2z"/>
  </svg>
</button>

  <div
  style={{
    position: "relative",
  }}
>
  <button
    onClick={() => setTab("cart")}
    style={{
      border: "none",
      background:
      tab === "cart"
    ? "linear-gradient(135deg,#229ED9,#0088cc)"
    : "transparent",
    boxShadow:
  tab === "cart"
    ? "0 0 20px rgba(34,158,217,0.7)"
    : "none",
    transition: "all 0.3s ease",
    transform: 
    tab === "cart"
    ? "scale(1.05)"
    : "scale(1)",
      color: tab === "cart" ? "#fff" : "#555",
      width: "55px",
      height: "55px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      fontSize: "24px",
    }}
  >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M7 4H3v2h2l2.6 7.6-1 1.8c-.2.3-.3.7-.3 1.1
      0 1.1.9 2 2 2h12v-2H8.4c-.1 0-.2-.1-.2-.2v-.1l.9-1.7h7.4
      c.8 0 1.5-.4 1.8-1.2L21 7H8.2L7.3 4zM9 20
      c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0
      c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
</button>

  {cart.length > 0 && (
    <div
      style={{
        position: "absolute",
        top: "-2px",
        right: "-2px",
        background: "#ff3b30",
        color: "#fff",
        minWidth: "20px",
        height: "20px",
        borderRadius: "50%",
        fontSize: "12px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {cart.length}

    </div>
  )}
</div>
  <button
  onClick={() => setTab("profile")}
  style={{
    border: "none",
    background:
      tab === "profile"
        ? "linear-gradient(135deg,#229ED9,#0088cc)"
        : "transparent",
        boxShadow:
  tab === "profile"
    ? "0 0 20px rgba(34,158,217,0.7)"
    : "none",
    transition: "all 0.3s ease",
    transform: 
    tab === "profile"
    ? "scale(1.05)"
    : "scale(1)",
    color: tab === "profile" ? "#fff" : "#555",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5
             2.2 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3
             c0-3.3-6.7-5-10-5z"/>
  </svg>
</button>
</div>
);
}