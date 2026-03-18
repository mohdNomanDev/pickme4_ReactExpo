import { Stack } from "expo-router";
import "../global.css";
import { store } from "../store/store";
import { Provider } from 'react-redux'

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </Provider>
  );
}
