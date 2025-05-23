export type TRecordType = "Total" | "B2B" | "B2C";

export type TTimePeriod = "Years" | "Months" | "Week";

export type TStyleType =
  | "less_active"
  | "less_inactive"
  | "more_active"
  | "more_inactive";

export type TGroupedData = Record<number, TEntryGroup>;

type TEntryType = "revenue" | "expanses" | "income" | "debt";

export type TEntry = {
  date: string;
  type: TEntryType;
  amount: string;
};

type TEntryGroup = {
  revenue: number;
  expanses: number;
  income: number;
  debt: number;
};

export type EntryType = keyof TEntryGroup;
