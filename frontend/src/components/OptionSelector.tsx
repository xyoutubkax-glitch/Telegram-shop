type ProductOption = {
  name: string;
  stock: number;
};

type Props = {
  title: string;
  icon?: string;
  options: ProductOption[];
  value: string;
  onChange: (value: string) => void;
};

export default function OptionSelector({
  title,
  icon,
  options,
  value,
  onChange,
}: Props) {
  return (
    <div style={{ marginTop: "26px" }}>
      <h3
        style={{
          color: "#fff",
          marginBottom: "14px",
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        {icon} {title}
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {options.map((item) => {
          const isOutOfStock = item.stock <= 0;

          return (
            <button
              key={item.name}
              onClick={() => {
                if (!isOutOfStock) {
                  onChange(item.name);
                }
              }}
              disabled={isOutOfStock}
              style={{
                padding: "12px 18px",
                borderRadius: "18px",
                cursor: isOutOfStock ? "not-allowed" : "pointer",

                border:
                  value === item.name
                    ? "2px solid #3b82f6"
                    : "1px solid #2e3a4d",

                background:
                  value === item.name
                    ? "linear-gradient(135deg,#1d4ed8,#2563eb)"
                    : "#1b2432",

                color: isOutOfStock ? "#6b7280" : "#fff",

                fontWeight: 600,
                transition: ".25s",

                opacity: isOutOfStock ? 0.55 : 1,

                textDecoration: isOutOfStock
                  ? "line-through"
                  : "none",

                boxShadow:
                  value === item.name
                    ? "0 0 18px rgba(59,130,246,.35)"
                    : "none",
              }}
            >
              {item.name} —{" "}
              {isOutOfStock
                ? "нет в наличии"
                : `${item.stock} шт.`}
            </button>
          );
        })}
      </div>
    </div>
  );
}