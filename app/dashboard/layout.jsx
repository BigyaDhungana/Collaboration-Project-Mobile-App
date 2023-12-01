import "react-native-gesture-handler";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Projectdash from "./[projectId]";
import logo from "../../assets/img/logos.png";
import Profile from "../../components/profile";
import Allproject from "./allproject";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getData } from "../../utils/getData";
import { useGetData } from "../../hooks/useGetData";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../../apiFunc/dashboard";

const projdummy = [
  { id: 1, name: "Project 1" },
  { id: 2, name: "Project 2" },
  { id: 3, name: "Project 3" },
];

const Layout = () => {
  const Drawer = createDrawerNavigator();
  const { authToken, userDetails } = useGetData();

  const getDashboardResponse = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardApi(authToken),
    enabled: !!authToken,
  });

  // useEffect(() => {
  //   if (getDashboardResponse.data) {
  //     console.log(getDashboardResponse.data);
  //   }
  // }, [getDashboardResponse.data]);
  // console.log(getDashboardResponse,"hehe");

  if (!authToken) return;
  // if (getDashboardResponse.data == null) return;

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
        {projdummy.map((element) => {
          return (
            <Drawer.Screen
              name={element.name}
              component={Projectdash}
              key={element.id}
              initialParams={{ projectId: element.id }}
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
    marginTop: StatusBar.currentHeight,
  },
});
