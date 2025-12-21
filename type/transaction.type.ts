export type TransactionType = {
  title: string;
  description: string;
  category: string;
  amount: string;
  datetime: Date;
  type: "expense" | "income";
};

export type TransactionWithId = TransactionType & {
  id: number;
};
