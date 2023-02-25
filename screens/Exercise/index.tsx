import { View } from "react-native";
import TPText from "../../components/atoms/TPText";
import colors from "../../styles/colors";
import { extractVideoID } from "../../utils";
import styles from "../../styles";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import { WorkoutExercise } from "../../types/workout";

const Exercise = ({ route }: { route: any }) => {
  const { exercise } = route.params as { exercise: WorkoutExercise };
  return (
    <View>
      <TPText fs={35} type="medium" padding={15}>
        {exercise.name}
      </TPText>

      <iframe
        height="315"
        src={`https://www.youtube.com/embed/${extractVideoID(
          exercise.videoUrl
        )}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <View style={{ padding: 15 }}>
        <TPText fs={18} mb={5} type="thin" bold color={colors.gray[200]}>
          Objetivo
        </TPText>
        <View style={styles.flexRowCenter}>
          <Feather name="flag" size={22} style={{ marginRight: 5 }} />
          <TPText fs={18} type="light">
            {exercise.objective}
          </TPText>
        </View>
        <View style={{ marginTop: 5, ...styles.flexRowCenter }}>
          <Fontisto name="stopwatch" size={22} style={{ marginRight: 5 }} />
          <TPText fs={18} type="light">
            {exercise.rest}''
          </TPText>
        </View>
      </View>
    </View>
  );
};

export default Exercise;
