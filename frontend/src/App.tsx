import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};
function App() {
const [selectedCategory, setSelectedCategory] =
  useState("Все");
const [orders, setOrders] = useState<any[]>(() => {
  const saved = localStorage.getItem("orders");

  return saved ? JSON.parse(saved) : [];
});

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
      category: "Одноразки",

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
    const newOrder = {
  id: Date.now(),
  total: totalPrice,
  date: new Date().toLocaleString(),
  items: cart,
  status: "В обработке",
};

const updatedOrders = [...orders, newOrder];

setOrders(updatedOrders);

localStorage.setItem(
  "orders",
  JSON.stringify(updatedOrders)
);

    setCart([]);
    setName("");
    setComment("");
  } catch (error) {
    console.error(error);
    alert("Ошибка отправки заказа");
  }
};
const adminButton = {
  width: "100%",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
};
const categories = [
  {
    id: 1,
    name: "🧪 Жидкости",
    image: "/images/categories/liquid.jpg",
  },
  {
    id: 2,
    name: "💨 Одноразки",
    image: "/images/categories/disposable.jpg",
  },
  {
    id: 3,
    name: "🔋 Под-системы",
    image: "/images/categories/pod.jpg",
  },
  {
    id: 4,
    name: "⚙️ Испарители",
    image: "/images/categories/coils.jpg",
  },
  {
    id: 5,
    name: "Никотиновые паучи(снюс)",
    image: "/images/categories/accessories.jpg",
  },
];
const filteredProducts =
  selectedCategory === "Все"
    ? products
    : products.filter(
        (product) =>
          product.category === selectedCategory
      );
  return (
  <div
  style={{
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    paddingBottom: "100px",
    background: "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
    minHeight: "100vh",
    color: "#ffffff",
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
        </div>
        
      </div>
      {tab === "shop" && (
<div
  className="page"
  style={{
    animation: "fadeIn 0.35s ease",
  }}
>
  <div
  style={{
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    marginTop: "20px",
    paddingBottom: "10px",
  }}
>
  {categories.map((category) => (
  <div
    key={category.id}
    onClick={() => setSelectedCategory(category.name)}
    style={{
      minWidth: "160px",
      height: "180px",
      borderRadius: "24px",
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      border:
        selectedCategory === category.name
          ? "3px solid #229ED9"
          : "2px solid rgba(255,255,255,0.08)",
    }}
  >
    <img
      src={category.image}
      alt={category.name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />

    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "12px",
        background:
          "linear-gradient(transparent, rgba(0,0,0,0.8))",
        color: "#fff",
        fontWeight: "700",
        fontSize: "18px",
      }}
    >
      {category.name}
    </div>
  </div>
))}
  {categories.map((category) => (
    <div
      key={category.id}
      onClick={() => setSelectedCategory(category.name)}
      style={{
        minWidth: "160px",
        height: "180px",
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        border:
          selectedCategory === category.name
            ? "3px solid #229ED9"
            : "2px solid rgba(255,255,255,0.08)",
      }}
    >
      <img
        src={category.image}
        alt={category.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "12px",
          background:
            "linear-gradient(transparent, rgba(0,0,0,0.8))",
          color: "#fff",
          fontWeight: "700",
          fontSize: "18px",
        }}
      >
        {category.name}
      </div>
    </div>
  ))}
</div>
    {filteredProducts.map((product) => (
        <div
        onTouchStart={(e) => {
  e.currentTarget.style.transform = "scale(0.98)";
}}

onTouchEnd={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
  key={product.id}
  className="product-card"
  style={{
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  marginTop: "20px",

  transition: "all 0.3s ease",
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

            <p style={{ color: "#cbd5e1" }}>
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
                transition: "0.2s",
                transform: "scale(1)",
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
  <div className="page">
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "30px",
        padding: "25px",
        marginTop: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        ⚙️ Панель администратора
      </h2>

      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        <button
          style={{
            ...adminButton,
            background:
              "linear-gradient(135deg,#229ED9,#0088cc)",
          }}
        >
          ➕ Добавить товар
        </button>

        <button
          style={{
            ...adminButton,
            background:
              "linear-gradient(135deg,#229ED9,#0088cc)",
          }}
        >
          ✏️ Редактировать товар
        </button>

        <button
          style={{
            ...adminButton,
            background:
              "linear-gradient(135deg,#229ED9,#0088cc)",
          }}
        >
          🗑 Удалить товар
        </button>

        <button
          style={{
            ...adminButton,
            background:
              "linear-gradient(135deg,#229ED9,#0088cc)",
          }}
        >
          📦 Изменить количество
        </button>

        <button
          style={{
            ...adminButton,
            background:
              "linear-gradient(135deg,#229ED9,#0088cc)",
          }}
        >
          📑 Заказы
        </button>
      </div>
    </div>
  </div>
)}
{tab === "profile" && (
  <div
  className="page"
  style={{
    animation: "fadeIn 0.35s ease",
  }}
>
    <div
      style={{
        marginTop: "20px",
      }}
    >
  <div
  style={{
    background:
      "linear-gradient(135deg, #0088cc 0%, #00c6ff 100%)",
    borderRadius: "30px",
    padding: "30px",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,136,204,0.35)",
    position: "relative",
    overflow: "hidden",
  }}
>
    <div
  style={{
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto 15px",
    border: "4px solid rgba(255,255,255,0.3)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  }}
>
  {user?.photo_url ? (
    <img
      src={user.photo_url}
      alt="avatar"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0088cc",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px",
        fontWeight: "bold",
      }}
    >
      {user?.first_name?.charAt(0) || "👤"}
    </div>
  )}
</div>


    <h2
  style={{
    margin: 0,
    fontSize: "28px",
    fontWeight: "700",
    color: "#fff",
  }}
>
  {user?.first_name || "Пользователь"}
</h2>

    <p
  style={{
    color: "rgba(255,255,255,0.8)",
    marginTop: "8px",
  }}
>
      @{user?.username || "username"}
    </p>
  </div>

  <div
    style={{
  background: "rgba(30,41,59,0.7)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "25px",
  padding: "20px",
  marginTop: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
}}
  >
    <p style={{ color: "#cbd5e1" }}>
  🆔 ID: {user?.id}
</p>

<p style={{ color: "#cbd5e1" }}>
  🛒 Товаров в корзине: {cart.length}
</p>

<p
  style={{
    color: "#38bdf8",
    fontWeight: "bold",
  }}
>
  💰 Сумма корзины: €{totalPrice}
</p>
  </div>
  <button
  onClick={() => setTab("orders")}
  style={{
    width: "100%",
    marginTop: "15px",
    padding: "14px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg,#229ED9,#0088cc)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  }}
>
  📦 История заказов
</button>

  {isAdmin && (
    <button
      onClick={() => setTab("admin")}
      style={{
        width: "100%",
        marginTop: "15px",
        padding: "15px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        border: "3px solid rgba(255,255,255,0.4)",
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
{tab === "orders" && (
  <div
  className="page"
  style={{
    animation: "fadeIn 0.35s ease",
  }}
>
    <button
    onClick={() => setTab("profile")}
    >
    ◀️ Назад
    </button>
    <h2>📦 История заказов</h2>
    {orders.length === 0 ? (
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "20px",
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        Пока нет заказов
      </div>
    ) : (
     orders.map((order, index) => (
  <div
  key={index}
  style={{
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "20px",
    marginTop: "15px",
  }}
>
    <h3>Заказ #{order.id}</h3>

    <p>💰 Сумма: €{order.total}</p>
    <p>📅 {order.date}</p>
    <p
    style={{
      color:"#22c55e",
      fontWeight: "bold",
    }}
    >
    {order.status}
    </p>
  </div>
))
    )}
  </div>
)}
      {tab === "cart" && (
  <div
  className="page"
  style={{
    animation: "fadeIn 0.35s ease",
  }}
>
    <div
          style={{
            marginTop: "30px",
           background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.1)",
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
</div>
);
}
export default App;