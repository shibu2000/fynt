import DeleteModal from "@/components/DeleteModal";
import Hr from "@/components/Hr";
import LoadingScreen from "@/components/LoadingScreen";
import { toast } from "@/components/toast";
import { useTransaction } from "@/providers/TransactionProviders";
import { TransactionWithId } from "@/type/transaction.type";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const index = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { fetchTransactionById, deleteTransactionById } = useTransaction();
  const [transaction, setTransaction] = useState<TransactionWithId | null>(
    null
  );
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTransactionById(Number(id));
        setTransaction(data);
      } catch (error) {
        toast.error("Something went wrong, try again!");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDeleteTransaction = async () => {
    if (!transaction) return;
    try {
      setLoading(true);
      await deleteTransactionById(transaction);
      toast.success("Transaction deleted successfully!");
      router.back();
    } catch (error) {
      toast.error("Something went wrong, try again!");
    } finally {
      setLoading(false);
      setVisibleDeleteModal(false);
    }
  };

  const handleEditTransaction = () => {
    if (!transaction) return;

    router.replace({
      pathname: "/home/add-transaction",
      params: {
        id: transaction.id,
        type: transaction.type,
      },
    });
  };

  if (loading) return <LoadingScreen />;

  if (!transaction)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No Data Found!</Text>
      </View>
    );

  return (
    <View
      className="flex-1"
      style={{
        padding: 20,
        // backgroundColor: "#E8F5E9",
      }}
    >
      <View
        style={{
          height: "25%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          className={`text-center font-dmBold text-5xl ${
            transaction.type === "expense" ? "text-red-500" : "text-green-500"
          }`}
        >
          {transaction.type === "expense" ? "- " : "+ "}
          <FontAwesome
            name="inr"
            size={40}
            color={transaction.type === "expense" ? "#ef4444" : "#22c55e"}
          />
          {transaction.amount}
        </Text>
        <Text className="text-center font-dmMedium text-2xl text-gray-500">
          {transaction.title}
        </Text>
      </View>
      <View
        className="bg-gray-200 p-5 rounded-lg"
        style={style.detailsContainer}
      >
        <View style={style.details}>
          <MaterialIcons name="category" size={24} color="black" />
          <Text className="font-dm text-2xl">
            <Text className="font-dmBold">Category:</Text>{" "}
            {transaction.category}
          </Text>
        </View>
        <View style={style.details}>
          <MaterialIcons name="description" size={24} color="black" />
          <Text className="font-dm text-2xl">
            <Text className="font-dmBold">Description:</Text>{" "}
            {transaction.description}
          </Text>
        </View>

        <Hr />

        <View style={style.details}>
          <Feather name="calendar" size={24} color="black" />
          <Text className="font-dm text-2xl">
            <Text className="font-dmBold">Date:</Text>{" "}
            {new Date(transaction.datetime).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>

        <View style={style.details}>
          <MaterialIcons name="access-time" size={24} color="black" />
          <Text className="font-dm text-2xl">
            <Text className="font-dmBold">Time:</Text>{" "}
            {new Date(transaction.datetime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
        </View>
      </View>
      <View style={style.actionButtonsContainer}>
        <TouchableOpacity
          disabled={loading}
          onPress={handleEditTransaction}
          className="flex-grow"
        >
          <LinearGradient
            colors={["#1F5B4B", "#569138"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={style.actionButton}
          >
            <Text className="font-dm text-xl text-white">Edit</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          className="flex-grow"
          onPress={() => setVisibleDeleteModal(true)}
        >
          <LinearGradient
            colors={["#FF5F5F", "#C62828"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={style.actionButton}
          >
            <Text className="font-dm text-xl text-white">Delete</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <DeleteModal
        visible={visibleDeleteModal}
        onClose={() => setVisibleDeleteModal(false)}
        onConfirm={handleDeleteTransaction}
      />
    </View>
  );
};

const style = StyleSheet.create({
  detailsContainer: {
    margin: 5,
  },
  details: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  actionButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionButton: {
    paddingVertical: 15,
    // borderColor: "black",
    // borderWidth: 1,
    flexGrow: 1,
    alignItems: "center",
    borderRadius: 4,
  },
});

export default index;
