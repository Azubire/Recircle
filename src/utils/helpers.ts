import * as SecureStore from "expo-secure-store";

interface IsetItem {
  key: string;
  payload: string;
}
export const setItem = (key: string, payload: string) => {
  SecureStore.setItemAsync(key, payload);
};

export const getItem = async (key: string) => {
  const results = await SecureStore.getItemAsync(key);
  if (results) {
    return await JSON.parse(results);
  }
  return null;
};

const getUserFromAsyncStorage = async (key: string) => {
  const results = await SecureStore.getItemAsync(key);

  return results ? results : null;
};
