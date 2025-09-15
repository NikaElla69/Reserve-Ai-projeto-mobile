import React from 'react';
import { Card, Text, Chip } from 'react-native-paper';

const colorByStatus: Record<string, string> = {
  pending: '#FFA000',
  confirmed: '#2E7D32',
  rejected: '#D32F2F',
  cancelled: '#616161',
  seated: '#1976D2',
  no_show: '#6A1B9A'
};

export default function ReservationCard({ item }: any) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <Card.Title title={`${item.date} às ${item.time} • ${item.people} pessoas`} subtitle={`Reserva #${item.id}`} />
      <Card.Content>
        <Chip style={{ alignSelf: 'flex-start', backgroundColor: colorByStatus[item.status] || '#ccc' }} textStyle={{ color: 'white' }}>
          {item.status}
        </Chip>
        {item.rejectionReason ? <Text style={{ marginTop: 8 }}>Motivo: {item.rejectionReason}</Text> : null}
      </Card.Content>
    </Card>
  );
}
