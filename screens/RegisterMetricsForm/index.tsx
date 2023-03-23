import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, View } from "react-native";
import DateTimePicker from "../../components/atoms/DateTimePicker";
import SectionText from "../../components/atoms/SectionText";
import TPText from "../../components/atoms/TPText";
import { metricsRef } from "../../firebase/refs";
import { useUser } from "../../hooks";
import { UserMetrics } from "../../types/metrics";

const InputSection = ({
  label,
  inputKey,
  unit,
  register,
}: {
  label: string;
  inputKey: string;
  unit: string;
  register: any;
}) => (
  <div style={{ marginTop: 20 }}>
    <TPText mb={10}>{label}</TPText>
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: 20,
        alignItems: "center",
      }}
    >
      <input
        style={{ height: 30, flex: 1 }}
        placeholder={"00"}
        {...register(inputKey)}
      />
      <TPText>{unit}</TPText>
    </div>
  </div>
);

const RegisterMetricsForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [isSaving, setIsSaving] = useState(false);
  const navigation = useNavigation();
  const { user } = useUser();
  const { register, handleSubmit } = useForm<UserMetrics>({
    defaultValues: {
      weight: undefined,
      fat: undefined,
      neck: undefined,
      chest: undefined,
      shoulders: undefined,
      biceps: undefined,
      forearm: undefined,
      waist: undefined,
      hip: undefined,
      thigh: undefined,
      calf: undefined,
    },
  });

  const onSubmit: SubmitHandler<UserMetrics> = async (data) => {
    setIsSaving(true);

    try {
      await addDoc(metricsRef, {
        date: selectedDate.toISOString(),
        userId: user?.id as string,
        values: data,
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
    >
      <SectionText>Registrar métricas</SectionText>
      <View style={{ marginBottom: "30px" }}>
        <DateTimePicker
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e: any) => setSelectedDate(new Date(e.target.value))}
        />
      </View>
      <InputSection
        label="Peso corporal"
        inputKey="weight"
        unit="kg"
        register={register}
      />
      <InputSection
        label="Grasa corporal"
        inputKey="fat"
        unit="%"
        register={register}
      />
      <InputSection
        label="Pecho"
        inputKey="chest"
        unit="cm"
        register={register}
      />
      <InputSection
        label="Cuello"
        inputKey="neck"
        unit="cm"
        register={register}
      />
      <InputSection
        label="Hombros"
        inputKey="shoulders"
        unit="cm"
        register={register}
      />
      <InputSection
        label="Biceps"
        inputKey="biceps"
        unit="cm"
        register={register}
      />
      <InputSection
        label="Antebrazos"
        inputKey="forearm"
        unit="cm"
        register={register}
      />
      <InputSection
        label="Cintura"
        inputKey="waist"
        unit="cm"
        register={register}
      />
      <InputSection
        label="Cadera"
        inputKey="hip"
        unit="cm"
        register={register}
      />
      <InputSection
        label="Muslo"
        inputKey="thigh"
        unit="cm"
        register={register}
      />
      <InputSection
        label="Gemelo"
        inputKey="calf"
        unit="cm"
        register={register}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          radius={"sm"}
          type="solid"
          style={{ width: 100, marginTop: 15 }}
          onPress={handleSubmit(onSubmit)}
        >
          {isSaving ? <ActivityIndicator size="large" /> : "Save"}
        </Button>
      </div>
    </ScrollView>
  );
};

export default RegisterMetricsForm;
