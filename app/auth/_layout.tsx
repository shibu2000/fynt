import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Join/Login",
        headerBackVisible: false,
        headerTitleAlign: "center",
      }}
    />
  );
}
