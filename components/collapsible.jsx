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
} from "accordion-collapse-react-native";
import Taskcard from "./taskcard";

const Collapsible = ({ children, title, list, refetch, update, setUpdate }) => {
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
          {list.map((element) => {
            return (
              <Taskcard
                key={element.id}
                task={element}
                taskTitle={title}
                refetch={refetch}
                update={update}
                setUpdate={setUpdate}
              />
            );
          })}
        </View>
      </CollapseBody>
    </Collapse>
  );
};

export default Collapsible;

const styles = StyleSheet.create({
  header: {
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
    height: 100,
    backgroundColor: "#B2BEB5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  headerText: {
    fontSize: 50,
  },
  body: {
    width: "80%",
    zIndex: 1,
    marginBottom: 10,
    marginLeft: 13,
  },
  icon: {
    position: "relative",
    bottom: 35,
    left: 299,
  },
});
