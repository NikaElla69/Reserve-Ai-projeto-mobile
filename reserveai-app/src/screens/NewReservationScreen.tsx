import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, HelperText, Text } from 'react-native-paper';
import { api } from '../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function NewReservationScreen() {
  const route = useRoute<any>();
  const restaurant = route.params?.restaurant;
  const nav = useNavigation<any>();

  const [people, setPeople] = useState('2');
  const [date, setDate] = useState('2025-09-14');
  const [time, setTime] = useState('20:00');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      await api.post('/reservations', { restaurantId: restaurant.id, people, date, time, note });
      nav.navigate('MinhasReservas');
    } catch (e: any) {
      setError('Não foi possível criar a reserva.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="titleLarge" style={{ marginBottom: 12 }}>{restaurant?.name}</Text>
      <TextInput label="Pessoas" value={people} onChangeText={setPeople} keyboardType='numeric' style={{ marginBottom: 8 }} />
      <TextInput label="Data (YYYY-MM-DD)" value={date} onChangeText={setDate} style={{ marginBottom: 8 }} />
      <TextInput label="Hora (HH:mm)" value={time} onChangeText={setTime} style={{ marginBottom: 8 }} />
      <TextInput label="Observação" value={note} onChangeText={setNote} multiline style={{ marginBottom: 8 }} />
      {!!error && <HelperText type='error'>{error}</HelperText>}
      <Button mode='contained' onPress={submit}>Solicitar reserva</Button>
    </View>
  );
}
