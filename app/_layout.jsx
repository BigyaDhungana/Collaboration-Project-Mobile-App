import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toast from "react-native-toast-message";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { getData } from "../utils/getData";

const Layout = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Toast/>
    </QueryClientProvider>
  );
};

export default Layout;
