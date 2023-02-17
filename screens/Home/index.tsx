import { Text } from "@rneui/themed";
import { View } from "react-native";
import { useUser } from "../../hooks";
import { useEffect } from "react";
const Home = () => {
  const { userData, isFetching, error, fetchUserData } = useUser();
  console.log({ userData, isFetching, error });

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
      <Text>Buenas tardes, Usuario</Text>
    </View>
  );
};

export default Home;
