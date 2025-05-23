import { DEBT_CATEGORIES } from "./components.config";

export type OperationType = "expanses" | "income" | "revenue" | "debt";

export interface FinanceEntry {
  division: "B2B" | "B2C";
  date: string;
  amount: string;
  type: OperationType;
  debtType?: TDebtType;
}

export type TDebtType = (typeof DEBT_CATEGORIES)[number];
