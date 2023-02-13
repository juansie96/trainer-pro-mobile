import { useState } from "react";
import { Button, Input, Text } from "@rneui/base";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { mapFirebaseErrorCodeToMsg } from "../../utils";

interface LoginForm {
  email: string;
  password: string;
}
const Login = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginError, setLoginError] = useState("");

  const onSubmit: SubmitHandler<LoginForm> = async ({
    email,
    password,
  }: LoginForm) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const error = err as AuthError;
      setLoginError(mapFirebaseErrorCodeToMsg(error.code));
      setValue("password", "");
    }
  };

  return (
    <div>
      <View style={{ marginVertical: 20, marginLeft: 10 }}>
        <Text h2 numberOfLines={2} style={{ fontStyle: "italic" }}>
          TrainerPro
        </Text>
      </View>
      {loginError && <Text style={{ color: "red" }}>{loginError}</Text>}

      <Controller
        name="email"
        control={control}
        rules={{
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Por favor ingresa un email válido",
          },
          required: { value: true, message: "Este campo es requerido" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            placeholder="email"
            leftIcon={<MCI name="email" size={24} color="black" />}
            errorMessage={
              error ? error.message || "El campo es requerido" : undefined
            }
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: { value: true, message: "Este campo es requerido" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            placeholder="Contraseña"
            leftIcon={<MCI name="lock" size={24} color="black" />}
            errorMessage={
              error ? error.message || "El campo es requerido" : undefined
            }
            secureTextEntry={true}
          />
        )}
      />

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </div>
  );
};

export default Login;
