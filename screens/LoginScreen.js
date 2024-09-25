import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={require('../images/plate.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.passwordContainer}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              style={styles.checkbox}
              onClick={() => setShowPassword(!showPassword)}
              isChecked={showPassword}
              checkBoxColor="#fff"
            />
            <Text style={styles.checkboxText}>Show Password</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}>Sign up here</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: '#fff',
    marginBottom: 50,
  },
  input: {
    width: width * 0.8,
    height: 50,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
    marginBottom: 30,
    fontSize: 18,
  },
  passwordContainer: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: '#fff',
    fontSize: 12,
  },
  forgotPassword: {
    color: '#fff',
    fontSize: 12,
    textDecorationLine: 'underline',
    marginLeft: 20,
    textAlign: 'center',
  },
  loginButton: {
    width: width * 0.8,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#7A9F59',
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
  },
  signupLink: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
