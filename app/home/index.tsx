import ActionModal from "@/components/home/ActionModal";
import TransactionItem from "@/components/home/TransactionItem";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Transactions = [
  {
    title: "Grocery Store",
    category: "food",
    amount: 32.99,
    date: "2025-12-01",
    time: "9:15 AM",
    type: "expense",
  },
  {
    title: "Bus Ticket",
    category: "transport",
    amount: 2.5,
    date: "2025-12-01",
    time: "8:40 AM",
    type: "expense",
  },
  {
    title: "Fuel Station",
    category: "tenities",
    amount: 14.75,
    date: "2025-12-01",
    time: "1:20 PM",
    type: "expense",
  },
  {
    title: "Electricity Bill",
    category: "utilities",
    amount: 45.0,
    date: "2025-12-01",
    time: "2:50 PM",
    type: "expense",
  },
  {
    title: "Netflix Subscription",
    category: "entertainment",
    amount: 9.99,
    date: "2025-12-01",
    time: "7:30 PM",
    type: "expense",
  },
  {
    title: "Coffee Shop",
    category: "food",
    amount: 4.25,
    date: "2025-12-01",
    time: "10:05 AM",
    type: "expense",
  },
  {
    title: "Taxi Ride",
    category: "transport",
    amount: 12.8,
    date: "2025-12-01",
    time: "6:45 PM",
    type: "expense",
  },
  {
    title: "Laundry Service",
    category: "tenities",
    amount: 6.5,
    date: "2025-12-01",
    time: "3:10 PM",
    type: "expense",
  },
  {
    title: "Water Bill",
    category: "utilities",
    amount: 18.0,
    date: "2025-12-01",
    time: "11:40 AM",
    type: "expense",
  },
  {
    title: "Movie Ticket",
    category: "entertainment",
    amount: 11.5,
    date: "2025-12-01",
    time: "8:20 PM",
    type: "expense",
  },
];

const Categories = [
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
];

const Home = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const handleCloseModal = () => {
    setModalVisibility(false);
  };
  return (
    <View className="flex-1">
      <View
        style={{
          height: "25%",
          padding: 20,
        }}
      >
        <View
          className="bg-green-600 rounded-3xl"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:
              "0px 4px 8px -2px rgba(9, 30, 66, 0.25), 0px 0px 0px 1px rgba(9, 30, 66, 0.08)",
          }}
        >
          <Text className="font-dmBold text-5xl text-white">$ 10474747</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
          backgroundColor: "white",
        }}
      >
        {Categories.map(({ icon, name }) => (
          <View key={name} style={{ alignItems: "center" }}>
            <View style={style.iconStyle}>{icon}</View>
            <Text style={{ fontSize: 10, marginTop: 2, textAlign: "center" }}>
              {name}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 10,
          flex: 1,
        }}
      >
        <Text className="font-dmBold text-2xl mt-2 mb-5">
          Recent Transactions
        </Text>

        <FlatList
          data={Transactions}
          renderItem={({ item }) => <TransactionItem item={item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      <TouchableOpacity
        className="absolute bottom-10 right-10 bg-green-600"
        style={{
          width: 70,
          height: 70,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
        }}
        onPress={() => setModalVisibility(true)}
      >
        <FontAwesome6 name="add" size={30} color="white" />
      </TouchableOpacity>
      <ActionModal
        handleCloseModal={handleCloseModal}
        modalVisibility={modalVisibility}
      />
    </View>
  );
};

const style = StyleSheet.create({
  iconStyle: {
    padding: 8,
    borderRadius: "50%",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "0px 4px 8px -2px rgba(9, 30, 66, 0.25), 0px 0px 0px 1px rgba(9, 30, 66, 0.08)",
  },
});

export default Home;
