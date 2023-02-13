import { useState } from "react";
import { Button, Input, Text } from "@rneui/base";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { mapFirebaseErrorCodeToMsg } from "../../utils";
import LoadingOverlay from "../../components/atoms/LoadingOverlay";
import styles from "../../styles";
import TransparentOverlay from "../../components/atoms/TransparentOverlay";
import colors from "../../styles/colors";

interface LoginForm {
  email: string;
  password: string;
}
const Login = () => {
  const { control, handleSubmit, setValue } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onSubmit: SubmitHandler<LoginForm> = async ({
    email,
    password,
  }: LoginForm) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const error = err as AuthError;
      setLoginError(mapFirebaseErrorCodeToMsg(error.code));
      setValue("password", "");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        ...styles.root,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: colors.grays[100],
      }}
    >
      {isLoading && <TransparentOverlay />}
      <View style={{ marginVertical: 20, marginLeft: 10 }}>
        <Text
          h4
          numberOfLines={2}
          style={{
            fontStyle: "italic",
            color: colors.blue[100],
            fontWeight: "700",
          }}
        >
          TrainerPro - Login
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
            leftIcon={<MCI name="email" size={24} color={colors.blue[100]} />}
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
            leftIcon={<MCI name="lock" size={24} color={colors.blue[100]} />}
            errorMessage={
              error ? error.message || "El campo es requerido" : undefined
            }
            secureTextEntry={true}
          />
        )}
      />

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Login;
