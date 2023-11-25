import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Taskcard from "../../components/taskcard";
import Collapsible from "../../components/collapsible";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Projectdash = () => {
  const pId = useLocalSearchParams().projectId;
  // console.log(route)
  return (
    <>
      <View style={styles.containers}>
        <Text>Projectdash</Text>
        {/* <Taskcard /> */}
       <Collapsible title="Todos">
          <MaterialCommunityIcons
            name="progress-close"
            size={40}
            color="black"
          />
        </Collapsible>
        <Collapsible title="In-Progress">
          <MaterialCommunityIcons
            name="progress-clock"
            size={40}
            color="black"
          />
        </Collapsible>
        <Collapsible title="Completed">
          <MaterialCommunityIcons
            name="progress-check"
            size={40}
            color="black"
          />
        </Collapsible>
      </View>
      {/* <View style={styles.container}>
        <Text>{pId}</Text>
      </View> */}
    </>
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
