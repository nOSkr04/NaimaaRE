/* eslint-disable react/react-in-jsx-scope */
import { SWRConfig } from "swr";
import { AppState, AppStateStatus, StyleSheet } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import NavigationContainer from "./src/navigation/NavigationContainer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
    return (
      <SWRConfig
        value={{
          provider: () => new Map(),
          initFocus(callback) {
            let appState = AppState.currentState;

            const handleAppStateChange = (nextAppState: AppStateStatus) => {
              if (appState.match(/inactive|background/) && nextAppState === "active") {
                callback();
              }
              appState = nextAppState;
            };

            const subscription = AppState.addEventListener("change", handleAppStateChange);

            return () => {
              subscription.remove();
            };
          },
          initReconnect(callback) {
            let isConnected = true;

            const handleNetStateChange = (nextNetState: NetInfoState) => {
              if (!isConnected && nextNetState.isConnected) {
                callback();
              }

              isConnected = !!nextNetState.isConnected;
            };

            const unsubscribe = NetInfo.addEventListener(handleNetStateChange);

            return () => {
              unsubscribe();
            };
          },
        }}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.container}>
            <NavigationContainer />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SWRConfig>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
