import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { api } from '../services/api';
import ReservationCard from '../components/ReservationCard';

export default function MyReservationsScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reservations/me').then(({ data }) => setData(data)).finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header><Appbar.Content title="Minhas Reservas" /></Appbar.Header>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {data.map(item => <ReservationCard key={item.id} item={item} />)}
        </ScrollView>
      )}
    </View>
  );
}
