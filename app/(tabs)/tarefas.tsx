// App.js (ou App.tsx, idealmente)
import Parse from 'parse/react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Checkbox, Text, TextInput } from 'react-native-paper';

Parse.setAsyncStorage(require('@react-native-async-storage/async-storage').default);
Parse.initialize('M9XntrtGnh7Y4ZwmG37a9kFLiPN10iBAIDMUHWkf', 'bnCZiNuON0mWrDpjFXmnKt2kzfnrXclewgWwW9Tu');
Parse.serverURL = 'https://parseapi.back4app.com/';


class Tarefa extends Parse.Object {
  constructor() {
    super('Tarefa');
  }

  get descricao(): string {
    return this.get('descricao');
  }

  set descricao(value: string) {
    this.set('descricao', value);
  }

  get concluida(): boolean {
    return this.get('concluida');
  }

  set concluida(value: boolean) {
    this.set('concluida', value);
  }
}


Parse.Object.registerSubclass('Tarefa', Tarefa);

export default function App() {
  const [descricao, setDescricao] = useState('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const buscarTarefas = async () => {
    try {
      const query = new Parse.Query(Tarefa);
      const results = await query.find();
      setTarefas(results);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const adicionarTarefa = async () => {
    if (!descricao.trim()) return;

    try {
      const novaTarefa = new Tarefa();
      novaTarefa.descricao = descricao;
      novaTarefa.concluida = false;
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
    tarefa.concluida = !tarefa.concluida;
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
                status={item.concluida ? 'checked' : 'unchecked'}
                onPress={() => alternarConcluida(item)}
              />
              <Text style={item.concluida && styles.concluida}>
                {item.descricao}
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
