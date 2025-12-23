import { AuthProvider } from "@/providers/AuthProvider";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: true, headerTitle: "Join/Login" }}
        />
      </Stack>
    </AuthProvider>
  );
}
