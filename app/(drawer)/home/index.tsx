import ActionModal from "@/components/home/ActionModal";
import TransactionItem from "@/components/home/TransactionItem";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { useTransaction } from "@/providers/TransactionProviders";
import { TransactionWithId } from "@/type/transaction.type";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useFocusEffect, useRouter } from "expo-router";
import React, { memo, useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Categories = [
  // ----Expanse------
  {
    icon: <Ionicons name="fast-food" size={25} color="green" />,
    name: "Food",
  },
  {
    icon: <FontAwesome name="car" size={25} color="orange" />,
    name: "Transport",
  },
  {
    icon: <FontAwesome5 name="gas-pump" size={25} color="blue" />,
    name: "Tenities",
  },
  {
    icon: <FontAwesome6 name="bucket" size={25} color="purple" />,
    name: "Utilities",
  },
  {
    icon: <Ionicons name="film-outline" size={25} color="red" />,
    name: "Entertainment",
  },

  //-----Income-----

  {
    icon: <MaterialCommunityIcons name="briefcase" size={28} color="#2E7D32" />,
    name: "Salary",
  },
  {
    icon: <MaterialIcons name="computer" size={28} color="#0277BD" />,
    name: "Freelance",
  },
  {
    icon: <Ionicons name="gift" size={28} color="#C62828" />,
    name: "Gift",
  },
  {
    icon: (
      <MaterialCommunityIcons name="trending-up" size={28} color="#6A1B9A" />
    ),
    name: "Investment",
  },
  {
    icon: <MaterialIcons name="category" size={28} color="#455A64" />,
    name: "Other",
  },
];

const Home = () => {
  const router = useRouter();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [transactions, setTransactions] = useState<TransactionWithId[]>([]);
  const { balance, fetchTransaction } = useTransaction();
  const handleCloseModal = () => {
    setModalVisibility(false);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const data = await fetchTransaction(1);
          setTransactions(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  return (
    <View className="flex-1">
      <View style={{ padding: 20 }}>
        <LinearGradient
          colors={["#1F5B4B", "#569138"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
            paddingVertical: 50,
            borderRadius: 30,
            shadowColor: "rgba(9, 30, 66, 0.25)",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <FontAwesome name="inr" size={40} color="white" />
          <Text className="font-dmBold text-5xl text-white">{balance}</Text>
        </LinearGradient>
      </View>

      <View
        style={{
          backgroundColor: "white",
          paddingVertical: 10,
        }}
      >
        <FlatList
          data={Categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            gap: 20,
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center" }}>
              <View style={style.iconStyle}>{item.icon}</View>
              <Text style={{ fontSize: 10, marginTop: 2 }}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 10,
          flex: 1,
        }}
      >
        {transactions.length > 0 && (
          <Text className="font-dmBold text-2xl mt-2 mb-5">
            Recent Transactions
          </Text>
        )}

        <FlatList
          data={transactions.slice(0, 10)}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/home/transaction/${item.id}`)}
            >
              <TransactionItem item={item} />
            </Pressable>
          )}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", padding: 20 }}>
              No transactions found, start adding transactions
            </Text>
          )}
          ListFooterComponent={
            <FooterLastComponent visible={transactions.length >= 10} />
          }
        />
      </View>

      <TouchableOpacity
        className="absolute bottom-10 right-10"
        onPress={() => setModalVisibility(true)}
      >
        <LinearGradient
          colors={["#1F5B4B", "#569138"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={style.actionBtn}
        >
          <FontAwesome6 name="add" size={30} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      <ActionModal
        handleCloseModal={handleCloseModal}
        modalVisibility={modalVisibility}
      />
    </View>
  );
};

const FooterLastComponent = memo(({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <Link href="/home/transaction" asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: "#16A34A",
          paddingVertical: 12,
          borderRadius: 10,
          marginHorizontal: 10,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          View All
        </Text>
      </TouchableOpacity>
    </Link>
  );
});

const style = StyleSheet.create({
  iconStyle: {
    padding: 8,
    borderRadius: 25,
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "0px 4px 8px -2px rgba(9, 30, 66, 0.25), 0px 0px 0px 1px rgba(9, 30, 66, 0.08)",
  },
  actionBtn: {
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,

    // Android shadow
    elevation: 6,
  },
});

export default Home;
