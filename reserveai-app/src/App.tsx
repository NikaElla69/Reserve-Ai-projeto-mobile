import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation';
import { theme } from './theme';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme as any}>
        <StatusBar style="auto" />
        <RootNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}
