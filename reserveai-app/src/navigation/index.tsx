import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import MyReservationsScreen from '../screens/MyReservationsScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import RestaurantSelectionScreen from '../screens/RestaurantSelectionScreen';
import TableSelectionScreen from '../screens/TableSelectionScreen';
import ReservationConfirmationScreen from '../screens/ReservationConfirmationScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ReservationFinalizationScreen from '../screens/ReservationFinalizationScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token, user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RestaurantSelection"> // Definido como tela inicial
        <Stack.Screen name="RestaurantSelection" component={RestaurantSelectionScreen} options={{ title: 'Selecionar Restaurante' }} />
        <Stack.Screen name="TableSelection" component={TableSelectionScreen} options={{ title: 'Selecionar Mesa' }} />
        <Stack.Screen name="ReservationConfirmation" component={ReservationConfirmationScreen} options={{ title: 'Confirmar Reserva' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        {token ? (
          <> {/* Telas que exigem autenticação */}
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Pagamento' }} />
            <Stack.Screen name="ReservationFinalization" component={ReservationFinalizationScreen} options={{ title: 'Reserva Finalizada' }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ReserveAí' }} />
            <Stack.Screen name="MyReservations" component={MyReservationsScreen} options={{ title: 'Minhas Reservas' }} />
            {user?.role === 'admin' && (
              <Stack.Screen name="Admin" component={AdminDashboardScreen} options={{ title: 'Painel Admin' }} />
            )}
          </>
        ) : (
          // Se não estiver logado, estas telas não são diretamente acessíveis via navegação.
          // A ReservationConfirmationScreen irá solicitar o login quando necessário.
          null
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}