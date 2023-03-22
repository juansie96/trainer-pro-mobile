import { ScrollView, View } from "react-native";
import { useUser } from "../../hooks";
import { useEffect } from "react";
import TransparentOverlay from "../../components/atoms/TransparentOverlay";
import SectionText from "../../components/atoms/SectionText";
import TPText from "../../components/atoms/TPText";
import TaskCard from "../../components/molecules/TaskCard";
import dayjs from "dayjs";

const Home = () => {
  const { user, isFetching, fetchUserData } = useUser();
  useEffect(() => {
    fetchUserData();
  }, []);

  if (isFetching) {
    return <TransparentOverlay />;
  }

  if (!user) {
    return (
      <TPText fs={24} type="light">
        Not user found
      </TPText>
    );
  }

  const todayTasks = user.tasks
    ? user.tasks.filter(
        (t) =>
          dayjs(t.date).format("DD/MM/YYYY") ===
          dayjs(new Date()).format("DD/MM/YYYY")
      )
    : null;

  return (
    <View style={{ paddingHorizontal: 15, marginTop: 15, flex: 1 }}>
      <TPText fs={24} type="light">
        Bienvenido,{" "}
        <TPText fs={24} type="boldItalic">
          {user.name}
        </TPText>
      </TPText>
      <SectionText>Plan del día</SectionText>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {todayTasks && todayTasks.length > 0 ? (
          todayTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <TPText gray textAlign="center" fs={18}>
            No tienes planificación
            <br /> para hoy
          </TPText>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
