import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

export default function WelcomeScreen() {
  const navigation = useNavigation(); 

  return (
    <ImageBackground 
      source={require('../images/plate.jpg')} 
      style={styles.background} 
      resizeMode="cover" 
    >
      <View style={styles.container}>
        <Image 
          source={require('../images/Farm to Plate.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        <Text style={styles.title}>Welcome to Farm to Plate!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')} 
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')} 
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(122, 159, 89, 0.7)', 
    width: '100%',
    padding: 20,
  },
  logo: {
    width: 200, 
    height: 200, 
    marginBottom: 20, 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#7A9F59',
  },
});
