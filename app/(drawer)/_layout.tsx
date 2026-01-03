import CustomDrawerContent from "@/components/home/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false, // IMPORTANT
          swipeEnabled: true, // drawer opens ONLY via button
          drawerStyle: {
            width: "80%",
          },
        }}
      />
    </GestureHandlerRootView>
  );
}
