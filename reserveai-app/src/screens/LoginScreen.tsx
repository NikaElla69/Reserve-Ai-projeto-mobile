import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('cliente@demo.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const ok = await login(email, password);
    if (!ok) setError('Falha no login.');
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>ReserveAí</Text>
      <TextInput label="E-mail" value={email} autoCapitalize='none' onChangeText={setEmail} style={{ marginBottom: 12 }} />
      <TextInput label="Senha" value={password} secureTextEntry onChangeText={setPassword} style={{ marginBottom: 4 }} />
      {!!error && <HelperText type="error">{error}</HelperText>}
      <Button mode="contained" onPress={handleLogin} style={{ marginTop: 8 }}>Entrar</Button>
      <HelperText>Admin: admin@reserveai.com / admin</HelperText>
    </View>
  );
}
