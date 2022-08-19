import * as SecureStore from "expo-secure-store";

interface UserInterface {
  key: string;
  payload: {
    userToken: string;
    profile: {
      userName: string;
      email: string;
      coverImg: string;
      profileImg: string;
    };
  };
}
/**
 * @param  {string} key
 */
export const getUserFromSecureStore = async (key: string) => {
  const results = await SecureStore.getItemAsync(key);

  return results ? results : null;
};
/**
 * @param  {UserInterface} props
 */
export const setUserToSecureStore = (props: UserInterface) => {
  SecureStore.setItemAsync(props.key, JSON.stringify(props.payload));
};
