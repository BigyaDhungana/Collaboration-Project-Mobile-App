import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  ButtonText,
  GluestackUIProvider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Center,
  ModalCloseButton,
} from "@gluestack-ui/themed";
import { config } from "../config/gluestack-ui.config";
import { AntDesign } from "@expo/vector-icons";

const Projectcard = ({ announcementObj }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <GluestackUIProvider config={config}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setShowModal(true)}
      >
        <View>
          <Text style={styles.text}>{announcementObj.title}</Text>
          <Text style={styles.pname}>{announcementObj.project}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        isOpen={showModal}
        style={styles.modal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg"
      >
        <ModalContent>
          <ModalHeader>
            <Text style={styles.modalTitle}>{announcementObj.title}</Text>
            <ModalCloseButton>
              <AntDesign name="closecircle" size={18} color="red" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text style={styles.body}>{announcementObj.body}</Text>
          </ModalBody>
          <ModalFooter style={styles.footer}>
            <Text style={styles.date}>
              {announcementObj.created_at.slice(0, 10)}
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </GluestackUIProvider>
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
    zIndex: -1,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  pname: {
    fontSize: 13,
    textAlign: "center",
  },
  modal: {
    zIndex: 10000,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "auto",
  },
  date: {
    fontSize: 12,
  },
  footer: {
    justifyContent: "center",
  },
  body: {
    fontSize: 15,
    margin: 5,
  },
});
