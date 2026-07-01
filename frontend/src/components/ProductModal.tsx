type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  flavors?: string[];
  selectedFlavor?: string;
};

type Props = {
  product: Product;
  selectedFlavor: string;
  setSelectedFlavor: (value: string) => void;
  quantity: number;
  setQuantity: (value: number) => void;
  onClose: () => void;
  onAdd: () => void;
};

export default function ProductModal({
  product,
  selectedFlavor,
  setSelectedFlavor,
  quantity,
  setQuantity,
  onClose,
  onAdd,
}: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0f172a",
        zIndex: 9999,
        overflowY: "auto",
        padding: "20px",
      }}
    >
     <div
  style={{
    position: "relative",
    marginBottom: "24px",
  }}
>
  <img
    src={product.image}
    style={{
      width: "100%",
      height: "380px",
      objectFit: "cover",
      borderRadius: "28px",
    }}
  />

  {/* Назад */}

  <button
    onClick={onClose}
    style={{
      position: "absolute",
      top: 18,
      left: 18,
      width: 46,
      height: 46,
      borderRadius: "50%",
      border: "none",
      background: "rgba(0,0,0,.45)",
      backdropFilter: "blur(10px)",
      color: "#fff",
      fontSize: "22px",
      cursor: "pointer",
    }}
  >
    ✕
  </button>

  {/* Избранное */}

  <button
    style={{
      position: "absolute",
      top: 18,
      right: 18,
      width: 46,
      height: 46,
      borderRadius: "50%",
      border: "none",
      background: "rgba(0,0,0,.45)",
      backdropFilter: "blur(10px)",
      color: "#fff",
      fontSize: "22px",
      cursor: "pointer",
    }}
  >
    ♡
  </button>

  {/* HOT */}

  <div
    style={{
      position: "absolute",
      left: 18,
      bottom: 18,
      padding: "8px 18px",
      borderRadius: "999px",
      background: "linear-gradient(90deg,#ff5f6d,#ffc371)",
      color: "#fff",
      fontWeight: 700,
      fontSize: "14px",
      boxShadow: "0 0 20px rgba(255,120,120,.4)",
    }}
  >
    🔥 HOT
  </div>

  {/* Фото */}

  <div
    style={{
      position: "absolute",
      right: 18,
      bottom: 18,
      padding: "8px 14px",
      borderRadius: "999px",
      background: "rgba(0,0,0,.45)",
      color: "#fff",
      backdropFilter: "blur(10px)",
    }}
  >
    1 / 1
  </div>
</div>
      <h1
  style={{
    color: "#fff",
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "6px",
  }}
>
  {product.name}
</h1>

<div
  style={{
    color: "#94a3b8",
    fontSize: "17px",
    marginBottom: "18px",
  }}
>
  {product.category}
</div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
    color: "#fbbf24",
    fontWeight: 600,
  }}
>
  ⭐⭐⭐⭐⭐
  <span
    style={{
      color: "#94a3b8",
      fontSize: "14px",
    }}
  >
    Пока нет отзывов
  </span>
</div>

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
  }}
>
  <div
    style={{
      fontSize: "34px",
      fontWeight: 700,
      color: "#38bdf8",
    }}
  >
    €{product.price}
  </div>

  <div
    style={{
      padding: "8px 16px",
      borderRadius: "999px",
      background: "#14532d",
      color: "#86efac",
      fontWeight: 600,
    }}
  >
    ✔ В наличии
  </div>
</div>

      {product.flavors?.length ? (
  <>
    <h3
      style={{
        marginTop: "25px",
        marginBottom: "15px",
        color: "#fff",
      }}
    >
      Выберите вкус
    </h3>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      {product.flavors.map((flavor) => (
        <button
          key={flavor}
          onClick={() => setSelectedFlavor(flavor)}
          style={{
            padding: "12px 18px",
            borderRadius: "999px",
            cursor: "pointer",
            border:
              selectedFlavor === flavor
                ? "2px solid #38bdf8"
                : "1px solid #334155",

            background:
              selectedFlavor === flavor
                ? "#0f3b68"
                : "#1e293b",

            color: "#fff",

            transition: ".25s",

            fontWeight: 600,
          }}
        >
          🍓 {flavor}
        </button>
      ))}
    </div>
  </>
) : null}

      <h4
        style={{
          marginTop: "20px",
        }}
      >
        Количество
      </h4>

      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) =>
          setQuantity(Number(e.target.value))
        }
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
        }}
      />

      <button
        onClick={onAdd}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "15px",
          borderRadius: "18px",
          border: "none",
          background:
            "linear-gradient(135deg,#229ED9,#0088cc)",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        🛒 Добавить в корзину
      </button>
    </div>
  );
}