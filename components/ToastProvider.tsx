import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { registerToast } from "./toast";

type ToastType = "success" | "error" | "info";

type ToastOptions = {
  message: string;
  type?: ToastType;
  duration?: number;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("success");
  const anim = useRef(new Animated.Value(0)).current;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = ({
    message,
    type = "success",
    duration = 2200,
  }: ToastOptions) => {
    // Clear old timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setMessage(message);
    setType(type);
    setVisible(true);

    // Slide-in animation
    Animated.timing(anim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();

    timeoutRef.current = setTimeout(() => {
      hideToast();
    }, duration);
  };

  const hideToast = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  // Register the toast globally
  useEffect(() => {
    registerToast(showToast);
  }, []);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 0],
  });

  return (
    <>
      {children}

      {visible && (
        <View pointerEvents="box-none" style={styles.container}>
          <TouchableWithoutFeedback onPress={hideToast}>
            <Animated.View
              style={[
                styles.toast,
                {
                  opacity: anim,
                  transform: [{ translateY }],
                  backgroundColor:
                    type === "success"
                      ? "#16A34A"
                      : type === "error"
                        ? "#EF4444"
                        : "#374151",
                },
              ]}
            >
              <Text style={styles.message}>{message}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "android" ? 60 : 60,
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: "center",
  },
  toast: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  message: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
