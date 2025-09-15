import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NewReservationScreen from '../screens/NewReservationScreen';
import MyReservationsScreen from '../screens/MyReservationsScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token, user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ReserveAí' }} />
            <Stack.Screen name="NovaReserva" component={NewReservationScreen} options={{ title: 'Nova Reserva' }} />
            <Stack.Screen name="MinhasReservas" component={MyReservationsScreen} options={{ title: 'Minhas Reservas' }} />
            {user?.role === 'admin' && (
              <Stack.Screen name="Admin" component={AdminDashboardScreen} options={{ title: 'Painel Admin' }} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
