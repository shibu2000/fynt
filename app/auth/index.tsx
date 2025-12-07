import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const index = () => {
  const [action, setAction] = useState<"login" | "register">("login");

  return (
    <View className="flex-1 px-10">
      <View className="flex-row items-center rounded-full border border-green-600 p-1 w-full max-w-[320px] self-center my-[50px]">
        {/* LOGIN BUTTON */}
        <TouchableOpacity
          onPress={() => setAction("login")}
          className={`flex-1 py-3 rounded-full items-center justify-center ${
            action === "login" ? "bg-green-600" : "bg-transparent"
          }`}
        >
          <Text
            className={`font-dmMedium font-bold text-xl ${
              action === "login" ? "text-white" : "text-black"
            }`}
          >
            Login
          </Text>
        </TouchableOpacity>

        {/* REGISTER BUTTON */}
        <TouchableOpacity
          onPress={() => setAction("register")}
          className={`flex-1 py-3 rounded-full items-center justify-center ${
            action === "register" ? "bg-green-600" : "bg-transparent"
          }`}
        >
          <Text
            className={`font-dmMedium font-bold text-xl ${
              action === "register" ? "text-white" : "text-black"
            }`}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {action == "login" ? <LoginForm /> : <RegisterForm />}

      <View
        style={{
          borderColor: "#d0d0d0",
          marginVertical: 50,
          borderWidth: 1,
        }}
      />

      {/* Social Login */}
      <View className="flex flex-row justify-center gap-5">
        <TouchableOpacity style={style.socialBtn}>
          <AntDesign name="google" size={50} color="#5b5b5b" />
        </TouchableOpacity>
        <TouchableOpacity style={style.socialBtn}>
          <FontAwesome name="facebook" size={50} color="#5b5b5b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  socialBtn: {
    height: 70,
    width: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    boxShadow:
      "0px 4px 8px -2px rgba(9, 30, 66, 0.25), 0px 0px 0px 1px rgba(9, 30, 66, 0.08)",
  },
});

export default index;
