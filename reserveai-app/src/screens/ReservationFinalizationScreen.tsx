import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ReservationFinalizationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurantName, date, time, people } = route.params as {
    restaurantName: string;
    date: string;
    time: string;
    people: number;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva Confirmada!</Text>
      <Text style={styles.message}>Sua reserva foi realizada com sucesso.</Text>

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

      <Button title="Voltar para o Início" onPress={() => navigation.navigate("Home")} />
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  message: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    width: '100%',
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

export default ReservationFinalizationScreen;