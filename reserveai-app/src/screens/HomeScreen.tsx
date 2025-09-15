import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Appbar, Button } from 'react-native-paper';
import { api } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigation<any>();
  const { user, logout } = useAuth();

  useEffect(() => {
    api.get('/restaurants').then(({ data }) => setData(data)).finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="ReserveAí" subtitle={user?.role === 'admin' ? 'Admin' : 'Cliente'} />
        <Appbar.Action icon="calendar" onPress={() => nav.navigate('MinhasReservas')} />
        {user?.role === 'admin' && <Appbar.Action icon="view-dashboard" onPress={() => nav.navigate('Admin')} />}
        <Appbar.Action icon="logout" onPress={logout} />
      </Appbar.Header>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {data.map(item => (
            <RestaurantCard key={item.id} item={item} onReserve={() => nav.navigate('NovaReserva', { restaurant: item })} />
          ))}
        </ScrollView>
      )}
      <View style={{ padding: 16 }}>
        <Button mode="contained" onPress={() => nav.navigate('MinhasReservas')}>Ver minhas reservas</Button>
      </View>
    </View>
  );
}
