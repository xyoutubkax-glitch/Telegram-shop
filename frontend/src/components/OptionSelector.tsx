type Props = {
  title: string;
  icon?: string;
  options: string[];
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
        {options.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            style={{
              padding: "12px 18px",
              borderRadius: "18px",
              cursor: "pointer",

              border:
                value === item
                  ? "2px solid #3b82f6"
                  : "1px solid #2e3a4d",

              background:
                value === item
                  ? "linear-gradient(135deg,#1d4ed8,#2563eb)"
                  : "#1b2432",

              color: "#fff",

              fontWeight: 600,

              transition: ".25s",

              boxShadow:
                value === item
                  ? "0 0 18px rgba(59,130,246,.35)"
                  : "none",
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}