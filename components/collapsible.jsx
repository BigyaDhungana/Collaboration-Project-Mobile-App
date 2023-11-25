import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import Taskcard from "./taskcard";

const Collapsible = ({ children, title }) => {
  const [iconName, setIconName] = useState("expand-alt");
  return (
    <Collapse
      onToggle={() => {
        iconName == "expand-alt"
          ? setIconName("compress-alt")
          : setIconName("expand-alt");
      }}
    >
      <CollapseHeader>
        <View style={styles.header}>
          {children}
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={styles.icon}>
          <FontAwesome5 name={iconName} size={24} color="black" />
        </View>
      </CollapseHeader>
      <CollapseBody>
        <View style={styles.body}>
          <Taskcard />
          <Taskcard />
          <Taskcard />
          <Taskcard />
          <Taskcard />
        </View>
      </CollapseBody>
    </Collapse>
  );
};

export default Collapsible;

const styles = StyleSheet.create({
  header: {
    width: "80%",
    borderWidth: 1,
    borderColor: "black",
    height: 100,
    backgroundColor: "#B2BEB5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 50,
  },
  body: {
    width: "80%",
    zIndex:1},
  icon: {
    position: "relative",
    bottom: 25,
    left: 290,
  },
});
