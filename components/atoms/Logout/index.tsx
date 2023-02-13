import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import MIcon from "@expo/vector-icons/MaterialIcons";

const Logout = () => (
  <MIcon
    name="logout"
    size={24}
    style={{ marginRight: 10 }}
    onPress={() => signOut(auth)}
  />
);

export default Logout;
