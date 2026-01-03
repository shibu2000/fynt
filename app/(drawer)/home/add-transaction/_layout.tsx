import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const _layout = () => {
  const router = useRouter();
  const { type, id } = useLocalSearchParams<{
    type: "income" | "expanse";
    id: string;
  }>();

  const title =
    type == "income"
      ? id
        ? "Update Income"
        : "Add Income"
      : id
        ? "Update Expense"
        : "Add Expense";

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
        title,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#1F5B4B",
        },
        headerTitleStyle: {
          color: "white",
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{ paddingHorizontal: 10 }}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
        ),
      }}
    />
  );
};

export default _layout;
