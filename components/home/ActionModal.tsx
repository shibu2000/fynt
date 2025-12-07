import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ActionModal = ({
  modalVisibility,
  handleCloseModal,
}: {
  modalVisibility: boolean;
  handleCloseModal: () => void;
}) => {
  const router = useRouter();
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

  const navigate = (name: "add-expanse" | "add-income") => {
    handleCloseModal();
    router.push(`/home/${name}`);
  };

  return (
    <Modal visible={modalVisibility} transparent animationType="none">
      {/* Backdrop */}
      <Pressable
        onPress={() => {
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
        }}
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
      >
        <View className="flex items-center">
          <AntDesign name="line" size={40} color="grey" />
        </View>

        <View className="flex justify-center gap-5 p-5">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigate("add-income")}
          >
            <View
              style={styles.shadowBox}
              className="flex flex-row items-center gap-5 bg-white rounded-xl p-3 px-5 w-full"
            >
              <FontAwesome name="arrow-circle-up" size={50} color="green" />
              <Text className="text-3xl font-dmMedium">Add Income</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigate("add-expanse")}
          >
            <View
              style={styles.shadowBox}
              className="flex flex-row items-center gap-5 bg-white rounded-xl p-3 px-5 w-full"
            >
              <FontAwesome name="arrow-circle-down" size={50} color="red" />
              <Text className="text-3xl font-dmMedium">Add Expense</Text>
            </View>
          </TouchableOpacity>
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

export default ActionModal;
