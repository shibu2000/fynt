import React, { useState } from "react";

type TransactionType = {
  title: string;
  category: string;
  amount: number;
  dateTime: Date;
  type: "expense" | "income";
};

type HookReturnType = {
  transactions: TransactionType[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  addIncomeTransaction: (transaction: TransactionType) => void;
  addExpanseTransation: (transaction: TransactionType) => void;
  loading: boolean;
};

const useActionHook = (): HookReturnType => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(false);

  const addIncomeTransaction = (transaction: TransactionType) => {
    setLoading(true);
    setTransactions([...transactions, transaction]);
    setLoading(false);
  };

  const addExpanseTransation = (transaction: TransactionType) => {
    setLoading(true);
    setTransactions([...transactions, transaction]);
    setLoading(false);
  };

  return {
    transactions,
    setTransactions,
    addIncomeTransaction,
    addExpanseTransation,
    loading,
  };
};

export default useActionHook;
