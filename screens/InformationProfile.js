import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { Formik } from 'formik';
import * as Yup from 'yup';

const InformationProfile = ({ navigation }) => {

  const { userData } = useContext(AuthContext);
  
  // Assume this is the current shop data (you can replace this with a fetch from backend)
  const [userInfo, setUserInfo] = useState({
    first_name: "User A",
    last_name: 'Christmas',
    gender: "",
    deliveryAddress: '123 Main St',
    phoneNumber: '09123456789',
  });

  useEffect(() => {
    // In a real app, this would be an API call to fetch the current shop data
    // For now, using mock data.
    setUserInfo({
      first_name: "User A",
      last_name: 'Christmas',
      gender: "",
      deliveryAddress: '123 Main St',
      phoneNumber: '09123456789',
    });
  }, []);

  const userSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    gender: Yup.string().required('Gender is required'),
    deliveryAddress: Yup.string().required('Delivery address is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Only numbers are allowed')
      .min(11, 'Must be at least 11 digits')
      .required('Phone number is required'),
  });

  const handleRegistration = (values) => {
    Alert.alert('Success', 'User Information Updated Successfully!', 
      [{ 
        text: 'OK', 
        onPress: () => {navigation.goBack();
        }
      }]
    );
    console.log(values);
    // Here, you would typically update the backend with the new information
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.header}>Edit Information</Text>

        <Formik
          initialValues={{
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            gender: userInfo.gender,
            deliveryAddress: userInfo.deliveryAddress,
            phoneNumber: userInfo.phoneNumber,
          }}
          validationSchema={userSchema}
          onSubmit={handleRegistration}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              {/* Shop Name */}
              <Text style={styles.label}>First Name </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={userData.first_name}
                placeholder="Enter first name"
              />
              {touched.first_name && errors.first_name && (
                <Text style={styles.error}>{errors.first_name}</Text>
              )}

              <Text style={styles.label}>Last Name </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={userData.last_name}
                placeholder="Enter last name"
              />
              {touched.last_name && errors.last_name && (
                <Text style={styles.error}>{errors.last_name}</Text>
              )}

              <Text style={styles.label}>Gender </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('gender')}
                onBlur={handleBlur('gender')}
                value={values.gender}
                placeholder="Enter Gender"
              />
              {touched.gender && errors.gender && (
                <Text style={styles.error}>{errors.gender}</Text>
              )}

              {/* Pickup Address */}
              <Text style={styles.label}>Delivery Address </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('deliveryAddress')}
                onBlur={handleBlur('deliveryAddress')}
                value={values.deliveryAddress}
                placeholder="Enter delivery address"
              />
              {touched.pickupAddress && errors.pickupAddress && (
                <Text style={styles.error}>{errors.pickupAddress}</Text>
              )}

              {/* Phone Number */}
              <Text style={styles.label}>Phone Number </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={userData.phone_number || values.phoneNumber}
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
                  handleSubmit(); // Navigate after submitting
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

export default InformationProfile;
