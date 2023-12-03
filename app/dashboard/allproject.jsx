//announcements

import { View, Text } from "react-native";
import React from "react";
import Projectcard from "../../components/projectcard";
import { Button } from "@gluestack-ui/themed";
import { useGetData } from "../../hooks/useGetData";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../../apiFunc/dashboard";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../../components/loading";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Announcement = () => {
  const { authToken } = useGetData();
  const router = useRouter();

  const getDashboardResponse = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardApi(authToken),
    enabled: !!authToken,
  });

  if (getDashboardResponse.isLoading) {
    return <Loading />;
  }

  if (getDashboardResponse.isError) {
    if (getDashboardResponse.error.message == "401") {
      Toast.show({
        type: "error",
        text1: "Session expired, please login again",
      });
      AsyncStorage.removeItem("authToken");
      router.replace("/");
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong, please try again later",
      });
    }
  }

  if (getDashboardResponse.data == null) return;

  return (
    <ScrollView
      contentContainerStyle={{
        zIndex: 100,
        minHeight: "100%",
      }}
    >
      {getDashboardResponse.data.announcements.map((announcement) => {
        return (
          <Projectcard announcementObj={announcement} key={announcement.id} />
        );
      })}
    </ScrollView>
  );
};

export default Announcement;
