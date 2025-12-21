import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  subtitle?: string;
}

export default function DeleteModal({
  visible,
  onClose,
  onConfirm,
  title,
  subtitle,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Background Overlay */}
      <View style={styles.overlay}>
        {/* Modal Card */}
        <View style={styles.card}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <MaterialIcons name="delete-forever" size={40} color="#dc2626" />
          </View>

          {/* Title */}
          <Text style={styles.title}>{title || "Delete Transaction?"}</Text>

          {/* Description */}
          <Text style={styles.subtitle}>
            {subtitle ||
              "This action cannot be undone. Are you sure you want to delete this transaction?"}
          </Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: "#fee2e2",
    padding: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 5,
    color: "#111",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    marginRight: 10,
  },
  cancelText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#444",
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#dc2626",
    marginLeft: 10,
  },
  deleteText: {
    textAlign: "center",
    fontWeight: "600",
    color: "white",
  },
});
