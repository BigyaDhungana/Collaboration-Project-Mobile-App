import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
 import Taskcard from "../../components/taskcard";

const Projectdash = () => {
  const pId = useLocalSearchParams().projectId;

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text>Projectdash</Text>
        <Taskcard />
      </View>
    </SafeAreaProvider>
  );
};

export default Projectdash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
