import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";

export const SettingsForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <View>
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text>Email is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
