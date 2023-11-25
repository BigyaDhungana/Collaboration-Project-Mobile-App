import {
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  HStack,
  GluestackUIProvider,
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Center,
  Heading,
  Button,
  ButtonText,
  Text,
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  Divider,
} from "@gluestack-ui/themed";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { config } from "../config/gluestack-ui.config";
import userImage from "../assets/img/logoa.png";

const Profile = () => {
  const [showYourInfo, setShowYourInfo] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showActionsheet, setShowActionsheet] = useState(false);

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <GluestackUIProvider config={config}>
      <TouchableOpacity
        onPress={() => {
          setShowActionsheet(!showActionsheet);
        }}
      >
        <Avatar bgColor="$amber600" size="md" borderRadius="$full">
          <AvatarFallbackText>Hello World</AvatarFallbackText>
          <AvatarBadge />
        </Avatar>
      </TouchableOpacity>

      {/* Your Info */}
      <Modal
        isOpen={showYourInfo}
        style={styles.modal}
        closeOnOverlayClick={true}
        onClose={() => setShowYourInfo(false)}
      >
        <ModalContent>
          <Center>
            <ModalHeader>
              <Heading>Your Information</Heading>
            </ModalHeader>
          </Center>
          <ModalBody>
            <View style={styles.container}>
              <View>
                <Text>Name :</Text>
                <Text>Email :</Text>
                <Text>Username :</Text>
                <Text>Id :</Text>
              </View>
              <Image source={userImage} style={styles.userImage} />
            </View>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button
                action="negative"
                onPress={() => {
                  setShowYourInfo(false);
                }}
              >
                <ButtonText>Close</ButtonText>
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>

      {/* Logout confirmation */}
      <Modal
        isOpen={showLogoutConfirmation}
        onClose={() => {}}
        style={styles.modal}
      >
        <ModalContent>
          <Center>
            <ModalHeader>
              <Heading size="xl">Confirmation</Heading>
            </ModalHeader>
          </Center>
          <ModalBody>
            <Text size="xl">Are you sure you want to logout?</Text>
          </ModalBody>
          <Center>
            <ModalFooter>
              <HStack space="4xl">
                <Button
                  action="negative"
                  onPress={() => {
                    setShowLogoutConfirmation(false);
                  }}
                >
                  <ButtonText>No</ButtonText>
                </Button>
                <Button action="positive" onPress={handleLogout}>
                  <ButtonText>Yes</ButtonText>
                </Button>
              </HStack>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>

      <Actionsheet isOpen={showActionsheet} style={styles.actionsheet}>
        <ActionsheetContent style={styles.actionsheetContent}>
          <ActionsheetItem
            onPress={() => {
              setShowYourInfo(!showYourInfo);
              setShowActionsheet(false);
            }}
          >
            <ActionsheetItemText>Your Information</ActionsheetItemText>
          </ActionsheetItem>
          <Divider />
          <ActionsheetItem
            onPress={() => {
              setShowLogoutConfirmation(!showLogoutConfirmation);
              setShowActionsheet(false);
            }}
          >
            <ActionsheetItemText>Logout</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </GluestackUIProvider>
  );
};

export default Profile;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    zIndex: 1000,
    top: 300,
    height: 200,
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionsheet: {
    position: "absolute",
    zIndex: 1000,
    top: -40,
    height: 200,
    width: 200,
    left: 200,
  },
  actionsheetContent: {
    backgroundColor: "#FCFBFC",
  },
});
