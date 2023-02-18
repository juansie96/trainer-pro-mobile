import { View } from "react-native";
import { useUser } from "../../hooks";
import { useEffect } from "react";
import TransparentOverlay from "../../components/atoms/TransparentOverlay";
import SectionText from "../../components/atoms/SectionText";
import TPText from "../../components/atoms/TPText";
import colors from "../../styles/colors";
const Home = () => {
  const { userData, isFetching, error, fetchUserData } = useUser();
  console.log({ userData, isFetching, error });

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isFetching) {
    return <TransparentOverlay />;
  }
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 15, flex: 1 }}>
      <TPText fs={22}>
        Bienvenido,{" "}
        <TPText fs={22} bold>
          {userData?.name}
        </TPText>
      </TPText>
      <SectionText>Plan del día</SectionText>
      <View style={{ display: "flex", alignItems: "center" }}>
        <TPText color={colors.gray[200]} textAlign="center" fs={16}>
          No tienes planificación
          <br /> para hoy
        </TPText>
      </View>
    </View>
  );
};

export default Home;
