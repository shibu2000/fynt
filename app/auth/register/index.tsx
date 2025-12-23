import { toast } from "@/components/toast";
import { useAuth } from "@/providers/AuthProvider";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface RegisterFormType {
  name: string;
  email: string;
  password: string;
}

/* -------------------- Reusable Input -------------------- */
interface FormInputProps {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
}

const FormInput = ({
  placeholder,
  value,
  onChange,
  error,
  secureTextEntry,
  keyboardType = "default",
}: FormInputProps) => {
  return (
    <View style={{ gap: 6 }}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        style={[styles.input, error ? styles.inputError : styles.inputNormal]}
        value={value}
        onChangeText={onChange}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

/* -------------------- Main Form -------------------- */
const RegisterForm = () => {
  const { register } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await register(data);
      toast.success("Register successfully");
      router.replace("/auth/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Image */}
            <View className="flex justify-center items-center">
              <Image
                source={require("@/assets/images/security.png")}
                style={{ height: 300, width: 300 }}
                resizeMode="contain"
              />
            </View>

            {/* Name */}
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  placeholder="Name"
                  value={value || ""}
                  onChange={onChange}
                  error={errors.name?.message}
                />
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  placeholder="Email"
                  keyboardType="email-address"
                  value={value || ""}
                  onChange={onChange}
                  error={errors.email?.message}
                />
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[^\s]+$/,
                  message:
                    "Password must contain letters, numbers, and may include special characters (no spaces)",
                },
              }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  placeholder="Password"
                  secureTextEntry
                  value={value || ""}
                  onChange={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            {/* Submit */}
            <LinearGradient
              colors={["#1F5B4B", "#569138"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    backgroundColor: "#F9FAFB",
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  inputNormal: {
    borderColor: "#D1D5DB", // gray-300
  },
  inputError: {
    borderColor: "#EF4444", // red-500
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginLeft: 12,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 999,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default RegisterForm;
