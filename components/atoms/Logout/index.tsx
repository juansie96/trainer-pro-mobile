import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import MIcon from "@expo/vector-icons/MaterialIcons";
import colors from "../../../styles/colors";

const Logout = () => (
  <MIcon
    name="logout"
    size={24}
    style={{ marginRight: 10 }}
    onPress={() => signOut(auth)}
    color={colors.white[100]}
  />
);

export default Logout;
