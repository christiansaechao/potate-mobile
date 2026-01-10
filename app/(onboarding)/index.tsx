import { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

// Components
import PotatoSprite from "@/components/potato/PotatoAnimate";

// Libs
import userOps from "@/lib/settings";

import { object, string } from "yup";
import { Formik } from "formik";

const loginSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email address").required("Email is required"),
});

const TOTAL_STEPS = 5;

// How it works steps
const STEPS = [
  {
    number: "1",
    title: "Set your timer",
    description: "Choose how long you want to focus",
    icon: "timer-outline" as const,
  },
  {
    number: "2",
    title: "Stay focused",
    description: "Work on your task without distractions",
    icon: "eye-outline" as const,
  },
  {
    number: "3",
    title: "Watch Potate thrive",
    description: "The more you focus, the happier Potate gets!",
    icon: "heart-outline" as const,
  },
];

export default function Onboarding() {
  // --- State ---

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const formikRef = useRef<any>(null);

  // --- Handlers ---

  const updateUserSettings = async (data: typeof formData) => {
    try {
      await userOps.createUserSettings(data);
      router.replace("/(tabs)");
    } catch (err) {
      console.log("Error submitting form", err);
    }
  };

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    console.log("Notification permission status:", status);
  };

  const nextStep = async () => {
    if (step === 3) {
      formikRef.current?.handleSubmit();
      return;
    }

    if (step === TOTAL_STEPS) {
      await requestNotificationPermission();
      updateUserSettings(formData);
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleFormSubmit = (values: typeof formData) => {
    setFormData(values);
    setStep((prev) => prev + 1);
  };

  // --- Progress Bar ---

  const renderProgressBar = () => {
    const progress = step / TOTAL_STEPS;
    return (
      <View className="flex-row items-center px-4 pt-2 pb-4">
        {step > 1 && (
          <TouchableOpacity onPress={prevStep} className="mr-3">
            <Ionicons name="chevron-back" size={24} color="#3B82F6" />
          </TouchableOpacity>
        )}
        <View className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </View>
      </View>
    );
  };

  // --- Continue Button ---

  const renderContinueButton = (text: string = "Continue") => (
    <View className="px-6 pb-8">
      <TouchableOpacity
        onPress={nextStep}
        className="bg-blue-500 py-4 rounded-full"
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // --- Render ---

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        {renderProgressBar()}

        {/* Step 1: Welcome */}
        {step === 1 && (
          <View className="flex-1 justify-center items-center px-8">
            <View className="mb-8">
              <PotatoSprite />
            </View>
            <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
              Welcome to Potate
            </Text>
            <Text className="text-base text-gray-500 text-center px-4">
              It&apos;s time to regain control of your screen time
            </Text>
          </View>
        )}

        {/* Step 2: Meet Potate */}
        {step === 2 && (
          <View className="flex-1 justify-center items-center px-8">
            <View className="mb-8">
              <PotatoSprite />
            </View>
            <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
              Meet Potate
            </Text>
            <Text className="text-base text-gray-500 text-center px-4">
              The more you focus, the happier your potato gets!
            </Text>
          </View>
        )}

        {/* Step 3: User Input */}
        {step === 3 && (
          <View className="flex-1 px-6">
            <View className="flex-1 justify-center">
              <Text className="text-3xl font-bold text-gray-900 text-center mb-8">
                Let&apos;s get to know you
              </Text>
              <Formik
                innerRef={formikRef}
                initialValues={{ name: formData.name, email: formData.email }}
                onSubmit={handleFormSubmit}
                validationSchema={loginSchema}
                validateOnBlur={true}
                validateOnChange={true}
              >
                {({ handleBlur, values, errors, touched, setFieldValue }) => (
                  <View className="gap-6">
                    <View>
                      <Text className="text-gray-700 font-medium mb-2 ml-1">
                        Name
                      </Text>
                      <TextInput
                        className={`bg-gray-50 rounded-xl border text-gray-900 ${
                          touched.name && errors.name
                            ? "border-red-400"
                            : "border-gray-200"
                        }`}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 16,
                          fontSize: 16,
                          lineHeight: 24,
                        }}
                        placeholder="What should Potate call you?"
                        value={values.name}
                        onChangeText={(text) => setFieldValue("name", text)}
                        onBlur={handleBlur("name")}
                        placeholderTextColor="#9CA3AF"
                      />
                      {touched.name && errors.name && (
                        <Text className="text-red-500 text-sm mt-1 ml-1">
                          {errors.name}
                        </Text>
                      )}
                    </View>

                    <View>
                      <Text className="text-gray-700 font-medium mb-2 ml-1">
                        Email
                      </Text>
                      <TextInput
                        className={`bg-gray-50 rounded-xl border text-gray-900 ${
                          touched.email && errors.email
                            ? "border-red-400"
                            : "border-gray-200"
                        }`}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 16,
                          fontSize: 16,
                          lineHeight: 24,
                        }}
                        placeholder="your@email.com"
                        value={values.email}
                        onChangeText={(text) => setFieldValue("email", text)}
                        onBlur={handleBlur("email")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#9CA3AF"
                      />
                      {touched.email && errors.email && (
                        <Text className="text-red-500 text-sm mt-1 ml-1">
                          {errors.email}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        )}

        {/* Step 4: How It Works */}
        {step === 4 && (
          <View className="flex-1 px-6">
            <View className="flex-1 justify-center">
              <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
                Hey {formData.name}!
              </Text>
              <Text className="text-base text-gray-400 text-center mb-10">
                Here&apos;s how we&apos;ll work together
              </Text>
              <View className="gap-6">
                {STEPS.map((item, index) => (
                  <View key={index} className="flex-row items-center">
                    <View className="w-14 h-14 bg-orange-100 rounded-2xl items-center justify-center mr-4">
                      <Ionicons name={item.icon} size={28} color="#F97316" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </Text>
                      <Text className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Step 5: Notifications */}
        {step === 5 && (
          <View className="flex-1 justify-center items-center px-6">
            <Text className="text-3xl font-bold text-gray-900 text-center mb-8">
              One last thing, {formData.name}!
            </Text>
            <View className="bg-gray-50 p-6 rounded-2xl border border-gray-200 w-full max-w-sm mb-6">
              <Text className="text-lg font-semibold text-gray-900 text-center mb-2">
                &quot;Potate&quot; Would Like to Send You Notifications
              </Text>
              <Text className="text-sm text-gray-500 text-center">
                Notifications help remind you to take breaks and celebrate your
                focus achievements.
              </Text>
            </View>
            <View className="items-center mb-4">
              <Ionicons name="arrow-up" size={24} color="#9CA3AF" />
              <Text className="text-gray-400 mt-1">Tap Allow</Text>
            </View>
            <View className="mt-4">
              <PotatoSprite />
            </View>
          </View>
        )}

        {renderContinueButton(step === TOTAL_STEPS ? "Let's Go!" : "Continue")}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
