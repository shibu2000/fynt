import { toast } from "@/components/toast";
import { useTransaction } from "@/providers/TransactionProviders";
import { TransactionType } from "@/type/transaction.type";
import {
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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

const IncomeCategories = [
  {
    icon: <MaterialCommunityIcons name="briefcase" size={28} color="#2E7D32" />,
    name: "Salary",
  },
  {
    icon: <MaterialIcons name="computer" size={28} color="#0277BD" />,
    name: "Freelance",
  },
  {
    icon: <Ionicons name="gift" size={28} color="#C62828" />,
    name: "Gift",
  },
  {
    icon: (
      <MaterialCommunityIcons name="trending-up" size={28} color="#6A1B9A" />
    ),
    name: "Investment",
  },
  {
    icon: <MaterialIcons name="category" size={28} color="#455A64" />,
    name: "Other",
  },
];

const ExpenseCategories = [
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
];

export default function AddTransaction() {
  const { type, id } = useLocalSearchParams<{
    type: "income" | "expense";
    id: string;
  }>();
  const router = useRouter();
  const [openPicker, setOpenPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addTransaction, fetchTransactionById, updateTransaction } =
    useTransaction();

  const Categories = type === "income" ? IncomeCategories : ExpenseCategories;
  const defaultValues = {
    title: "",
    description: "",
    amount: "",
    category: type === "income" ? "Salary" : "Food",
    datetime: new Date(),
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<TransactionType>({
    defaultValues,
  });

  const selectedCategory = watch("category");
  const dateValue = watch("datetime");

  const onSubmit = async (data: TransactionType) => {
    const finalData = {
      title: data.title,
      description: data.description,
      category: data.category,
      amount: data.amount,
      datetime: data.datetime,
      type: type,
    };

    try {
      setIsLoading(true);
      await addTransaction(finalData);
      reset();
      toast.success("Transaction added successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdate = async (data: any) => {
    try {
      await updateTransaction(data);
      toast.success("Transaction saved");
      router.replace(`/home/transaction/${id}`);
    } catch (error) {
      toast.error("Somethign went wrong, try again!");
    }
  };

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const transaction = await fetchTransactionById(Number(id));
        if (!transaction) return;
        reset({
          ...transaction,
          amount: transaction.amount.toString(),
          datetime: new Date(transaction.datetime),
        });
      } catch (error) {
        toast.error("Something went wrong, try again!");
      }
    })();
  }, [id]);

  return (
    <View className="flex-1 px-5">
      {/* Amount Input */}
      <LinearGradient
        colors={
          type === "income" ? ["#1F5B4B", "#569138"] : ["#569138", "#1F5B4B"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.amountCard}
      >
        <FontAwesome name="inr" size={45} color="white" />

        <Controller
          control={control}
          name="amount"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              placeholder="Enter amount"
              value={value}
              onChangeText={onChange}
              keyboardType="number-pad"
              className="bg-white px-4 py-2 rounded-xl text-2xl font-dmMedium flex-1"
            />
          )}
        />
      </LinearGradient>

      {/* Title & Description */}
      <View className="mt-5">
        <Controller
          control={control}
          name="title"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              multiline
              placeholder="Enter title"
              value={value}
              onChangeText={onChange}
              className="bg-white px-4 py-4 rounded-xl text-xl font-dmMedium mb-4"
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <TextInput
              multiline
              placeholder="Enter description"
              value={value}
              onChangeText={onChange}
              className="bg-white px-4 py-4 rounded-xl text-xl font-dmMedium h-[100px]"
            />
          )}
        />
      </View>

      {/* CATEGORY */}
      <View className="mt-5">
        <Text className="font-dmBold text-2xl mb-4">Category</Text>

        <View className="bg-white p-5 rounded-lg">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex flex-row gap-5">
              {Categories.map(({ icon, name }) => (
                <Pressable
                  key={name}
                  onPress={() => setValue("category", name)}
                  className="flex items-center"
                >
                  <View
                    className="flex items-center justify-center rounded-full h-[60px] w-[60px] p-2"
                    style={{
                      backgroundColor:
                        selectedCategory === name ? "#E8F5E9" : "#EDEDED",
                      borderWidth: selectedCategory === name ? 1 : 0,
                      borderColor: "#16a34a",
                    }}
                  >
                    {icon}
                  </View>
                  <Text className="font-dm">{name}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* DATE TIME PICKER */}
      <Pressable
        onPress={() => setOpenPicker(true)}
        className="bg-white mt-5 p-5 flex flex-row justify-between rounded-xl"
      >
        <Text className="font-dmBold text-2xl">
          Date: {dateValue ? dateValue.toLocaleDateString() : ""}
        </Text>
        <Fontisto name="date" size={30} color="black" />
      </Pressable>

      <DateTimePickerModal
        isVisible={openPicker}
        mode="datetime"
        date={dateValue}
        onConfirm={(date) => {
          setValue("datetime", date);
          setOpenPicker(false);
        }}
        onCancel={() => setOpenPicker(false)}
      />

      {/* SUBMIT BUTTON */}
      {id ? (
        <TouchableOpacity
          className="absolute bottom-10 left-5 right-5 rounded-xl"
          onPress={handleSubmit(onUpdate)}
          disabled={isLoading}
        >
          <LinearGradient
            colors={
              type === "income"
                ? ["#1F5B4B", "#569138"]
                : ["#569138", "#1F5B4B"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 20,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="font-dmBold text-2xl text-white text-center">
              {isLoading ? "Updating..." : `Update`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="absolute bottom-10 left-5 right-5 rounded-xl"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              type === "income"
                ? ["#1F5B4B", "#569138"]
                : ["#569138", "#1F5B4B"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 20,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="font-dmBold text-2xl text-white text-center">
              {isLoading ? "Saving..." : `Save ${type}`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  amountCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
    marginTop: 20,

    // Shadow (optional)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
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
