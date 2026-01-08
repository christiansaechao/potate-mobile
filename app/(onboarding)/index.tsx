import { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

// Components
import { Confetti } from "@/components/potato/Confetti";
import PotatoSprite from "@/components/potato/PotatoAnimate";

// Hooks
import { useConfetti } from "@/hooks/useConfetti";

// Libs
import userOps from "@/lib/settings";

import { object, string } from "yup";
import { Formik } from "formik";

const loginSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email address").required("Email is required"),
});

export default function Onboarding() {
  // --- State ---

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const formikRef = useRef<any>(null);

  // --- Hooks ---

  const { showConfetti, triggerConfetti } = useConfetti();

  // --- Handlers ---

  const updateUserSettings = async (data: typeof formData) => {
    try {
      await userOps.createUserSettings(data);

      router.replace("/(tabs)");
    } catch (err) {
      console.log("Error submiting form", err);
    }
  };

  const nextStep = () => {
    if (step === 3) {
      formikRef.current?.handleSubmit();
      return;
    }

    if (step === 4) {
      triggerConfetti();
    }

    setStep((prev) => prev + 1);
  };

  const handleFormSubmit = (values: typeof formData) => {
    setFormData(values);
    setStep((prev) => prev + 1);
  };

  // --- Render ---

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-orange-50 justify-center px-6">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {/* Step 1: Welcome */}
          {step === 1 && (
            <View className="items-center space-y-4">
              <Text className="text-4xl font-bold text-orange-900 text-center">
                Welcome to Potate
              </Text>
              <Text className="text-lg text-orange-700 text-center">
                Your little friend to keep you on track with your tasks.
              </Text>
            </View>
          )}

          {/* Step 2: Meet Potate */}
          {step === 2 && (
            <View className="flex gap-4 items-center space-y-6">
              <Text className="text-3xl font-bold text-orange-900 text-center">
                Meet Potate
              </Text>
              <View className="h-60 w-60 bg-orange-200 rounded-full items-center justify-center border-4 border-orange-300">
                <PotatoSprite />
              </View>
              <Text className="text-xl font-bold text-red-500 text-center ">
                Stay on task… Potate believes in you!
              </Text>
            </View>
          )}

          {/* Step 3: User Input */}
          {step === 3 && (
            <View className="space-y-6">
              <Text className="text-2xl font-bold text-orange-900 text-center mb-4">
                Let&apos;s get to know you
              </Text>
              <Formik
                innerRef={formikRef}
                initialValues={{ name: formData.name, email: formData.email }} // Initialize with current state if user goes back
                onSubmit={handleFormSubmit}
                validationSchema={loginSchema}
                validateOnBlur={true}
                validateOnChange={true}
              >
                {({
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <>
                    <View className="space-y-2">
                      <Text className="text-orange-800 font-medium ml-1">
                        Name
                      </Text>
                      <TextInput
                        className={`bg-white p-4 rounded-xl border-2 text-lg text-orange-900 ${
                          touched.name && errors.name
                            ? "border-red-500"
                            : "border-orange-100"
                        }`}
                        placeholder="What should Potate call you?"
                        value={values.name}
                        onChangeText={(text) => setFieldValue("name", text)}
                        onBlur={handleBlur("name")}
                        placeholderTextColor="#fdba74"
                      />
                      {touched.name && errors.name && (
                        <Text className="text-red-500 text-sm ml-1">
                          {errors.name}
                        </Text>
                      )}
                    </View>

                    <View className="space-y-2">
                      <Text className="text-orange-800 font-medium ml-1">
                        Email
                      </Text>
                      <TextInput
                        className={`bg-white p-4 rounded-xl border-2 text-lg text-orange-900 ${
                          touched.email && errors.email
                            ? "border-red-500"
                            : "border-orange-100"
                        }`}
                        placeholder="your@email.com"
                        value={values.email}
                        onChangeText={(text) => setFieldValue("email", text)}
                        onBlur={handleBlur("email")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#fdba74"
                      />
                      {touched.email && errors.email && (
                        <Text className="text-red-500 text-sm ml-1">
                          {errors.email}
                        </Text>
                      )}
                    </View>
                  </>
                )}
              </Formik>
            </View>
          )}

          {/* Navigation Button */}
          {step < 4 && (
            <TouchableOpacity
              onPress={nextStep}
              className="mt-12 bg-orange-500 py-4 px-8 rounded-full shadow-lg active:bg-orange-600"
            >
              <Text className="text-white text-center font-bold text-lg">
                {step === 4 ? "Finish Setup" : "Continue"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Step 4: Completion */}
          {step === 4 && (
            <View className="items-center space-y-6">
              <Text className="text-6xl">🎉</Text>
              <Text className="text-3xl font-bold text-orange-900 text-center">
                Congrats!
              </Text>
              <Text className="text-lg text-orange-700 text-center px-4">
                You&apos;re all set up. Time to lock in!
              </Text>

              <TouchableOpacity
                className="mt-12 bg-green-500 py-4 px-8 rounded-full shadow-lg active:bg-green-600 w-full"
                onPress={() => {
                  updateUserSettings(formData);
                }}
              >
                <Text className="text-white text-center font-bold text-lg">
                  Let&apos;s Go!
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        {showConfetti && <Confetti show={showConfetti} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
