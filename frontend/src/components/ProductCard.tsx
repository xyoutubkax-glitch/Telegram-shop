
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  flavors?: string[];
  color?: string;
  resistance?: string;
  nicotine?: string;
  strength?: string;
};

type Props = {
  product: Product;
  onClick: () => void;
  onAdd: () => void;
};

export default function ProductCard({
  product,
  onClick,
  onAdd,
}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        overflow: "hidden",
        marginTop: "20px",
        cursor: "pointer",
      }}
    >
      <img
        src={product.image}
        style={{
          width: "100%",
          height: "330px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "18px" }}>
        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <h3>€{product.price}</h3>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "14px",
            background: "#229ED9",
            color: "#fff",
          }}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}