type OperationType = "expanses" | "income" | "revenue" | "debt";

interface FinanceEntry {
  division: "B2B" | "B2C";
  date: string;
  amount: string;
  type: OperationType;
}

export const generateRandomData = (count: number): FinanceEntry[] => {
  const entries: FinanceEntry[] = [];
  const operationTypes: OperationType[] = [
    "expanses",
    "income",
    "revenue",
    "debt",
  ];

  for (let i = 0; i < count; i++) {
    const division = Math.random() > 0.5 ? "B2B" : "B2C";
    const type: OperationType =
      operationTypes[Math.floor(Math.random() * operationTypes.length)];

    // Типичная сумма по типу операции
    const amount = (() => {
      switch (type) {
        case "expanses":
          return getRandomInt(10000, 70000);
        case "income":
          return getRandomInt(30000, 100000);
        case "revenue":
          return getRandomInt(80000, 150000);
        case "debt":
          return getRandomInt(0, 20000);
      }
    })();

    // Дата: равномерное распределение по годам
    const month = getRandomInt(0, 11);
    const day = getRandomInt(1, 28);
    const year = new Date().getFullYear();
    const date = new Date(year, month, day).toISOString();

    entries.push({
      division,
      date,
      amount: amount.toString(),
      type,
    });
  }

  return entries;
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
