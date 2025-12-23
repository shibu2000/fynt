import { Stack } from "expo-router";

export default function AuthLayout() {
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
          headerTitle: "Register",
          headerBackVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
