import { Button, Input, Text } from "@rneui/base";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

interface LoginForm {
  email: string;
  password: string;
}
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async ({
    email,
    password,
  }: LoginForm) => {
    try {
      console.log(await signInWithEmailAndPassword(auth, email, password));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Text h1 numberOfLines={2} style={{ fontStyle: "italic" }}>
        TrainerPro
      </Text>
      <View style={{ marginVertical: 20 }}>
        <Text h4>Login</Text>
      </View>

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
          />
        )}
      />

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </div>
  );
};

export default Login;
