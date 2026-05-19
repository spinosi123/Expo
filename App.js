
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Bills');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    saveExpenses();
  }, [expenses]);

  const saveExpenses = async () => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (e) {
      console.log(e);
    }
  };

  const loadExpenses = async () => {
    try {
      const data = await AsyncStorage.getItem('expenses');
      if (data) {
        setExpenses(JSON.parse(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addExpense = () => {
    if (!expenseName || !amount) return;

    const newExpense = {
      id: Date.now().toString(),
      name: expenseName,
      category,
      amount: parseFloat(amount),
    };

    setExpenses([newExpense, ...expenses]);

    setExpenseName('');
    setAmount('');
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pocket Budget</Text>

      <Text style={styles.total}>
        Total Spent: ${totalSpent.toFixed(2)}
      </Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Expense Name"
          placeholderTextColor="#999"
          value={expenseName}
          onChangeText={setExpenseName}
          style={styles.input}
        />

        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Bills" value="Bills" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Gas" value="Gas" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Utilities" value="Utilities" />
          <Picker.Item label="Savings" value="Savings" />
        </Picker>

        <TextInput
          placeholder="Amount"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={addExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={styles.expenseName}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>

            <Text style={styles.amount}>
              ${item.amount.toFixed(2)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  total: {
    color: '#00E676',
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: 'white',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  picker: {
    backgroundColor: '#2A2A2A',
    color: 'white',
    marginBottom: 12,
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#2962FF',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  expenseItem: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    color: '#AAA',
    marginTop: 4,
  },
  amount: {
    color: '#00E676',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
