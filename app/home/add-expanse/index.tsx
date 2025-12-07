import {
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ExpanseCategories = [
  {
    icon: <Ionicons name="fast-food" size={25} color="green" />,
    name: "Food",
  },
  {
    icon: <FontAwesome name="car" size={25} color="orange" />,
    name: "Transport",
  },
  {
    icon: <FontAwesome5 name="gas-pump" size={25} color="blue" />,
    name: "Tenities",
  },
  {
    icon: <FontAwesome6 name="bucket" size={25} color="purple" />,
    name: "Utilities",
  },
  {
    icon: <Ionicons name="film-outline" size={25} color="red" />,
    name: "Entertainment",
  },
  {
    icon: <MaterialIcons name="category" size={28} color="#455A64" />,
    name: "Other",
  },
];

const AddIncome = () => {
  const [selectedCategory, setSelectedCategory] = useState("Salary");
  const [datetime, setDateTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View className="flex-1 px-5">
      <View style={style.addIncomeBox}>
        <FontAwesome name="inr" size={45} color="white" />
        <TextInput
          style={{ ...style.inputField, ...style.shadowBox }}
          className="rounded-xl font-dmMedium text-2xl"
          placeholder="Enter amount"
          inputMode="numeric"
          keyboardType="number-pad"
        />
      </View>
      <View style={style.otherFieldView}>
        <TextInput
          multiline
          style={{ ...style.otherField, ...style.shadowBox }}
          className="rounded-xl font-dmMedium text-xl mb-5 py-5"
          placeholder="Enter title"
          inputMode="text"
          keyboardType="default"
        />
        <TextInput
          multiline
          style={{ ...style.otherField, height: 100, ...style.shadowBox }}
          className="rounded-xl font-dmMedium text-xl"
          placeholder="Enter description"
          inputMode="text"
          keyboardType="default"
        />
      </View>
      <View style={{ ...style.categoryView }}>
        <Text className="font-dmBold text-2xl mb-5">Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="bg-white p-3 rounded-xl"
          contentContainerStyle={{
            paddingRight: 20,
          }}
        >
          <View className="flex flex-row gap-5">
            {ExpanseCategories.map(({ icon, name }, index) => (
              <Pressable
                onPress={() => setSelectedCategory(name)}
                key={index}
                className="flex items-center"
              >
                <View
                  style={[
                    style.iconShadow,
                    selectedCategory == name
                      ? {
                          borderColor: "#16a34a",
                          borderWidth: 1,
                          backgroundColor: "#E8F5E9",
                        }
                      : {
                          backgroundColor: "#EDEDED",
                          // borderColor: "white",
                          borderWidth: 0,
                        },
                  ]}
                  className="flex items-center justify-center gap-2 p-2 rounded-full h-[60px] w-[60px]"
                >
                  {icon}
                </View>
                <Text className="font-dm">{name}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
      <Pressable
        onPress={() => setOpen(true)}
        className="bg-white mt-5 p-5 flex flex-row justify-between rounded-xl"
      >
        <Text className="font-dmBold text-2xl">Date</Text>
        <Fontisto name="date" size={30} color="black" />
      </Pressable>

      <TouchableOpacity className="bg-[#15803D] p-5 absolute bottom-5 left-5 right-5 rounded-xl">
        <Text className="font-dmBold text-2xl text-white text-center">
          Save Income
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={open}
        mode="datetime"
        onConfirm={(selected) => {
          setOpen(false);
          setDateTime(selected);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

const style = StyleSheet.create({
  addIncomeBox: {
    height: "20%",
    width: "100%",
    backgroundColor: "#16a34a",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  inputField: {
    width: "75%",
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
  },
  otherFieldView: {
    // padding: 10,
    marginTop: 10,
  },
  otherField: {
    backgroundColor: "#fff",
    padding: 10,
  },
  categoryView: {
    marginTop: 20,
  },
  shadowBox: {
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    // Android shadow
    elevation: 6,
  },
  iconShadow: {
    backgroundColor: "#EDEDED",

    // Soft spread shadow (equivalent to: 0px 4px 8px -2px rgba(9, 30, 66, 0.25))
    shadowColor: "rgba(9, 30, 66, 0.50)", // darker but softened by opacity below
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6, // spreading but soft

    // Android
    elevation: 5,
  },
});

export default AddIncome;
