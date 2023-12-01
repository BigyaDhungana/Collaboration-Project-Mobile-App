import { View, Text } from "react-native";
import React from "react";
import Projectcard from "../../components/projectcard";
import { Button } from "@gluestack-ui/themed";
import { useGetData } from "../../hooks/useGetData";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../../apiFunc/dashboard";
import { ScrollView } from "react-native-gesture-handler";

const Allproject = () => {
  const { authToken } = useGetData();

  const getDashboardResponse = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardApi(authToken),
    enabled: !!authToken,
  });
  if (getDashboardResponse.data == null) return;
  console.log(getDashboardResponse.data);

  console.log(getDashboardResponse.data.announcement);

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

export default Allproject;
