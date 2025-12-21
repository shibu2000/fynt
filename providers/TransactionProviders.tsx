import { TransactionType, TransactionWithId } from "@/type/transaction.type";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext<{
  transactions: TransactionWithId[];
  addTransaction: (t: TransactionType) => Promise<void>;
  balance: number;
  loading: boolean;
  fetchTransaction: (p: number) => Promise<TransactionWithId[]>;
  totalPages: number;
  fetchTransactionById: (id: number) => Promise<TransactionWithId | null>;
  deleteTransactionById: (transaction: TransactionWithId) => Promise<void>;
  updateTransaction: (t: TransactionWithId) => Promise<void>;
  deleteAllTransaction: () => Promise<void>;
} | null>(null);

const LIMIT = 20;

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const db = useSQLiteContext();
  const [transactions, setTransactions] = useState<TransactionWithId[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  async function fetchTransaction(page: number = 1) {
    const offset = page * LIMIT - LIMIT;
    try {
      const rows = await db.getAllAsync<TransactionWithId>(
        `SELECT * FROM transactions ORDER BY datetime DESC LIMIT 10 OFFSET ${offset}`
      );

      return rows;
    } catch (error) {
      console.log("Error fetching transactions!");
      throw error;
    }
  }

  async function fetchTransactionById(id: number) {
    try {
      const row = await db.getFirstAsync<TransactionWithId>(
        `SELECT * FROM transactions WHERE id = ${id}`
      );
      return row;
    } catch (error) {
      console.log("Error fetching transaction by id!");
      throw error;
    }
  }

  const addTransaction = async (transaction: TransactionType) => {
    const statement = await db.prepareAsync(`
        INSERT INTO transactions (title, description, category, amount, datetime, type) 
        VALUES ($title, $description, $category, $amount, $datetime, $type)
      `);

    try {
      const result = await statement.executeAsync({
        $title: transaction.title,
        $description: transaction.description,
        $category: transaction.category,
        $amount: transaction.amount,
        $datetime: transaction.datetime.toISOString(),
        $type: transaction.type,
      });

      setLoading(true);
      setTransactions((prev) => [
        { id: result.lastInsertRowId, ...transaction },
        ...prev,
      ]);

      setBalance((prev) =>
        transaction.type === "income"
          ? prev + Number(transaction.amount)
          : prev - Number(transaction.amount)
      );
    } finally {
      await statement.finalizeAsync();
      setLoading(false);
    }
  };

  async function deleteTransactionById(transaction: TransactionWithId) {
    try {
      await db.runAsync(
        `DELETE FROM transactions WHERE id = ${transaction.id}`
      );
      setBalance((prev) => {
        if (transaction.type == "income") {
          return prev - Number(transaction.amount);
        } else {
          return prev + Number(transaction.amount);
        }
      });
    } catch (error) {
      console.log("Error deleting transaction!");
      throw error;
    }
  }

  async function deleteAllTransaction() {
    try {
      await db.runAsync(`DELETE FROM transactions`);
      setTransactions([]);
      setBalance(0);
    } catch (error) {
      console.log("Error deleting transactions!", error);
      throw error;
    }
  }

  async function updateTransaction(updatedTransaction: TransactionWithId) {
    try {
      const prevTransaction = await fetchTransactionById(updatedTransaction.id);

      if (!prevTransaction) throw new Error("Transaction not found!");

      const statement = await db.prepareAsync(`UPDATE transactions
        SET 
          title = $title,
          description = $description,
          category = $category,
          amount = $amount,
          datetime = $datetime,
          type = $type
        WHERE id = $id        
      `);

      await statement.executeAsync({
        $title: updatedTransaction.title,
        $description: updatedTransaction.description,
        $category: updatedTransaction.category,
        $amount: updatedTransaction.amount,
        $datetime: updatedTransaction.datetime.toISOString(),
        $type: updatedTransaction.type,
        $id: updatedTransaction.id,
      });

      setTransactions((prev) =>
        prev.map((t) =>
          t.id == updatedTransaction.id ? updatedTransaction : t
        )
      );

      if (prevTransaction.amount == updatedTransaction.amount) return;

      setBalance((prev) => {
        if (updatedTransaction.type == "income") {
          const restoreBalance = prev - Number(prevTransaction.amount);
          return restoreBalance + Number(updatedTransaction.amount);
        } else {
          const restoreBalance = prev + Number(prevTransaction.amount);
          return restoreBalance - Number(updatedTransaction.amount);
        }
      });
    } catch (error) {
      console.log("Error updating transaction!");
      throw error;
    }
  }

  async function initTransactions() {
    try {
      const rows = await db.getAllAsync<TransactionWithId>(
        `SELECT * FROM transactions ORDER BY datetime DESC LIMIT ${LIMIT}`
      );

      const totalCount = await db.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) AS count FROM transactions"
      );

      setTotalPages(() => {
        if (totalCount?.count) {
          return Math.ceil(totalCount.count / 10);
        } else {
          return 0;
        }
      });

      const row = await db.getFirstAsync<{
        income: number;
        expense: number;
      }>(`
          SELECT
          COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) AS income,
          COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) AS expense
          FROM transactions
        `);

      const { income, expense } = row ?? { income: 0, expense: 0 };

      setBalance(income - expense);

      setTransactions(rows);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log("initiating..");
    // run init when db becomes available
    if (!db) return;
    initTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        balance,
        loading,
        fetchTransaction,
        totalPages,
        fetchTransactionById,
        deleteTransactionById,
        updateTransaction,
        deleteAllTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);

  if (!context)
    throw new Error("useTransaction mus be inside TransactionProvider");

  return context;
};
