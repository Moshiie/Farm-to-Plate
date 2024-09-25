import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import SignupScreen from '../screens/SignupScreen';
import RecoveryScreen from '../screens/RecoveryScreen';
import WelcomeScreen from '../screens/WelcomeScreen'; // Import WelcomeScreen

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome" 
      screenOptions={{
        headerShown: false, 
      }}
    >
      {/* Welcome Screen */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      {/* Authentication Screens */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Recovery" component={RecoveryScreen} />

      {/* Main App Screens */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
