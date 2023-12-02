import "react-native-gesture-handler";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Projectdash from "./[projectId]";
import logo from "../../assets/img/logos.png";
import Profile from "../../components/profile";
import Allproject from "./allproject";
import { useGetData } from "../../hooks/useGetData";
import { useQuery } from "@tanstack/react-query";
import { metadataApi } from "../../apiFunc/users";
import { storedata } from "../../utils/storeData";
import { LoaderIcon } from "@gluestack-ui/themed";
import Loading from "../../components/loading";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Layout = () => {
  const router = useRouter();

  const Drawer = createDrawerNavigator();
  const { authToken, userDetails } = useGetData();

  const metadataResponse = useQuery({
    queryKey: ["metadata"],
    queryFn: () => metadataApi(authToken),
    enabled: !!authToken,
  });

  if (metadataResponse.isSuccess) {
    storedata("metadata", metadataResponse.data);
  }

  if (metadataResponse.isError) {
    console.log(metadataResponse.error.message);
    if (metadataResponse.error.message == "401") {
      Toast.show({
        type: "error",
        text1: "Session expired, please login again"
      });
      AsyncStorage.removeItem("authToken");
      router.replace("/");
    }
  }

  if (metadataResponse.isLoading) {
    return <Loading />;
  }

  if (!authToken) return;
  if (metadataResponse.data == null) return;

  return (
    <>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Profile userDetails={userDetails} />
      </View>
      <Drawer.Navigator
        screenOptions={{
          drawerType: "slide",
          drawerActiveBackgroundColor: "#ADD8E6",
          headerTitleContainerStyle: {
            display: "flex",
          },
          headerStatusBarHeight: 0,
          drawerStyle: {
            zIndex: 1,
          },
        }}
      >
        <Drawer.Screen name="Announcements" component={Allproject} />
        {metadataResponse.data.map((projObj) => {
          return (
            <Drawer.Screen
              name={projObj.project_name}
              component={Projectdash}
              key={projObj.project_id}
              initialParams={{ projectId: projObj.project_id }}
            />
          );
        })}
      </Drawer.Navigator>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 200,
    // borderColor: "black",
    // borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 3,
    marginRight: 13,
    zIndex: 10,
    marginTop: Platform.OS == "ios" ? 30 : StatusBar.currentHeight,
  },
});
