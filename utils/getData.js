import AsyncStorage from "@react-native-async-storage/async-storage"

export const getData=async(key)=>{
    const data=AsyncStorage.getItem(key)
    return data
}