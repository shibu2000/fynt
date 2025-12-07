import { parseDateTime } from "@/utils/parseDateTime";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

const getIcon = (name: string) => {
  switch (name) {
    case "food":
      return <Ionicons name="fast-food" size={25} color="green" />;
    case "transport":
      return <FontAwesome name="car" size={25} color="orange" />;
    case "tenities":
      return <FontAwesome5 name="gas-pump" size={25} color="blue" />;
    case "utilities":
      return <FontAwesome6 name="bucket" size={25} color="purple" />;
    case "entertainment":
      return <Ionicons name="film-outline" size={25} color="red" />;
    default:
      return <Ionicons name="options-outline" size={25} color="#6b7280" />;
  }
};

const TransactionItem = ({
  item,
}: {
  item: {
    title: string;
    category: string;
    amount: number;
    date: string;
    time: string;
    type: string;
  };
}) => {
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
        <View style={style.transactionIcon}>{getIcon(item.category)}</View>
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
          {item.type == "expense" ? "-" : "+"}${item.amount}
        </Text>
        <Text style={{ textAlign: "right" }} className="font-dm">
          {parseDateTime(item.date, item.time).toLocaleString("default", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
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
