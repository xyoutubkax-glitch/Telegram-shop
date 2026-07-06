import OptionSelector from "./OptionSelector";
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  flavors?: string[];
  selectedFlavor?: string;
  resistance?: string[];
nicotine?: string[];
strength?: string[];
color?: string[];
draws?: string;
};

type Props = {
  product: Product;

  selectedFlavor: string;
  setSelectedFlavor: (value: string) => void;

  selectedResistance: string;
setSelectedResistance: (v: string) => void;

selectedNicotine: string;
setSelectedNicotine: (v: string) => void;

selectedStrength: string;
setSelectedStrength: (v: string) => void;

selectedColor: string;
setSelectedColor: (v: string) => void;

  quantity: number;
  setQuantity: (value: number) => void;

  onClose: () => void;
  onAdd: () => void;
};

export default function ProductModal({
  product,

  selectedFlavor,
  setSelectedFlavor,

  selectedResistance,
  setSelectedResistance,

  selectedNicotine,
  setSelectedNicotine,

  selectedStrength,
  setSelectedStrength,

  selectedColor,
  setSelectedColor,

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
  height: "380px",
  objectFit: "cover",
  borderRadius: "26px",
  display: "block",
  boxShadow: "0 10px 35px rgba(0,0,0,.35)",
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
  right: "18px",
  top: "18px",
  width: "54px",
  height: "54px",
  borderRadius: "50%",
  background: "rgba(0,0,0,.45)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "#fff",
  fontSize: "24px",
  cursor: "pointer",
}}
  >
    ♡
  </button>

  <div
    style={{
  position: "absolute",
  right: "18px",
  bottom: "18px",
  padding: "10px 16px",
  borderRadius: "999px",
  background: "rgba(0,0,0,.45)",
  backdropFilter: "blur(14px)",
  color: "#fff",
  fontWeight: 700,
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
  <OptionSelector
  title="Сопротивление"
  icon="⚡"
  options={product.resistance ?? []}
  value={selectedResistance}
  onChange={setSelectedResistance}
/>

<OptionSelector
  title="Никотин"
  icon="💧"
  options={product.nicotine ?? []}
  value={selectedNicotine}
  onChange={setSelectedNicotine}
/>

<OptionSelector
  title="Крепость"
  icon="🔥"
  options={product.strength ?? []}
  value={selectedStrength}
  onChange={setSelectedStrength}
/>

<OptionSelector
  title="Цвет"
  icon="🎨"
  options={product.color ?? []}
  value={selectedColor}
  onChange={setSelectedColor}
/>
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
    marginTop: "40px",
    paddingTop: "24px",
    borderTop: "1px solid rgba(255,255,255,.08)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    }}
  >
    <div>
      <div
        style={{
          color: "#7f8ca3",
          fontSize: "14px",
        }}
      >
        Итого
      </div>

      <div
        style={{
          color: "#fff",
          fontSize: "34px",
          fontWeight: 700,
        }}
      >
        €{(product.price * quantity).toFixed(2)}
      </div>
    </div>
  </div>

  <button
    onClick={onAdd}
    style={{
      width: "100%",
      height: "64px",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",

      background:
        "linear-gradient(135deg,#2997ff,#2563eb)",

      color: "#fff",

      fontSize: "20px",

      fontWeight: 700,

      boxShadow:
        "0 12px 30px rgba(41,151,255,.35)",
    }}
  >
    🛒 Добавить в корзину
  </button>
</div>
    </div>
  );
}      