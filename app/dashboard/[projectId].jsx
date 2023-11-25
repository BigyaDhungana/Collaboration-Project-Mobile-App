import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Taskcard from "../../components/taskcard";
import Collapsible from "../../components/collapsible";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";

const Projectdash = () => {
  const pId = useLocalSearchParams().projectId;
  // console.log(route)
  return (
    <>
      <View style={styles.select}>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "Football", value: "football" },
            { label: "Baseball", value: "baseball" },
            { label: "Hockey", value: "hockey" },
          ]}
        />
      </View>
      <ScrollView style={styles.container}>
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
      </ScrollView>
      {/* <View style={styles.container}>
        <Text>{pId}</Text>
      </View> */}
    </>
  );
};

export default Projectdash;

const styles = StyleSheet.create({
  container: {
    marginLeft: 35,
    marginTop:30,
  },
  select: {
    backgroundColor: "#555555",
    justifyContent: "space-between",
    width: "60%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
  },
});
