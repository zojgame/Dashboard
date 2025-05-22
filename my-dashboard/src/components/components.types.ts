export type OperationType = "expanses" | "income" | "revenue" | "debt";

export interface FinanceEntry {
  division: "B2B" | "B2C";
  date: string;
  amount: string;
  type: OperationType;
}
