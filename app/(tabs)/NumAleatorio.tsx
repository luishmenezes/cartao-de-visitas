import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import profile from '../../assets/images/fotoNumAleatorio.webp';


const App = () => {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const generateRandomNumber = () => {
    const minValue = parseInt(min, 10);
    const maxValue = parseInt(max, 10);

    if (isNaN(minValue) || isNaN(maxValue)) {
      Alert.alert('Erro', 'Digite valores numéricos válidos.');
      return;
    }
    if (minValue >= maxValue) {
      Alert.alert('Erro', 'O valor mínimo deve ser menor que o máximo.');
      return;
    }

    const result = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    setRandomNumber(result);
  };

  return (
    <View style={styles.container}>
        <Image source={profile} style={styles.fotoAleatorioNum} /> 
      <Text style={styles.title}>Gerador de Números Aleatórios</Text>

      <TextInput
        style={styles.input}
        placeholder="Valor Mínimo"
        keyboardType="numeric"
        value={min}
        onChangeText={setMin}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor Máximo"
        keyboardType="numeric"
        value={max}
        onChangeText={setMax}
      />

      <Button title="Gerar Número" onPress={generateRandomNumber} color="#214cce" />

      {randomNumber !== null && (
        <Text style={styles.result}>Número Gerado: {randomNumber}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#214cce',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#214cce',
  },

  fotoAleatorioNum: {
    width: 80, 
    height: 100, 
    borderRadius: 50, 
    marginTop: 80, 
  }
});

export default App;