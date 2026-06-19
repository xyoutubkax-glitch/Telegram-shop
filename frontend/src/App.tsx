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
        <h1>🛒 Мой магазин</h1>

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
      {tab === "shop" &&
  products.map((product) => (
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
{tab === "admin" && isAdmin && (
  <div>
    ...
  </div>
)}

{tab === "profile" && (
  <div
    style={{
      marginTop: "20px",
      background: "#fff",
      padding: "20px",
      borderRadius: "15px",
    }}
  >
    <div
  style={{
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  <div
    style={{
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "#0088cc",
      color: "#fff",
      fontSize: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
    }}
  >
    👤
  </div>

  <h2>{user?.first_name}</h2>
</div>
<p>Имя: {user?.first_name}</p>
<p>Username: @{user?.username}</p>
<p>ID: {user?.id}</p>

<p>Товаров в корзине: {cart.length}</p>
<p>Сумма заказа: €{totalPrice}</p>

    {isAdmin && (
      <button
        onClick={() => setTab("admin")}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "12px",
          background: "#0088cc",
          color: "#fff",
          marginTop: "10px",
        }}
      >
        ⚙️ Админ-панель
      </button>
    )}
  </div>
)}

{tab === "cart" && (
  <div>
    ...
  </div>
)}
      {tab === "cart" && ( 

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
      )}
    </div>
    
  );
}

export default App;