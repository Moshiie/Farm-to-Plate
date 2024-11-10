import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const scaleAnimation = new Animated.Value(1);

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={require('../images/plate.jpg')} 
        style={styles.background} 
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
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
              activeOpacity={0.8}
              onPress={() => {
                animateButtonPress();
                navigation.navigate('Login');
              }}
            >
              <Animated.View style={[styles.buttonGradient, { transform: [{ scale: scaleAnimation }] }]}>
                <Ionicons name="log-in-outline" size={24} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Login</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => {
                animateButtonPress();
                navigation.navigate('Signup');
              }}
            >
              <Animated.View style={[styles.buttonGradient, { transform: [{ scale: scaleAnimation }] }]}>
                <Ionicons name="person-add-outline" size={24} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Sign Up</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#7A9F59',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '90%',
    borderRadius: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  button: {
    width: '80%',
    marginBottom: 20,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#7A9F59',
    borderColor: '#4C7D2D',
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
