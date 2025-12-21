import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerBackVisible: false,
          headerTitleAlign: "center",

          headerStyle: {
            backgroundColor: "white",
          },
          headerTransparent: false,

          headerTitle: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Image
                source={require("@/assets/images/logo.png")}
                style={{ width: 22, height: 22, resizeMode: "contain" }}
              />
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Overview</Text>
            </View>
          ),

          headerRight: () => (
            <Link
              href="/home/transaction"
              style={{
                padding: 6,
                marginRight: 10,
                backgroundColor: "transparent",
              }}
            >
              <MaterialIcons name="manage-history" size={24} color="black" />
            </Link>
          ),
        }}
      />
    </Stack>
  );
};

export default _layout;
