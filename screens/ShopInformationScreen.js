import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShopInformationScreen = () => {
  const [shopInfo, setShopInfo] = useState({
    shopName: '',
    pickupAddress: '',
    email: '',
    phone: '',
  });

  const navigation = useNavigation();

  const handleSave = () => {
    Alert.alert('Success', 'Shop Information Saved!', [{ text: 'OK' }]);
    console.log(shopInfo);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.header}>Shop Information</Text>

        {/* Shop Name */}
        <Text style={styles.label}>Shop Name *</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter shop name"
            onChangeText={(text) => setShopInfo({ ...shopInfo, shopName: text })}
            value={shopInfo.shopName}
            maxLength={30}
          />
          <Text style={styles.charCount}>{shopInfo.shopName.length}/30</Text>
        </View>

        {/* Pickup Address */}
        <Text style={styles.label}>Pickup Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pickup address"
          onChangeText={(text) => setShopInfo({ ...shopInfo, pickupAddress: text })}
          value={shopInfo.pickupAddress}
        />

        {/* Email */}
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          onChangeText={(text) => setShopInfo({ ...shopInfo, email: text })}
          value={shopInfo.email}
        />

        {/* Phone Number */}
        <Text style={styles.label}>Phone *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          onChangeText={(text) => setShopInfo({ ...shopInfo, phone: text })}
          value={shopInfo.phone}
        />

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            navigation.navigate('VerNum');
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: '5%',
    paddingVertical: '10%',
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '100%',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 45,
    marginBottom: 5,
    backgroundColor: '#fff',
    fontSize: 14,
    width: '100%',
  },
  charCount: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
    marginTop: 5,  // Adjust the space between input and character count
  },
  nextButton: {
    backgroundColor: '#09320a',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShopInformationScreen;
