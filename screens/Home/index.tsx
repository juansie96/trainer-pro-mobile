import { View } from "react-native";
import { useUser } from "../../hooks";
import { useEffect } from "react";
import TransparentOverlay from "../../components/atoms/TransparentOverlay";
import SectionText from "../../components/atoms/SectionText";
import TPText from "../../components/atoms/TPText";
import TaskCard from "../../components/molecules/TaskCard";

const Home = () => {
  const { userData, isFetching, error, fetchUserData } = useUser();

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isFetching) {
    return <TransparentOverlay />;
  }
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 15, flex: 1 }}>
      <TPText fs={24} type="light">
        Bienvenido,{" "}
        <TPText fs={24} type="boldItalic">
          {userData?.name}
        </TPText>
      </TPText>
      <SectionText>Plan del día</SectionText>
      <View style={{ display: "flex", alignItems: "center" }}>
        {/* <TPText gray textAlign="center" fs={18}>
          No tienes planificación
          <br /> para hoy
        </TPText> */}
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </View>
    </View>
  );
};

export default Home;
