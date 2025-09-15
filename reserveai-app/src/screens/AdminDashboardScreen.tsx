import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { api } from '../services/api';
import ReservationCard from '../components/ReservationCard';

export default function AdminDashboardScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [reason, setReason] = useState('');

  const fetchAll = () => api.get('/reservations').then(({ data }) => setData(data)).finally(() => setLoading(false));

  useEffect(() => { fetchAll(); }, []);

  const update = async (status: string) => {
    if (!selected) return;
    await api.patch(`/reservations/${selected.id}/status`, { status, rejectionReason: status === 'rejected' ? reason : undefined });
    setVisible(false); setReason(''); setSelected(null); fetchAll();
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header><Appbar.Content title="Painel Admin" /></Appbar.Header>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {data.map(item => (
            <View key={item.id} style={{ marginBottom: 12 }}>
              <ReservationCard item={item} />
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                <Button mode='contained' onPress={() => { setSelected(item); update('confirmed'); }}>Confirmar</Button>
                <Button mode='outlined' onPress={() => { setSelected(item); setVisible(true); }}>Recusar</Button>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Motivo da recusa</Dialog.Title>
          <Dialog.Content>
            <Text>Informe um motivo para o cliente</Text>
            <TextInput value={reason} onChangeText={setReason} placeholder='Ex.: lotação no horário' />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancelar</Button>
            <Button onPress={() => update('rejected')}>Recusar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
