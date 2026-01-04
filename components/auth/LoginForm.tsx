import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface LoginFormType {
  email: string;
  password: string;
  remember_me: boolean;
}

const LoginForm = () => {
  const router = useRouter();
  const { control, handleSubmit, watch } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  // const values = watch();

  const onSubmit = (value: LoginFormType) => {};

  return (
    <View style={style.container}>
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Email"
            style={{
              borderColor: "green",
              borderWidth: 1,
              color: "#111827",
            }}
            className="rounded-full p-5 bg-white"
            value={value}
            onChangeText={onChange}
            placeholderTextColor="#9CA3AF"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            style={{
              borderColor: "green",
              borderWidth: 1,
              color: "#111827",
            }}
            placeholder="Password"
            className="rounded-full p-5 bg-white"
            value={value}
            onChangeText={onChange}
            placeholderTextColor="#9CA3AF"
          />
        )}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <View className="flex flex-row items-center">
          <Controller
            name="remember_me"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                value={value}
                onValueChange={onChange}
                style={{ width: 18, height: 18, marginRight: 5 }}
                color={value ? "#16a34a" : undefined}
              />
            )}
          />
          <Text className="text-xl">Remember me</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-xl text-green-700">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* <Text>{JSON.stringify(values)}</Text> */}

      <View className="px-10 mt-10">
        <TouchableOpacity
          onPressIn={() => router.push("/home")}
          className="rounded-full bg-green-600"
          style={{
            paddingVertical: 15,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-dmMedium font-bold text-xl text-white text-center">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    gap: 30,
    marginTop: 50,
  },
});

export default LoginForm;
