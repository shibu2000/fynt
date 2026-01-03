import { useTransaction } from "@/providers/TransactionProviders";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "../toast";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { deleteAllTransaction } = useTransaction();

  const navigate = (path: string) => {
    // @ts-ignore
    router.push(path);
    props.navigation.closeDrawer();
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("lastLoginTime");
    router.replace("/auth/login");
    props.navigation.closeDrawer();
  };

  const handleRemoveAllData = async () => {
    Alert.alert(
      "Remove All Data",
      "Are you sure you want to remove all data?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => {
            deleteAllTransaction()
              .then(() => {
                router.replace("/auth/login");
                props.navigation.closeDrawer();
              })
              .catch((error) => {
                toast.error(error.message);
              });
          },
        },
      ]
    );
  };

  return (
    <>
      {/* STATUS BAR */}
      <StatusBar style="light" translucent />

      {/* FULL SCREEN GRADIENT */}
      <LinearGradient
        colors={["#1F5B4B", "#2F7A52", "#569138"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        {/* SAFE AREA INSIDE GRADIENT */}
        <SafeAreaView style={{ flex: 1 }}>
          {/* SCROLLABLE CONTENT */}
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {/* HEADER */}
            <View
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Image
                source={require("@/assets/images/logo.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: "#fff",
                  }}
                >
                  FYNT
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    marginTop: 4,
                  }}
                >
                  For Your Net Total
                </Text>
              </View>
            </View>

            {/* NAV ITEMS */}
            <DrawerItem
              label="Home"
              onPress={() => navigate("/(drawer)/home")}
              icon={FontAwesome}
              iconName="home"
              isActive={pathname === "/home"}
            />
            <DrawerItem
              label="Transactions"
              onPress={() => navigate("/(drawer)/home/transaction")}
              icon={MaterialIcons}
              iconName="manage-history"
              isActive={pathname === "/home/transaction"}
            />
            <DrawerItem
              label="Settings"
              //   onPress={() => navigate("/(drawer)/settings")}
              icon={FontAwesome}
              iconName="cog"
              isActive={pathname === "/home/settings"}
            />
            <DrawerItem
              label="Change Password"
              onPress={() => navigate("/(drawer)/settings/change-password")}
              icon={MaterialIcons}
              iconName="lock-reset"
              isActive={pathname.includes("change-password")}
            />
          </DrawerContentScrollView>

          {/* FOOTER (bottom safe area fixed) */}
          <View
            style={{
              height: 1,
              backgroundColor: "rgba(255,255,255,0.15)",
              marginHorizontal: 16,
              marginBottom: 12,
            }}
          />
          {/* FOOTER ACTIONS */}
          <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
            {/* REMOVE ALL DATA */}
            <Pressable
              onPress={handleRemoveAllData}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,

                paddingVertical: 14,
                borderRadius: 14,
                marginBottom: 12,

                backgroundColor: "rgba(239, 68, 68, 0.14)",
                borderWidth: 1,
                borderColor: "rgba(239, 68, 68, 0.4)",
              }}
            >
              <FontAwesome name="trash" size={18} color="#FCA5A5" />
              <Text
                style={{
                  color: "#FCA5A5",
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                Remove All Data
              </Text>
            </Pressable>

            {/* LOGOUT */}
            <Pressable
              onPress={handleLogout}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,

                paddingVertical: 14,
                borderRadius: 14,

                backgroundColor: "rgba(255,255,255,0.12)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.25)",
              }}
            >
              <FontAwesome name="sign-out" size={20} color="#FFFFFF" />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                Logout
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

function DrawerItem({
  label,
  onPress = () => {},
  icon: Icon,
  iconName,
  isActive,
}: {
  label: string;
  onPress?: () => void;
  icon: React.ComponentType<any>;
  iconName: string;
  isActive?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 14,
        paddingHorizontal: 24,
        backgroundColor: isActive ? "rgba(255,255,255,0.12)" : "transparent",
        borderRadius: 10,
        marginHorizontal: 12,
        marginBottom: 6,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Icon name={iconName} size={24} color={isActive ? "#A8F0C6" : "white"} />
      <Text style={{ color: "#fff", fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}
