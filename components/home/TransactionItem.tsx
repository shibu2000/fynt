import { TransactionType } from "@/type/transaction.type";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

interface PropsType {
  item: TransactionType;
}

const CategoryIcons: Record<string, any> = {
  food: <Ionicons name="fast-food" size={25} color="green" />,
  transport: <FontAwesome name="car" size={25} color="orange" />,
  tenities: <FontAwesome5 name="gas-pump" size={25} color="blue" />,
  utilities: <FontAwesome6 name="bucket" size={25} color="purple" />,
  entertainment: <Ionicons name="film-outline" size={25} color="red" />,

  salary: <MaterialCommunityIcons name="briefcase" size={28} color="#2E7D32" />,
  freelance: <MaterialIcons name="computer" size={28} color="#0277BD" />,
  gift: <Ionicons name="gift" size={28} color="#C62828" />,
  investment: (
    <MaterialCommunityIcons name="trending-up" size={28} color="#6A1B9A" />
  ),
  other: <MaterialIcons name="category" size={28} color="#455A64" />,
};

const TransactionItem = ({ item }: PropsType) => {
  return (
    <View
      className="rounded-lg"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        marginTop: 10,
      }}
    >
      <View className="flex flex-row justify-center gap-5">
        <View style={style.transactionIcon}>
          {CategoryIcons[item.category.toLowerCase()]}
        </View>
        <View>
          <Text className="font-dmBold text-xl">{item.title}</Text>
          <Text
            className="font-dm"
            style={{
              textTransform: "capitalize",
            }}
          >
            {item.category}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            textAlign: "right",
            color: item.type == "expense" ? "#dc2626" : "#16a34a",
          }}
          className={`font-dmBold text-xl`}
        >
          {item.type == "expense" ? "- " : "+ "}
          <FontAwesome
            name="inr"
            size={15}
            color={item.type == "expense" ? "#dc2626" : "#16a34a"}
          />
          {item.amount}
        </Text>
        <Text style={{ textAlign: "right" }} className="font-dm">
          {new Date(item.datetime).toLocaleDateString()}
          {/* {parseDateTime(item.date, item.time).toLocaleString("default", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })} */}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  transactionIcon: {
    padding: 8,
    borderRadius: "50%",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    boxShadow:
      "0px 4px 8px -2px rgba(9, 30, 66, 0.25), 0px 0px 0px 1px rgba(9, 30, 66, 0.08)",
  },
});

export default TransactionItem;
