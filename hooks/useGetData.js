import { useEffect, useState } from "react";
import { getData } from "../utils/getData";

export const useGetData = () => {
  const [authToken, setAuthToken] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [metadata, setMetadata] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    (async () => {
      const token = await getData("authToken");
      setAuthToken(token);
      const userdetail = await getData("userDetails");
      setUserDetails(JSON.parse(userdetail));
      const metaData = await getData("metadata");
      setMetadata(JSON.parse(metaData) || JSON.parse({ moye: "moye" }));
      setIsMounted(true);
    })();
  }, []);
  return { authToken, userDetails, metadata, isMounted };
};
