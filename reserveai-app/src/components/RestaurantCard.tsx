import React from 'react';
import { Card, Text, Avatar, Button } from 'react-native-paper';

export default function RestaurantCard({ item, onReserve }: any) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <Card.Title title={item.name} subtitle={`Capacidade: ${item.maxCapacity}`} left={() => <Avatar.Image size={40} source={{ uri: item.logoUrl }} />} />
      {item.policies?.length ? (
        <Card.Content>
          <Text variant="bodySmall">Políticas:</Text>
          {item.policies.map((p: string, i: number) => (
            <Text key={i} variant="bodySmall">• {p}</Text>
          ))}
        </Card.Content>
      ) : null}
      <Card.Actions>
        <Button mode="contained" onPress={onReserve}>Reservar</Button>
      </Card.Actions>
    </Card>
  );
}
