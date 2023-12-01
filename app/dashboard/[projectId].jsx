import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Taskcard from "../../components/taskcard";
import Collapsible from "../../components/collapsible";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import { useGetData } from "../../hooks/useGetData";
import { useQuery } from "@tanstack/react-query";
import { getTodoListApi } from "../../apiFunc/todos";

const Projectdash = () => {
  const pId = useLocalSearchParams().projectId;
  const { metadata, isMounted, authToken } = useGetData();
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.value);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [update, setUpdate] = useState(false);

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
    if (getTodoResponse.data != null) {
      setTodo(
        getTodoResponse.data.filter((listObj) => listObj.status == "TODO")
      );
      setInProgress(
        getTodoResponse.data.filter((listObj) => listObj.status == "PROGRESS")
      );
      setCompleted(
        getTodoResponse.data.filter((listObj) => listObj.status == "COMPLETE")
      );
    }
  }, [getTodoResponse.data]);

  if (!isMounted) return;

  return (
    <>
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
      {/* <View style={styles.container}>
        <Text>{pId}</Text>
      </View> */}
    </>
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
});
