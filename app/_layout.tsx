import { Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

import "../i18n"; // Initialize i18n
import { store } from "../store/store";
import { Provider, useDispatch } from 'react-redux'
import { syncLanguage } from "../store/languageSlice";

function RootLayoutContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Sync Redux state after i18n has finished its internal async loading
    dispatch(syncLanguage());
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}
