import AsyncStorage from "@react-native-async-storage/async-storage"

export const storedata=async(key,value)=>{
    if (key=="authToken")
        await AsyncStorage.setItem(key,value)
    else{
        await AsyncStorage.setItem(key,JSON.stringify(value))
    }
}