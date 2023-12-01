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
import { useMutation } from "@tanstack/react-query";
import { updataTodoApi } from "../apiFunc/todos";
import { useGetData } from "../hooks/useGetData";
import Toast from "react-native-toast-message";

const Taskcard = ({ task, taskTitle, refetch, update, setUpdate }) => {
  const { authToken } = useGetData();
  const [showModal, setShowModal] = useState(false);

  const updateTodoStatusResponse = useMutation({
    mutationFn: (statusId) =>
      updataTodoApi(authToken, {
        todo: Number(task.id),
        status: Number(statusId),
      }),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Task updated successfully" });
      setUpdate(!update);
      refetch.refetch();
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Please try again",
      });
    },
  });

  const handlePress = () => {
    setShowModal(true);
  };

  const handleUpdate = (id) => {
    setShowModal(false);
    updateTodoStatusResponse.mutate(id);
  };

  if (task == []) return;

  return (
    <GluestackUIProvider config={config}>
      <TouchableHighlight
        onPress={handlePress}
        style={[styles.pressable, styles[task.priority]]}
        underlayColor="#FFFADA"
      >
        <View style={styles.taskContainer}>
          <Text style={styles.taskText}>{task.title} </Text>
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
            <Heading size="lg">{task.title}</Heading>
            <ModalCloseButton>
              <AntDesign name="closecircle" size={14} color="red" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>{task.body}</Text>
          </ModalBody>
          <ModalFooter style={styles.footerBody}>
            <HStack space="4xl">
              {taskTitle == "Todos" || (
                <Button
                  size="sm"
                  action="positive"
                  onPress={() => {
                    handleUpdate(0);
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
              )}
              {taskTitle == "In-Progress" || (
                <Button
                  size="sm"
                  action="positive"
                  onPress={() => {
                    handleUpdate(1);
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
              )}
              {taskTitle == "Completed" || (
                <Button
                  size="sm"
                  action="positive"
                  onPress={() => {
                    handleUpdate(2);
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
              )}
            </HStack>
          </ModalFooter>
          {taskTitle == "Todos" || (
            <Text style={styles.footerText}>
              <MaterialCommunityIcons name="progress-close" color="black" />
              :Move to todo
            </Text>
          )}
          {taskTitle == "In-Progress" || (
            <Text style={styles.footerText}>
              <MaterialCommunityIcons name="progress-clock" color="black" />
              :Move to in-progress
            </Text>
          )}
          {taskTitle == "Completed" || (
            <Text style={styles.footerText}>
              <MaterialCommunityIcons name="progress-check" color="black" />
              :Move to completed
            </Text>
          )}
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
  modal: {
    width: "110%",
  },
  footerBody: {
    justifyContent: "space-evenly",
  },
  LOW: {
    backgroundColor: "#90EE90",
  },
  HIGH: {
    backgroundColor: "#FA8072",
  },
  MEDIUM: {
    backgroundColor: "#F8E473",
  },
});
