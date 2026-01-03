import { toast } from "@/components/toast";
import { useAuth } from "@/providers/AuthProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await login(password);
      router.replace("/home");
    } catch (error) {
      toast.error("Invalid password");
    }
  };
  return (
    <View className="flex-1 px-10">
      <View className="flex justify-center items-center">
        <Image
          source={require("@/assets/images/security.png")}
          alt="security screen"
          className="h-[350px] w-[350px] mt-10"
        />
      </View>
      <View className="mt-10 rounded-full relative">
        <TextInput
          secureTextEntry={!showPassword}
          style={{
            borderColor: "green",
            borderWidth: 1,
          }}
          placeholder="Password"
          className="rounded-full p-5 bg-white text-center"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#9CA3AF"
        />
        <AntDesign
          name={showPassword ? "eye" : "eye-invisible"}
          size={24}
          color="#1F5B4B"
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: [{ translateY: -12 }],
          }}
          onPress={() => setShowPassword((prev) => !prev)}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity>
          <Text className="text-xl text-green-700">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={["#1F5B4B", "#569138"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-[200px] self-center rounded-full"
        style={{
          borderRadius: 30,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPressIn={() => {}}
          style={{
            paddingVertical: 15,
          }}
          onPress={handleSubmit}
        >
          <Text className="font-dmMedium font-bold text-xl text-white text-center">
            Login
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Login;
