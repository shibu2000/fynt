import DeleteModal from "@/components/DeleteModal";
import TransactionItem from "@/components/home/TransactionItem";
import LoadingScreen from "@/components/LoadingScreen";
import { toast } from "@/components/toast";
import { useTransaction } from "@/providers/TransactionProviders";
import { TransactionWithId } from "@/type/transaction.type";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const history = () => {
  const { fetchTransaction, totalPages, deleteAllTransaction } =
    useTransaction();
  const [transactions, setTransactions] = useState<TransactionWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    if (page > totalPages || !totalPages) return;

    async function loadData() {
      setLoading(true);
      try {
        const response = await fetchTransaction(page);
        setTransactions((prev) => [...prev, ...response]);
      } catch (error) {
        toast.error("Failed to load transaction!");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [page, totalPages]);

  const handlePagination = () => {
    if (loading || page >= totalPages || !totalPages) return;
    setPage((prev) => prev + 1);
  };

  const handleClearAll = async () => {
    try {
      await deleteAllTransaction();
      setDeleteModalVisible(false);
      toast.success("All transactions are deleted");
      setTransactions([]);
    } catch (error) {
      toast.error("Something went wrong, try again!");
    }
  };

  if (loading && page === 1) return <LoadingScreen />;

  return (
    <View style={{ flex: 1 }}>
      <View className="flex flex-row justify-between items-center bg-white p-5">
        <View className="flex flex-row gap-3">
          <TouchableOpacity className="flex flex-row items-center gap-2 border border-gray-300 p-2 px-4 rounded-full">
            <Feather name="calendar" size={15} color="black" />
            <Text className="font-dmMedium text-lg">Date</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center gap-2 border border-gray-300 p-2 px-4 rounded-full">
            <Feather name="tag" size={15} color="black" />
            <Text className="font-dmMedium text-lg">Category</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
          <Text className="text-[#1F5B4B] font-dmMedium text-lg">
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/home/transaction/${item.id}`)}
            >
              <TransactionItem item={item} />
            </Pressable>
          )}
          keyExtractor={({ id }) => id.toString()}
          onEndReached={handlePagination}
          onEndReachedThreshold={0.1} // fire when 40% close to bottom
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", padding: 20 }}>
              No transactions found, start adding transactions
            </Text>
          )}
          ListFooterComponent={() =>
            loading ? (
              <View style={style.footer}>
                <Text className="text-center font-dmMedium text-lg">
                  Loading...
                </Text>
              </View>
            ) : null
          }
        />
      </View>
      <DeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleClearAll}
        title="Clear All Transactions?"
        subtitle="This action cannot be undone. Are you sure you want to delete all the transactions?"
      />
    </View>
  );
};

const style = StyleSheet.create({
  footer: {
    marginVertical: 20,
  },
});

export default history;
