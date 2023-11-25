import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Projectcard = ({ navObj }) => {
 
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navObj.navigate("Project 1");
      }}
    >
      <View>
        <Text style={styles.text}>Name of the project</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Projectcard;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    borderWidth: 1,
    borderColor: "black",
    minHeight: 60,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
