import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';

const TableSelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurantId, restaurantName } = route.params as { restaurantId: number; restaurantName: string };

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [people, setPeople] = useState('1');

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const handleNext = () => {
    navigation.navigate('ReservationConfirmation', {
      restaurantId,
      restaurantName,
      date: date.toISOString().split('T')[0],
      time: time.toTimeString().split(' ')[0].substring(0, 5),
      people: parseInt(people),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservar em {restaurantName}</Text>

      <TextInput
        label="Número de Pessoas"
        value={people}
        onChangeText={setPeople}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Data:</Text>
        <Button onPress={() => setShowDatePicker(true)} title={date.toLocaleDateString()} />
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Hora:</Text>
        <Button onPress={() => setShowTimePicker(true)} title={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
      </View>

      <Button title="Continuar" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default TableSelectionScreen;