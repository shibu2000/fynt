import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <StatusBar style="light" />
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Login",
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#1F5B4B",
          },
        }}
      />
    </Stack>
  );
}
