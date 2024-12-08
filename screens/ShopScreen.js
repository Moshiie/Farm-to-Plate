import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation

const ShopScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Welcome to Farm to Plate!</Text>

      {/* Description */}
      <Text style={styles.description}>
        To get started, register as a seller by providing the necessary information.
      </Text>

      {/* Start Registration Button */}
      <TouchableOpacity
        style={styles.startRegistrationButton}
        onPress={() => console.log('Test OnPress Navigate to Shop Registration')} // Navigate to registration screen
      >
        <Text style={styles.startRegistrationText}>Start Registration</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  startRegistrationButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  startRegistrationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShopScreen;