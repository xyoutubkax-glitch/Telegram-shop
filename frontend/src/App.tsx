import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

function App() {
const [tab, setTab] = useState("shop");
const tg = (window as any).Telegram?.WebApp;
const user = tg?.initDataUnsafe?.user;
const isAdmin = user?.id === 7130132807;
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const products: Product[] = [
    {
      id: 1,
      name: "Красная LED гирлянда",
      price: 29,
      image: "/images/miside.jpg",
      description: "Яркая декоративная подсветка для комнаты",
    },
  ];

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const checkout = async () => {
console.log("TG:", tg);
console.log("USER:", user);
const order = {
  customer: name,
  comment,
  items: cart,
  total: totalPrice,

  telegram: {
    id: user?.id,
    username: user?.username,
    first_name: user?.first_name,
    last_name: user?.last_name,
  },
};

  try {
    const response = await fetch(
  "https://telegram-shop-4.onrender.com/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка отправки");
    }

    alert("Заказ отправлен!");

    setCart([]);
    setName("");
    setComment("");
  } catch (error) {
    console.error(error);
    alert("Ошибка отправки заказа");
  }
};

  return (
    <div
  style={{
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    paddingBottom: "100px",
    background: "#ffffffb0",
    minHeight: "100vh",
    color: "#060606",
  }}
>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
       <div>
  <h1 style={{ margin: 0 }}>4enko Shop</h1>
  <p style={{ color: "#666", marginTop: "5px" }}>
    Магазин товаров
  </p>
</div>

        <div
          style={{
            background: "#0088cc",
            color: "white",
            padding: "8px 15px",
            borderRadius: "20px",
          }}
        >
          Корзина: {cart.length}
        </div>
        
      </div>
      {tab === "shop" && (
  <div className="page">
    {products.map((product) => (
        <div
          key={product.id}
          style={{
            background: "#e5e5e5bf",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(92, 89, 89, 0.96)",
            marginTop: "20px",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
          />

          <div style={{ padding: "16px" }}>
            <h2>{product.name}</h2>

            <p style={{ color: "#010101" }}>
              {product.description}
            </p>

            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "15px 0",
              }}
            >
              €{product.price}
            </div>

            <button
              onClick={() => addToCart(product)}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "12px",
                background: "#0088cc",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      ))}
      </div>
      )}

      {tab === "admin" && isAdmin && (
  <div
    style={{
      marginTop: "20px",
      background: "#fff",
      padding: "20px",
      borderRadius: "15px",
    }}
  >
    <h2>⚙️ Панель администратора</h2>

    <button style={{ width: "100%", marginBottom: "10px" }}>
      ➕ Добавить товар
    </button>

    <button style={{ width: "100%", marginBottom: "10px" }}>
      ✏️ Редактировать товар
    </button>

    <button style={{ width: "100%", marginBottom: "10px" }}>
      🗑 Удалить товар
    </button>

    <button style={{ width: "100%" }}>
      📦 Изменить количество
    </button>
  </div>
)}
{tab === "profile" && (
  <div className="page">
    <div
      style={{
        marginTop: "20px",
      }}
    >
  <div
    style={{
      background: "#fff",
      borderRadius: "25px",
      padding: "25px",
      textAlign: "center",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    }}
  >
    <div
      style={{
        width: "90px",
        height: "90px",
        borderRadius: "50%",
        background: "#0088cc",
        color: "#fff",
        fontSize: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 15px",
        fontWeight: "bold",
      }}
    >
      {user?.first_name?.charAt(0) || "👤"}
    </div>

    <h2>{user?.first_name || "Пользователь"}</h2>

    <p style={{ color: "#777" }}>
      @{user?.username || "username"}
    </p>
  </div>

  <div
    style={{
      background: "#fff",
      borderRadius: "25px",
      padding: "20px",
      marginTop: "15px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    }}
  >
    <p>🆔 ID: {user?.id}</p>

    <p>🛒 Товаров в корзине: {cart.length}</p>

    <p>💰 Сумма корзины: €{totalPrice}</p>
  </div>

  {isAdmin && (
    <button
      onClick={() => setTab("admin")}
      style={{
        width: "100%",
        marginTop: "15px",
        padding: "15px",
        border: "none",
        borderRadius: "20px",
        background: "#0088cc",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      ⚙️ Админ-панель
    </button>
  )}
</div>
</div>
)}
      {tab === "cart" && (
  <div className="page">
    <div
          style={{
            marginTop: "30px",
            background: "#ffffff",
            padding: "15px",
            borderRadius: "15px",
          }}
        >
          <h2>Корзина</h2>

          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>{item.name}</span>
              <span>€{item.price}</span>
            </div>
          ))}

          <hr />

          <h3>Итого: €{totalPrice}</h3>

          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px",
              marginBottom: "10px",
            }}
          />

          <textarea
            placeholder="Комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              minHeight: "100px",
              marginBottom: "10px",
            }}
          />

          <button
            onClick={checkout}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "12px",
              background: "#28a745",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Оформить заказ
          </button>

          <button
            onClick={clearCart}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "12px",
              background: "#ff4444",
              color: "white",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Очистить корзину
          </button>
        </div>
        </div>
      )}
      <div
  style={{
    position: "fixed",
    bottom: "20px",
    left: "15px",
    right: "15px",

    background: "#fff",
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
    background: tab === "shop" ? "#0088cc" : "transparent",
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

  <button
  onClick={() => setTab("cart")}
  style={{
    border: "none",
    background: tab === "cart" ? "#0088cc" : "transparent",
    color: tab === "cart" ? "#fff" : "#555",
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
    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 
             2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2
             s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14h9.9
             c.8 0 1.5-.5 1.8-1.2l3-6.8H6.2L5.3 4H2v2h2
             l3.6 7.6-1.4 2.5c-.1.2-.2.5-.2.9
             0 1.1.9 2 2 2h12v-2H8.4l.8-1z"/>
  </svg>
</button>

  <button
  onClick={() => setTab("profile")}
  style={{
    border: "none",
    background: tab === "profile" ? "#0088cc" : "transparent",
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
    </div>
    
  );
}

export default App;