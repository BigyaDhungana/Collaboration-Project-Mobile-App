import { StyleSheet, Text, View, Image } from "react-native";

import {
  Button,
  ButtonIcon,
  ButtonText,
  GluestackUIProvider,
  Heading,
  Input,
  InputField,
  KeyboardAvoidingView,
  Center,
  set,
} from "@gluestack-ui/themed";
import { config } from "../config/gluestack-ui.config";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import logo from "../assets/img/logoa.png";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();
  const [showFp, setFp] = useState(false);
  const [buttonClass, setButtonClass] = useState(styles.loginButton);

  const handleLogin = () => {
    console.log("Jethalal champak gada");
    setFp(true);
    setButtonClass(styles.loginButtonIfFp);
  };

  const fingerPrintLogin = () => {
    console.log("Finger print login");
    router.push("/dashboard/21");
  };

  return (
    <GluestackUIProvider config={config}>
      <KeyboardAvoidingView style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.box}>
          <Center>
            <Heading size="3xl">Welcome</Heading>
          </Center>

          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Text>Username</Text>
              <Input size="sm">
                <InputField />
              </Input>
            </View>
            <View style={styles.infoItem}>
              <Text>Password</Text>
              <Input>
                <InputField />
              </Input>
            </View>
            <View style={styles.buttonGroup}>
              <Button onPress={handleLogin} style={buttonClass}>
                <ButtonText>Login</ButtonText>
              </Button>
              {showFp ? (
                <Button
                  variant="outline"
                  p="0"
                  style={styles.fingerPrintButton}
                  onPress={fingerPrintLogin}
                >
                  <ButtonIcon>
                    <FontAwesome5 name="fingerprint" size={20} color="blue" />
                  </ButtonIcon>
                </Button>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    margin: 0,
    justifyContent: "center",
    backgroundColor: "#F5FEFD",
    padding: 10,
  },
  box: {
    borderColor: "000000",
    borderWidth: 1,
    width: "80%",
    borderRadius: 15,
    padding: 6,
    height: 290,
  },
  logo: {
    width: 200,
    height: 200,
  },
  info: {
    backgroundColor: "#FFF8DC",
    flex: 1,
  },
  infoItem: {
    paddingBottom: 9,
  },
  buttonGroup: {
    // flexDirection: "row",
    paddingTop: 10,
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  loginButton: {
    width: "100%",
    borderRadius: 15,
  },
  loginButtonIfFp: {
    width: "77%",
    borderRadius: 15,
  },
  fingerPrintButton: {
    borderRadius: 15,
    marginLeft: 5,
  },
});
