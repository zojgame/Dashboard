import type { FinanceEntry } from "../components.types";

interface ProblemZonesProps {
  data: FinanceEntry[];
}

const ProblemZones: React.FC<ProblemZonesProps> = ({ data }) => {
  const highDebts = data.filter(
    (d) => d.type === "debt" && parseInt(d.amount) > 10000
  );

  return (
    <div className="bg-white p-4 rounded shadow h-full">
      <h2 className="text-lg font-semibold mb-4">Проблемные зоны</h2>
      {highDebts.length > 0 ? (
        <ul className="space-y-2">
          {highDebts.map((item, index) => (
            <li key={index} className="text-sm text-red-600">
              {item.division} — {new Date(item.date).toLocaleDateString()} — ₽{" "}
              {parseInt(item.amount).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">
          Серьёзных задолженностей не обнаружено.
        </p>
      )}
    </div>
  );
};

export default ProblemZones;
