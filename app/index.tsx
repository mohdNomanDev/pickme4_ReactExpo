import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

export default function Home() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/auth/login"} />;
}
