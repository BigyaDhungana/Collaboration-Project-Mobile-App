import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data;
};
