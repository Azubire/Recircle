import * as secureStore from "expo-secure-store";

interface IsetItem {
  key: string;
  payload: string;
}
export const setItem = (key: string, payload: string) => {
  secureStore.setItemAsync(key, payload);
};

export const getItem = async (key: string) => {
  const results = await secureStore.getItemAsync(key);
  if (results) {
    return await JSON.parse(results);
  }
  return null;
};
