import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../config/api'; // Ajustado para api.ts

const ReservationConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurantId, restaurantName, date, time, people } = route.params as {
    restaurantId: number;
    restaurantName: string;
    date: string;
    time: string;
    people: number;
  };
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleConfirmReservation = async () => {
    if (!user || !token) {
      Alert.alert('Login Necessário', 'Você precisa estar logado para finalizar a reserva.', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Fazer Login', onPress: () => navigation.navigate('Login') },
      ]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/reservations`,
        {
          restaurantId,
          date,
          time,
          people,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Sucesso', 'Reserva criada com sucesso! Prossiga para o pagamento.');
      navigation.navigate('PaymentScreen', { reservationId: response.data.id, restaurantName, date, time, people });
    } catch (error) {
      console.error('Erro ao confirmar reserva:', error);
      Alert.alert('Erro', 'Não foi possível confirmar a reserva. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar Reserva</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Restaurante:</Text>
        <Text style={styles.value}>{restaurantName}</Text>

        <Text style={styles.label}>Data:</Text>
        <Text style={styles.value}>{date}</Text>

        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.value}>{time}</Text>

        <Text style={styles.label}>Pessoas:</Text>
        <Text style={styles.value}>{people}</Text>
      </View>

      <Button
        title={loading ? 'Confirmando...' : 'Confirmar e Pagar'}
        onPress={handleConfirmReservation}
        disabled={loading}
      />
      {!user && (
        <Button
          title="Fazer Login / Cadastrar"
          onPress={() => navigation.navigate('Login')}
          color="#841584"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ReservationConfirmationScreen;