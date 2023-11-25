import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Heading,
  ButtonText,
  GluestackUIProvider,
  HStack,
} from "@gluestack-ui/themed";
import { config } from "../config/gluestack-ui.config";

const Taskcard = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => {
    setShowModal(true);
  };
  return (
    <GluestackUIProvider config={config}>
      <TouchableHighlight
        onLongPress={handlePress}
        style={styles.pressable}
        underlayColor="#FFFADA"
      >
        <View style={styles.taskContainer}>
          <Text style={styles.taskText}>HELLO WORLD </Text>
        </View>
      </TouchableHighlight>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Task title</Heading>
          </ModalHeader>
          <ModalBody>
            <Text>
              Task description. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus tempora error tempore ab excepturi quis, voluptatem earum id. Pariatur consectetur animi aspernatur deserunt quas impedit tenetur nobis atque temporibus. Atque.
            </Text>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button
                variant="outline"
                size="sm"
                action="secondary"
                mr=""
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Close</ButtonText>
              </Button>
              <Button
                size="sm"
                action="positive"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Explore</ButtonText>
              </Button>
              <Button
                size="sm"
                action="positive"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Explore</ButtonText>
              </Button>
              <Button
                size="sm"
                action="positive"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>explore</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </GluestackUIProvider>
  );
};

export default Taskcard;

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "#F8F2ED",
    margin: 10,
  },
  taskContainer: {
    minHeight: 80,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  taskText: {
    fontSize: 20,
  },
});
