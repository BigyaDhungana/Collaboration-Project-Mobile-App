import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GluestackUIProvider, Spinner } from "@gluestack-ui/themed";
import { config } from "../config/gluestack-ui.config";

const Loading = () => {
  return (
    <GluestackUIProvider config={config}>
      <View style={styles.container}>
        <Spinner size="large" />
      </View>
    </GluestackUIProvider>
  );
};

export default Loading;

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
