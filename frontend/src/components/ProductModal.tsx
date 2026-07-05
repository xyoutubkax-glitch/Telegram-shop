
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  flavors?: string[];
  selectedFlavor?: string;
  resistance?: string;
nicotine?: string;
strength?: string;
color?: string;
draws?: string;
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
    marginBottom: "30px",
  }}
>
  <img
    src={product.image}
    alt={product.name}
    style={{
      width: "100%",
      height: "340px",
      objectFit: "cover",
      borderRadius: "24px",
      display: "block",
    }}
  />

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

  <div
    style={{
      position: "absolute",
      top: 32,
      left: 22,
      padding: "8px 18px",
      borderRadius: "999px",
      border: "2px solid #ff4d7a",
      background: "rgba(255,0,90,.15)",
      color: "#fff",
      fontWeight: 700,
      boxShadow: "0 0 15px rgba(255,70,120,.6)",
    }}
  >
    🔥 HOT
  </div>

  <button
    style={{
      position: "absolute",
      top: 18,
      right: 18,
      width: 46,
      height: 46,
      borderRadius: "50%",
      background: "rgba(0,0,0,.45)",
      border: "none",
      color: "#fff",
      fontSize: "22px",
      cursor: "pointer",
    }}
  >
    ♡
  </button>

  <div
    style={{
      position: "absolute",
      right: 18,
      bottom: 18,
      padding: "8px 14px",
      borderRadius: "999px",
      background: "rgba(0,0,0,.45)",
      color: "#fff",
    }}
  >
    1 / 1
  </div>
</div>
     
      {product.flavors?.length ? (
  <>
    <h3
  style={{
    color: "#fff",
    fontSize: "22px",
    marginTop: "35px",
    marginBottom: "18px",
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
  borderRadius: "18px",
  cursor: "pointer",
  border:
    selectedFlavor === flavor
      ? "2px solid #3b82f6"
      : "1px solid #2e3a4d",

  background:
    selectedFlavor === flavor
      ? "linear-gradient(135deg,#1d4ed8,#2563eb)"
      : "#1b2432",

  color: "#fff",

  fontWeight: 600,

  transition: "all .25s",

  minWidth: "120px",

  boxShadow:
    selectedFlavor === flavor
      ? "0 0 18px rgba(59,130,246,.35)"
      : "none",
}}
        >
           {flavor}
        </button>
      ))}
    </div>
    {!selectedFlavor && (
  <p
    style={{
      color: "#f59e0b",
      marginTop: "12px",
      fontSize: "14px",
    }}
  >
    Выберите вкус, чтобы добавить товар в корзину.
  </p>
)}
  </>
) : null}
<div
  style={{
    marginTop: "30px",
  }}
>
  <h3
    style={{
      marginBottom: "18px",
      color: "#fff",
    }}
  >
    Характеристики
  </h3>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}
  >
    {product.resistance && (
      <SpecRow icon="⚡" title="Сопротивление" value={product.resistance} />
    )}

    {product.nicotine && (
      <SpecRow icon="💧" title="Никотин" value={product.nicotine} />
    )}

    {product.strength && (
      <SpecRow icon="🔥" title="Крепость" value={product.strength} />
    )}

    {product.color && (
      <SpecRow icon="🎨" title="Цвет" value={product.color} />
    )}
  </div>
  </div>
<div
  style={{
    marginTop: "28px",
  }}
>
  <h3
    style={{
      color: "#fff",
      marginBottom: "14px",
    }}
  >
    Количество
  </h3>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "170px",
      background: "#1b2432",
      borderRadius: "18px",
      padding: "8px",
    }}
  >
    <button
      onClick={() =>
        quantity > 1 && setQuantity(quantity - 1)
      }
      style={{
        width: "42px",
        height: "42px",
        border: "none",
        borderRadius: "12px",
        background: "#293548",
        color: "#fff",
        fontSize: "22px",
        cursor: "pointer",
      }}
    >
      −
    </button>

    <span
      style={{
        color: "#fff",
        fontSize: "20px",
        fontWeight: 700,
      }}
    >
      {quantity}
    </span>

    <button
      onClick={() =>
        setQuantity(quantity + 1)
      }
      style={{
        width: "42px",
        height: "42px",
        border: "none",
        borderRadius: "12px",
        background: "#2563eb",
        color: "#fff",
        fontSize: "22px",
        cursor: "pointer",
      }}
    >
      +
    </button>
  </div>
</div>
<div
  style={{
    position: "sticky",
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: "40px",
    padding: "20px",
    background: "#0f172a",
    borderTop: "1px solid #243041",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <div>
    <div
      style={{
        color: "#94a3b8",
        fontSize: "13px",
      }}
    >
      Итого
    </div>

    <div
      style={{
        color: "#fff",
        fontSize: "26px",
        fontWeight: 700,
      }}
    >
      €{(product.price * quantity).toFixed(2)}
    </div>
  </div>

  <button
    onClick={onAdd}
    style={{
      padding: "16px 34px",
      border: "none",
      borderRadius: "18px",
      background: "linear-gradient(135deg,#2563eb,#3b82f6)",
      color: "#fff",
      fontSize: "17px",
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 10px 25px rgba(37,99,235,.35)",
    }}
  >
    Добавить
  </button>
</div>
    </div>
  );
}function SpecRow({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#1e293b",
        borderRadius: "16px",
        padding: "14px 18px",
        border: "1px solid #334155",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#cbd5e1",
        }}
      >
        <span style={{ fontSize: "20px" }}>{icon}</span>
        <span>{title}</span>
      </div>
      

      <span
        style={{
          color: "#fff",
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    </div>
  );
}