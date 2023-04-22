/* eslint-disable react/react-in-jsx-scope */
import { SWRConfig } from "swr";
import { StyleSheet } from "react-native";
import NavigationContainer from "./src/navigation/NavigationContainer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SwrProviderConfig } from "./src/provider/SwrProvider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store";
export default function App() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SWRConfig
        value={SwrProviderConfig}>
            <SafeAreaProvider>
              <GestureHandlerRootView style={styles.container}>
                <NavigationContainer />
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </SWRConfig>
        </PersistGate>
      </Provider>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
