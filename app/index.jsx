import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";

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
} from "@gluestack-ui/themed";
import { config } from "../config/gluestack-ui.config";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import logo from "../assets/img/logoa.png";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../apiFunc/users";
import Toast from "react-native-toast-message";
import { storedata } from "../utils/storeData";
import * as localAuth from "expo-local-authentication";
import { getData } from "../utils/getData";

export default function Page() {
  const router = useRouter();
  const [showFp, setFp] = useState(false);
  const [buttonClass, setButtonClass] = useState(styles.loginButton);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasHardware, setHasHardware] = useState(false);
  const [fpScannerAvailable, setFpScannerAvailable] = useState(false);
  const [hasSavedFp, setHasSavedFp] = useState(false);

  useEffect(() => {
    (async () => {
      const hasHardwareAuth = await localAuth.hasHardwareAsync();
      setHasHardware(hasHardwareAuth);
    })();
  }, []);

  useEffect(() => {
    if (hasHardware) {
      (async () => {
        const authtype = await localAuth.supportedAuthenticationTypesAsync();
        if (authtype.includes(1)) {
          setFpScannerAvailable(true);
        }
      })();
    }
  }, [hasHardware]);

  useEffect(() => {
    if (fpScannerAvailable) {
      (async () => {
        const hasSavedFps = await localAuth.isEnrolledAsync();
        setHasSavedFp(hasSavedFps);
      })();
    }
  }, [fpScannerAvailable]);

  useEffect(() => {
    if (hasSavedFp) {
      (async () => {
        const savedAuthToken = await getData("authToken");
        console.log(savedAuthToken, "heh");
        if (savedAuthToken != null && hasSavedFp == true) {
          setFp("true");
          setButtonClass(styles.loginButtonIfFp);
        }
      })();
    }
  }, [hasSavedFp]);

  const loginResponse = useMutation({
    mutationFn: (data) => loginApi(data),
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Please try again",
      });
    },
    onSuccess: (data) => {
      const {
        username: uname,
        token,
        profile_picture,
        userID,
        name,
        email,
      } = data.data;
      storedata("authToken", token);
      storedata("userDetails", { uname, profile_picture, userID, name, email });
      Toast.show({
        type: "success",
        text1: "Welcome",
        text2: uname,
      });
      router.replace("/dashboard/layout");
    },
  });

  const handleLogin = () => {
    loginResponse.mutate({ username: username, password: password });
    setUsername("");
    setPassword("");
    // storedata("authToken", "testforhehe");
    // router.push("/dashboard/layout");
  };

  const fingerPrintLogin = async () => {
    const result = await localAuth.authenticateAsync();
    console.log(result);
    if (result.success == true) {
      Toast.show({
        type: "success",
        text1: "Welcome Back",
      });
      router.replace("/dashboard/layout");
    }
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
                <InputField
                  onChangeText={(e) => setUsername(e)}
                  value={username}
                />
              </Input>
            </View>
            <View style={styles.infoItem}>
              <Text>Password</Text>
              <Input>
                <InputField
                  onChangeText={(e) => setPassword(e)}
                  value={password}
                  type="password"
                />
              </Input>
            </View>
            <View style={styles.buttonGroup}>
              <Button
                onPress={handleLogin}
                style={buttonClass}
                disabled={loginResponse.isPending}
              >
                <ButtonText>
                  {loginResponse.isPending ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>Login</>
                  )}
                </ButtonText>
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
