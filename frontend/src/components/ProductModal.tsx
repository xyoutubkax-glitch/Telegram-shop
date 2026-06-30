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
      <button onClick={onClose}>
        ◀ Назад
      </button>

      <img
        src={product.image}
        style={{
          width: "100%",
          borderRadius: "20px",
          marginTop: "15px",
        }}
      />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h2
        style={{
          color: "#38bdf8",
        }}
      >
        €{product.price}
      </h2>

      {product.flavors?.length ? (
        <>
          <h4>Вкус</h4>

          <select
            value={selectedFlavor}
            onChange={(e) =>
              setSelectedFlavor(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
            }}
          >
            {product.flavors.map((flavor) => (
              <option
                key={flavor}
                value={flavor}
              >
                {flavor}
              </option>
            ))}
          </select>
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