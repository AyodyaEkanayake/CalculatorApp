import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";

export default function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);

  const API_URL = "http://172.16.27.101:8000";

  const calculate = async (operation) => {
    if (a === "" || b === "") {
      Alert.alert("Error", "Please enter both numbers");
      return;
    }

    try {
      // Handle local operations not in backend
      if (operation === "modulus") {
        setResult(Number(a) % Number(b));
        return;
      }
      if (operation === "power") {
        setResult(Math.pow(Number(a), Number(b)));
        return;
      }

      const response = await fetch(
        `${API_URL}/${operation}?a=${a}&b=${b}`
      );
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      Alert.alert("Error", "Cannot reach backend. Make sure your PC and phone are on the same WiFi.");
      console.log(error);
    }
  };

  const clearFields = () => {
    setA("");
    setB("");
    setResult(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💗 My Calculator 💗</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={a}
        onChangeText={setA}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={b}
        onChangeText={setB}
      />

      {/* Row 1 — Basic operations */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => calculate("add")}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => calculate("subtract")}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => calculate("multiply")}>
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => calculate("divide")}>
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>

      {/* Row 2 — Advanced operations */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => calculate("modulus")}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => calculate("power")}>
          <Text style={styles.buttonText}>^</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
          <Text style={styles.buttonText}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resultText}>
        {result !== null ? `Result: ${result}` : "Result will appear here"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffe6f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#d63384",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#d63384",
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#d63384",
    padding: 15,
    borderRadius: 12,
    width: 60,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#ff4d80", // brighter pink for CLEAR
    padding: 15,
    borderRadius: 12,
    width: 120, // wider to fit CLEAR
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 24,
    marginTop: 30,
    color: "#900048",
    fontWeight: "bold",
  },
});
