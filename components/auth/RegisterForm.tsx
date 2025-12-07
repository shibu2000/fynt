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
  name: string;
  email: string;
  password: string;
  remember_me: boolean;
}

const LoginForm = () => {
  const { control, handleSubmit, watch } = useForm<LoginFormType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // const values = watch();

  const onSubmit = (value: LoginFormType) => {};

  return (
    <View style={style.container}>
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Name"
            style={{
              borderColor: "green",
              borderWidth: 1,
            }}
            className="rounded-full p-5 bg-white"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Email"
            style={{
              borderColor: "green",
              borderWidth: 1,
            }}
            className="rounded-full p-5 bg-white"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Password"
            style={{
              borderColor: "green",
              borderWidth: 1,
            }}
            className="rounded-full p-5 bg-white"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* <Text>{JSON.stringify(values)}</Text> */}

      <View className="px-10 mt-10">
        <TouchableOpacity
          className="rounded-full bg-green-600"
          style={{
            paddingVertical: 15,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-dmMedium font-bold text-xl text-white text-center">
            Register
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            marginTop: 5,
            textAlign: "center",
            color: "gray",
          }}
        >
          or login with
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    gap: 20,
  },
});

export default LoginForm;
