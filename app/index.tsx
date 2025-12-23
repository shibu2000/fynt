import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { checkUserExistance } = useAuth();
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);

  useEffect(() => {
    checkUserExistance()
      .then((user) => {
        console.log({ user });
        if (user) {
          router.replace("/auth/login");
        }
      })
      .catch((error) => {
        console.log("ok");
      })
      .finally(() => setIsLoadingScreen(false));
  }, []);

  if (isLoadingScreen) return <LoadingScreen />;

  return (
    <View className="flex-1 px-10 items-center justify-center">
      <View className="flex items-center ">
        <Image
          source={require("@/assets/images/manage-money-bro.png")}
          className="h-[350px] w-[350px]"
        />
      </View>
      <View className=" flex gap-20 items-center">
        <View className="mt-10 flex items-center gap-3">
          <Text className="text-5xl font-dmBold pb-10">FYNT</Text>
          <Text className="text-4xl font-dmMedium">For Your Net Total</Text>
          <Text className="text-xl font-caveat">
            Take control of your finance ease.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => router.push("/auth/register")}
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
