import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const _layout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
        title: "Transaction Details",
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "white",
        },
        headerStyle: {
          backgroundColor: "#1F5B4B",
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
