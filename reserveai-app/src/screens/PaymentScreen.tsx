import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { reservationId, restaurantName, date, time, people } = route.params as {
    reservationId: number;
    restaurantName: string;
    date: string;
    time: string;
    people: number;
  };
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    // Simula um processamento de pagamento
    setTimeout(() => {
      setProcessing(false);
      Alert.alert('Pagamento Concluído', 'Seu pagamento foi processado com sucesso!');
      navigation.navigate('ReservationFinalization', {
        reservationId,
        restaurantName,
        date,
        time,
        people,
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realizar Pagamento</Text>
      <Text style={styles.subtitle}>Detalhes da Reserva:</Text>
      <Text>Restaurante: {restaurantName}</Text>
      <Text>Data: {date}</Text>
      <Text>Hora: {time}</Text>
      <Text>Pessoas: {people}</Text>
      <Text style={styles.amount}>Valor Total: R$ 50,00 (Exemplo)</Text>

      <Button
        title={processing ? 'Processando Pagamento...' : 'Pagar Agora'}
        onPress={handlePayment}
        disabled={processing}
      />
      {processing && <ActivityIndicator size="small" color="#0000ff" style={styles.spinner} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'green',
  },
  spinner: {
    marginTop: 10,
  },
});

export default PaymentScreen;