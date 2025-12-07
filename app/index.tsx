import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        router.push("/home");
      } else {
        setIsLoadingScreen(false);
      }
    }, 2000);
  }, [isLoggedIn]);

  if (isLoadingScreen) return <LoadingScreen />;

  return (
    <View className="flex-1 p-10">
      <View className="flex items-center">
        <Image
          source={require("@/assets/images/manage-money-bro.png")}
          className="h-[350px] w-[350px] mt-2"
        />
      </View>
      <View className="flex gap-20 items-center absolute bottom-10 left-0 right-0 pb-10">
        <View className="mt-10 flex items-center gap-3">
          <Text className="text-5xl font-dmBold pb-10">FYNT</Text>
          <Text className="text-4xl font-dmMedium">For Your Net Total</Text>
          <Text className="text-xl font-caveat">
            Take control of your finance ease.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => router.push("/auth")}
            className="p-5 bg-green-600 rounded-full w-[300px]"
          >
            <Text className="text-3xl text-white text-center">Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/auth")}
            className="mt-3 text-xl"
          >
            <Text className="text-center">Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
