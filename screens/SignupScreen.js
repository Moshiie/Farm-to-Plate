import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
  const navigation = useNavigation();
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(0));

  const handleSignup = () => {
    setModalVisible(true);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    setFullName('');
    setEmail('');
    setPassword('');
  };

  const closeModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 400,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleContinue = () => {
    closeModal();
    navigation.navigate('Login');
  };

  const animatedModalStyle = {
    transform: [
      {
        scale: modalAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1],
        }),
      },
    ],
    opacity: modalAnimation,
  };

  return (
    <ImageBackground
      source={require('../images/plate.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#fff"
          value={fullname}
          onChangeText={setFullName}
        />
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
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalView, animatedModalStyle]}>
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>✖</Text>
              </Pressable>
              <View style={styles.modalHeader}>
                <Icon name="check-circle" size={40} color="#fff" />
                <Text style={styles.successText}>SUCCESS</Text>
              </View>
              {/* Centered View for Modal Message and Tips */}
              <View style={styles.centeredTextContainer}>
                <Text style={styles.modalMessage}>Your account has been created!</Text>
                <Text style={styles.modalTips}>You can now log in and start using the app.</Text>
              </View>
              <Pressable style={styles.modalButton} onPress={handleContinue}>
                <Text style={styles.modalButtonText}>Continue</Text>
              </Pressable>
            </Animated.View>
          </View>
        </Modal>
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
  signupButton: {
    width: width * 0.8,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  signupButtonText: {
    fontSize: 18,
    color: '#7A9F59',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.3,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#3D6F3D',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3D6F3D',
    width: '100%',
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  centeredTextContainer: {
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically if needed
    marginBottom: 20, // Space between the text and the button
  },
  modalMessage: {
    fontSize: 18,
    color: '#3D6F3D',
    fontWeight: 'bold',
    textAlign: 'center', // Centered text
  },
  modalTips: {
    fontSize: 14,
    color: '#3D6F3D',
    textAlign: 'center', // Centered text
  },
  modalButton: {
    backgroundColor: '#3D6F3D',
    padding: 12,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
    elevation: 2,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
