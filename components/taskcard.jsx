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
  ButtonIcon,
  ModalCloseButton,
  Icon,
} from "@gluestack-ui/themed";
import { config } from "../config/gluestack-ui.config";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

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
        style={styles.modal}
      >
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Task title</Heading>
            <ModalCloseButton>
              <AntDesign name="closecircle" size={14} color="red" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>
              Task description. Lorem ipsum dolor sit amet consectetur. Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Possimus
              tempora error tempore ab excepturi quis, voluptatem earum id.
              Pariatur consectetur animi aspernatur deserunt quas impedit
              tenetur nobis atque temporibus. Atque.
            </Text>
          </ModalBody>
          <ModalFooter>
            <HStack space="4xl">
              {/* <Button
                variant="outline"
                size="sm"
                action="secondary"
                mr=""
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Close</ButtonText>
              </Button> */}
              <Button
                size="sm"
                action="positive"
                onPress={() => {
                  setShowModal(false);
                }}
                style={styles.modalButton}
              >
                <ButtonIcon style={styles.modalButtonIcon}>
                  <MaterialCommunityIcons
                    name="progress-close"
                    size={20}
                    color="white"
                  />
                </ButtonIcon>
              </Button>
              <Button
                size="sm"
                action="positive"
                onPress={() => {
                  setShowModal(false);
                }}
                style={styles.modalButton}
              >
                <ButtonIcon style={styles.modalButtonIcon}>
                  <MaterialCommunityIcons
                    name="progress-clock"
                    size={20}
                    color="white"
                  />
                </ButtonIcon>
              </Button>
              <Button
                size="sm"
                action="positive"
                onPress={() => {
                  setShowModal(false);
                }}
                style={styles.modalButton}
              >
                <ButtonIcon style={styles.modalButtonIcon}>
                  <MaterialCommunityIcons
                    name="progress-check"
                    size={20}
                    color="white"
                  />
                </ButtonIcon>
              </Button>
            </HStack>
          </ModalFooter>
          <Text style={styles.footerText}>
            <MaterialCommunityIcons name="progress-close" color="black" />
            :Move to todo
          </Text>
          <Text style={styles.footerText}>
            <MaterialCommunityIcons name="progress-clock" color="black" />
            :Move to in-progress
          </Text>
          <Text style={styles.footerText}>
            <MaterialCommunityIcons name="progress-check" color="black" />
            :Move to completed
          </Text>
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
    zIndex: -1,
    borderRadius: 10,
  },
  taskContainer: {
    minHeight: 80,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  taskText: {
    fontSize: 20,
  },
  modalButton: {
    width: "23%",
    padding: 0,
    margin: 3,
  },
  modalButtonIcon: {
    padding: 0,
    margin: 0,
    height: 20,
    width: 20,
  },
  footerText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  modal:{
    width: "110%",
  }
});
