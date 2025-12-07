import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      // hide the parent stack header so nested layouts can take over
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* explicitly show header only for the home index screen */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "HOME",
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
