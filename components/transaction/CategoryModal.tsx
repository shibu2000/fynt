import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Categories = [
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

const CategoryModal = ({
  modalVisibility,
  handleCloseModal,
  selectedCategory,
  setSelectedCategory,
  handleCategoryFilter,
}: {
  modalVisibility: boolean;
  handleCloseModal: () => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  handleCategoryFilter: (category: string) => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // backdrop opacity
  const slideAnim = useRef(new Animated.Value(300)).current; // modal slide

  // Run animation when modal opens or closes
  useEffect(() => {
    if (modalVisibility) {
      // OPEN animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // CLOSE animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // run only after animation ends
        handleCloseModal();
      });
    }
  }, [modalVisibility]);

  const handleAnimatedClosing = () => {
    // play closing animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => handleCloseModal());
  };

  return (
    <Modal visible={modalVisibility} animationType="none" transparent>
      {/* Backdrop */}
      <Pressable
        onPress={handleAnimatedClosing}
        style={StyleSheet.absoluteFill}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.5)",
              opacity: fadeAnim,
            },
          ]}
        />
      </Pressable>

      {/* Modal Sheet */}
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
        className="h-2/3"
      >
        <View className="flex items-center">
          <AntDesign
            name="line"
            size={40}
            color="grey"
            onPress={handleAnimatedClosing}
          />
        </View>

        <View className="flex-row items-center justify-center border-b px-5 pb-5">
          <Text className="text-2xl font-dmBold text-center">
            Select Category
          </Text>
        </View>

        <View className="justify-center gap-5 px-5">
          <ScrollView
            // className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 12,
              gap: 12,
              paddingBottom: 40, // safe bottom spacing
            }}
          >
            {Categories.map((category) => (
              <Pressable
                onPress={() => handleCategoryFilter(category.name)}
                key={category.name}
                className="flex-row justify-between items-center gap-3"
              >
                <View className="p-4 rounded-full bg-[#1F5B4B]/20">
                  {category.icon}
                </View>
                <View className="flex-row items-center justify-between gap-3 flex-grow border-b border-[#C7DED9] h-full">
                  <Text className="text-xl font-semibold">{category.name}</Text>
                  {selectedCategory === category.name && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#1F5B4B"
                    />
                  )}
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#EFEFEF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 30,
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
});

export default CategoryModal;
