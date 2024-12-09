import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const InfomationProfile = () => {
  const navigation = useNavigation();
  
  // Assume this is the current shop data (you can replace this with a fetch from backend)
  const [shopData, setShopData] = useState({
    shopName: 'Shop A',
    pickupAddress: '123 Main St',
    email: 'shop@example.com',
    phoneNumber: '09123456789',
  });

  useEffect(() => {
    // In a real app, this would be an API call to fetch the current shop data
    // For now, using mock data.
    setShopData({
      shopName: 'Shop A',
      pickupAddress: '123 Main St',
      email: 'shop@example.com',
      phoneNumber: '09123456789',
    });
  }, []);

  const ShopSchema = Yup.object().shape({
    shopName: Yup.string().required('Shop name is required'),
    pickupAddress: Yup.string().required('Pickup address is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Only numbers are allowed')
      .min(10, 'Must be at least 10 digits')
      .required('Phone number is required'),
  });

  const handleRegistration = (values) => {
    Alert.alert('Success', 'Shop Information Updated Successfully!', [{ text: 'OK' }]);
    console.log(values);
    // Here, you would typically update the backend with the new information
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.header}>Edit Information</Text>

        <Formik
          initialValues={{
            shopName: shopData.shopName,
            pickupAddress: shopData.pickupAddress,
            email: shopData.email,
            phoneNumber: shopData.phoneNumber,
          }}
          validationSchema={ShopSchema}
          onSubmit={handleRegistration}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              {/* Shop Name */}
              <Text style={styles.label}>Full Name </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('shopName')}
                onBlur={handleBlur('shopName')}
                value={values.shopName}
                placeholder="Enter shop name"
              />
              {touched.shopName && errors.shopName && (
                <Text style={styles.error}>{errors.shopName}</Text>
              )}

              {/* Pickup Address */}
              <Text style={styles.label}>Pickup Address </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('pickupAddress')}
                onBlur={handleBlur('pickupAddress')}
                value={values.pickupAddress}
                placeholder="Enter pickup address"
              />
              {touched.pickupAddress && errors.pickupAddress && (
                <Text style={styles.error}>{errors.pickupAddress}</Text>
              )}

              {/* Email */}
              <Text style={styles.label}>Email Address </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Enter email"
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              {/* Phone Number */}
              <Text style={styles.label}>Phone Number </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleSubmit();
                  navigation.navigate('#'); // Navigate after submitting
                }}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
    padding: '5%',
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#09320a',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 12,
    color: '#ff0000',
    marginBottom: 10,
  },
});

export default InfomationProfile;
