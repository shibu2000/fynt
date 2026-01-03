import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Link, Stack, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";

const _layout = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  useEffect(() => {
    (async () => {
      const lastLoginTime = Date.now();
      await AsyncStorage.setItem("lastLoginTime", lastLoginTime.toString());
    })();
  }, []);

  return (
    <>
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
              backgroundColor: "#1F5B4B",
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
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "white" }}
                >
                  Overview
                </Text>
              </View>
            ),
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.openDrawer()}
                style={{
                  padding: 6,
                  marginRight: 10,
                  backgroundColor: "transparent",
                }}
              >
                <MaterialIcons name="account-circle" size={24} color="white" />
              </Pressable>
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
                <MaterialIcons name="manage-history" size={24} color="white" />
              </Link>
            ),
          }}
        />
      </Stack>
    </>
  );
};

export default _layout;
