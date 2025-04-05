// App.js
import Parse from 'parse';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Checkbox, Text, TextInput } from 'react-native-paper';

Parse.setAsyncStorage(require('@react-native-async-storage/async-storage').default);
Parse.initialize('M9XntrtGnh7Y4ZwmG37a9kFLiPN10iBAIDMUHWkf', 'bnCZiNuON0mWrDpjFXmnKt2kzfnrXclewgWwW9Tu');
Parse.serverURL = 'https://parseapi.back4app.com/';



export default function App() {

    interface Tarefa extends Parse.Object {
        get(key: 'descricao'): string;
        get(key: 'concluida'): boolean;
        set(key: 'descricao', value: string): this;
        set(key: 'concluida', value: boolean): this;
      }
    const [descricao, setDescricao] = useState('');
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  
    const buscarTarefas = async () => {
      try {
        const Tarefa = Parse.Object.extend('Tarefa');
        const query = new Parse.Query(Tarefa);
        const results = await query.find();
        setTarefas(results);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };
  
    const adicionarTarefa = async () => {
      alert('Botão pressionado!'); 
    
      if (!descricao.trim()) return;
    
      try {
        const Tarefa = Parse.Object.extend('Tarefa');
        const novaTarefa = new Tarefa();
        novaTarefa.set('descricao', descricao);
        novaTarefa.set('concluida', false);
        await novaTarefa.save();
    
        alert('Tarefa adicionada!'); 
    
        setDescricao('');
        buscarTarefas();
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        alert('Erro: ' + JSON.stringify(error)); 
      }
    };
    
  
    const alternarConcluida = async (tarefa: Tarefa) => {
        tarefa.set('concluida', !tarefa.get('concluida'));
        await tarefa.save();
        buscarTarefas();
      };
  
    useEffect(() => {
      buscarTarefas();
    }, []);
  
    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>Minhas Tarefas</Text>
        <TextInput
          label="Nova Tarefa"
          value={descricao}
          onChangeText={setDescricao}
          style={styles.input}
        />
        <Button mode="contained" onPress={adicionarTarefa} style={styles.botao}>
          Adicionar
        </Button>
        <FlatList
          data={tarefas}
          keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Checkbox
                  status={item.get('concluida') ? 'checked' : 'unchecked'}
                  onPress={() => alternarConcluida(item)}
                />
                <Text style={item.get('concluida') && styles.concluida}>
                  {item.get('descricao')}
                </Text>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop: 50,
      backgroundColor: '#f4f4f4',
    },
    title: {
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      marginBottom: 10,
    },
    botao: {
      marginBottom: 20,
    },
    card: {
      marginBottom: 10,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    concluida: {
      textDecorationLine: 'line-through',
      color: 'gray',
    },
  });