import AsyncStorage from "@react-native-async-storage/async-storage"

export const storedata=async(key,value)=>{
    await AsyncStorage.setItem(key,value)
}