import { View, Text, ScrollView } from "react-native";
import React from "react";
import Projectcard from "../../components/projectcard";
import { Button } from "@gluestack-ui/themed";

const Allproject = ({ navigation }) => {
  return (
    <ScrollView>
      <Projectcard navObj={navigation} />
      {/* <Button
        onPress={() => {
          navigation.navigate("Project 1");
        }}
      ></Button> */}
    </ScrollView>
  );
};

export default Allproject;
