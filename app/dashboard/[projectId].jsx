import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Taskcard from "../../components/taskcard";
import Collapsible from "../../components/collapsible";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import { useGetData } from "../../hooks/useGetData";
import { useQuery } from "@tanstack/react-query";
import { getTodoListApi } from "../../apiFunc/todos";
import Loading from "../../components/loading";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GluestackUIProvider, Switch } from "@gluestack-ui/themed";
import { config } from "../../config/gluestack-ui.config";

const Projectdash = () => {
  const router = useRouter();

  const pId = useLocalSearchParams().projectId;
  const { metadata, isMounted, authToken, userDetails } = useGetData();
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.value);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isUserOnly, setIsUserOnly] = useState(false);

  const getTodoResponse = useQuery({
    queryKey: ["todos", selectedTeamId, update],
    queryFn: () => getTodoListApi(authToken, { team: selectedTeamId }),
    enabled: !!selectedTeamId,
  });

  useEffect(() => {
    if (isMounted) {
      const team = metadata.find((proj) => proj.project_id == pId);

      const formatted_team = [];
      team.teams.forEach((element) => {
        temp_obj = {};
        temp_obj["label"] = element.name;
        temp_obj["value"] = element.id;
        formatted_team.push(temp_obj);
      });
      setTeams(formatted_team);
    }
  }, [isMounted]);

  useEffect(() => {
    if (getTodoResponse.data != null && isUserOnly === false) {
      setTodo(
        getTodoResponse.data.filter((listObj) => listObj.status === "TODO")
      );
      setInProgress(
        getTodoResponse.data.filter((listObj) => listObj.status === "PROGRESS")
      );
      setCompleted(
        getTodoResponse.data.filter((listObj) => listObj.status === "COMPLETE")
      );
    }
    if (getTodoResponse.data != null && isUserOnly === true) {
      setTodo(
        getTodoResponse.data.filter(
          (listObj) =>
            listObj.status === "TODO" &&
            listObj.assigned_to == userDetails.uname
        )
      );
      setInProgress(
        getTodoResponse.data.filter(
          (listObj) =>
            listObj.status === "PROGRESS" &&
            listObj.assigned_to == userDetails.uname
        )
      );
      setCompleted(
        getTodoResponse.data.filter(
          (listObj) =>
            listObj.status === "COMPLETE" &&
            listObj.assigned_to == userDetails.uname
        )
      );
    }
  }, [getTodoResponse.data, isUserOnly]);

  if (getTodoResponse.isLoading) {
    return <Loading />;
  }

  if (getTodoResponse.isError) {
    if (getTodoResponse.error.message == "401") {
      Toast.show({
        type: "error",
        text1: "Session expired, please login again",
      });
      AsyncStorage.removeItem("authToken");
      router.replace("/");
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong, please try again",
      });
    }
  }

  if (!isMounted) return;

  return (
    <GluestackUIProvider config={config}>
      <View style={styles.select}>
        <RNPickerSelect
          onValueChange={(value) => {
            setSelectedTeamId(value);
          }}
          items={teams}
          value={selectedTeamId}
          placeholder={{}}
        />
      </View>
      <View style={styles.switch}>
        <FontAwesome name="users" size={25} color="black" />
        <Switch
          size="md"
          value={isUserOnly}
          onToggle={() => {
            setIsUserOnly(!isUserOnly);
          }}
        />
        <FontAwesome name="user" size={25} color="black" />
      </View>
      <ScrollView style={styles.container}>
        <Collapsible
          title="Todos"
          list={todo}
          refetch={getTodoResponse}
          update={update}
          setUpdate={setUpdate}
        >
          <MaterialCommunityIcons
            name="progress-close"
            size={40}
            color="black"
          />
        </Collapsible>
        <Collapsible
          title="In-Progress"
          list={inProgress}
          refetch={getTodoResponse}
          update={update}
          setUpdate={setUpdate}
        >
          <MaterialCommunityIcons
            name="progress-clock"
            size={40}
            color="black"
          />
        </Collapsible>
        <Collapsible
          title="Completed"
          list={completed}
          refetch={getTodoResponse}
          update={update}
          setUpdate={setUpdate}
        >
          <MaterialCommunityIcons
            name="progress-check"
            size={40}
            color="black"
          />
        </Collapsible>
      </ScrollView>
    </GluestackUIProvider>
  );
};

export default Projectdash;

const styles = StyleSheet.create({
  container: {
    marginLeft: 35,
    marginTop: 30,
  },
  select: {
    backgroundColor: "#555555",
    justifyContent: "space-between",
    width: "60%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
  },
  switch: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
