import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import SectionText from "../../components/atoms/SectionText";
import TPText from "../../components/atoms/TPText";
import { useUser } from "../../hooks";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Client } from "../../types/client";
import { userMetricsQuery } from "../../firebase/api";
import styles from "../../styles";
import TransparentOverlay from "../../components/atoms/TransparentOverlay";
import { months } from "../Schedule";

const metricOptions = [
  { label: "Peso corporal", value: "weight" },
  { label: "Grasa corporal", value: "fat" },
  { label: "Pecho", value: "chest" },
  { label: "Cuello", value: "neck" },
  { label: "Hombros", value: "shoulders" },
  { label: "Biceps", value: "biceps" },
  { label: "Antebrazo", value: "forearm" },
  { label: "Cintura", value: "waist" },
  { label: "Cadera", value: "hip" },
  { label: "Muslo", value: "thigh" },
  { label: "Gemelo", value: "calf" },
];

type MetricKeys =
  | "weight"
  | "fat"
  | "chest"
  | "neck"
  | "shoulders"
  | "biceps"
  | "forearm"
  | "waist"
  | "hip"
  | "thigh"
  | "calf";

const MetricCard = ({
  dateString,
  value,
}: {
  dateString: string;
  value: string;
}) => {
  const date = new Date(dateString);
  const dateFormatted = `${dateString.split("-")[2].substring(0, 2)} ${
    months[date.getMonth()]
  }. ${date.getFullYear()}`;
  return (
    <View
      style={{
        backgroundColor: colors.white[100],
        width: "100%",
        padding: 15,
        marginBottom: 15,
        ...styles.flexRowCenter,
        ...styles.boxShadow,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          width: "100%",
          ...styles.flexRowCenter,
        }}
      >
        <TPText>{dateFormatted}</TPText>
        <TPText>{value}</TPText>
      </View>
    </View>
  );
};

const Evolution = () => {
  const { user } = useUser();
  const navigation = useNavigation<any>();
  const [metrics, isMetricsLoading] = useCollectionData(
    userMetricsQuery((user as Client).id as string)
  );

  const [selectedMetric, setSelectedMetric] = useState<MetricKeys>("weight");
  const selectedMetricRegistrys = metrics?.filter(
    (m) => m.values[selectedMetric]
  );

  if (!user) return <TransparentOverlay />;

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 15 }}>
        <SectionText>Evolución</SectionText>
        <TPText fs={22} type="medium" mt={20}>
          Seleccionar métrica
        </TPText>
        <Picker
          selectedValue={selectedMetric}
          onValueChange={(itemValue) => setSelectedMetric(itemValue)}
          style={{ marginTop: 10, minHeight: 40 }}
        >
          {metricOptions.map(({ value, label }) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
        <TPText fs={22} type="medium" mt={20}>
          Registros
        </TPText>
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {isMetricsLoading ? (
            <ActivityIndicator size="large" />
          ) : selectedMetricRegistrys && selectedMetricRegistrys.length > 0 ? (
            selectedMetricRegistrys.map((m) => (
              <MetricCard
                dateString={m.date}
                value={m.values[selectedMetric] as string}
                key={m.id}
              />
            ))
          ) : (
            <TPText gray textAlign="center" fs={18}>
              Todavía no tienes
              <br /> ningún registro
            </TPText>
          )}
        </ScrollView>
      </View>
      <AntDesign
        name="pluscircle"
        size={36}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          color: colors.blue[100],
        }}
        onPress={() =>
          navigation.navigate("RegisterMetricsForm" as never, {
            data: null,
          })
        }
      />
    </ScrollView>
  );
};

export default Evolution;
