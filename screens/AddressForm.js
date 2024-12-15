import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Switch
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { doc, collection, addDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { db, batch } from '../firebaseConfig'; 
import { AuthContext } from '../providers/AuthProvider';

const AddressForm = ({ navigation, route }) => {

  const { userAuthData } = useContext(AuthContext);
  const { isEdit = false, addressData = null } = route.params || {}; 

  const [name, setName] = useState(addressData?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(addressData?.phone_number || '');
  const [addressLine1, setAddressLine1] = useState(addressData?.address_line_1 || '');
  const [barangay, setBarangay] = useState(addressData?.barangay || '');
  const [city, setCity] = useState(addressData?.city || '');
  const [zipCode, setZipCode] = useState(addressData?.zip_code || '');
  const [addressType, setAddressType] = useState(addressData?.address_type || 'delivery');
  const [isDefault, setIsDefault] = useState(addressData?.isdefault || false);
  const [region, setRegion] = useState(
    addressData?.region || {
      latitude: 8.484722, 
      longitude: 124.656278, 
      latitudeDelta: 0.005,
      longitudeDelta: 0.005, 
    }
  );
  
  useEffect(() => {
    if (isEdit && addressData) {
      setRegion(addressData.region || region);
    }
  }, [isEdit, addressData]);
  
  const handleSave = async () => {
    if (!addressLine1 || !city || !zipCode || !name || !phoneNumber || !barangay) {
      Alert.alert('Validation Error', 'All fields are required!');
      return;
    }

    const userId = userAuthData.uid;
    const userAddressesRef = collection(db, `users/${userId}/addresses`);

    try {
      if (isEdit) {
        const docRef = doc(userAddressesRef, addressData.id);
        await updateDoc(docRef, {
          name: name,
          phone_number: phoneNumber,
          address_line_1: addressLine1,
          barangay: barangay,
          city: city,
          zip_code: zipCode,
          address_type: addressType,
          isdefault: isDefault,
          region,
        });
        Alert.alert('Success', 'Address updated successfully!');

      } else {

        const batchUpdates = [];

        if (isDefault) {
          // Reset previous default address
          const defaultQuery = query(userAddressesRef, where('isdefault', '==', true));
          const defaultAddresses = await getDocs(defaultQuery);

          defaultAddresses.forEach((doc) => {
            batch.update(doc.ref, { isdefault: false });
            batchUpdates.push(true);
          });
        }

        if (batchUpdates.length > 0) {
          await batch.commit(); // Commit batch updates only if needed
        }
  
        await addDoc(userAddressesRef, {
          name: name,
          phone_number: phoneNumber,
          address_line_1: addressLine1,
          barangay: barangay,
          city: city,
          zip_code: zipCode,
          address_type: addressType,
          isdefault: isDefault,
          region,
        });
        Alert.alert('Success', 'Address added successfully!');
      }
      navigation.goBack();

    } catch (error) {
      console.error('Error saving address:', error);
      Alert.alert('Error', 'Failed to save address. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEdit ? 'Edit Address' : 'Add Address'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="House Number, Street Name, and Apartment/Flat number"
        value={addressLine1}
        onChangeText={setAddressLine1}
      />
      <TextInput
        style={styles.input}
        placeholder="Barangay"
        value={barangay}
        onChangeText={setBarangay}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="numeric"
      />

      {/* Navigate to the Map Screen to select Address */}
      <TouchableOpacity onPress={() => navigation.navigate('MapScreen', { initialRegion: region })}>
        <Text style={styles.link}>Set Address on Map</Text>
      </TouchableOpacity>
      
      <Text style={styles.label}>Address Type:</Text>
      <TouchableOpacity onPress={() => setAddressType('delivery')}>
        <Text style={addressType === 'delivery' ? styles.selected : styles.option}>Delivery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setAddressType('pickup')}>
        <Text style={addressType === 'pickup' ? styles.selected : styles.option}>Pickup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setAddressType('return')}>
        <Text style={addressType === 'return' ? styles.selected : styles.option}>Return</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <Text style={styles.label}>Set as Default:</Text>
        <Switch value={isDefault} onValueChange={setIsDefault} />
      </View>
      <Button title="Save Address" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  mapContainer: {
    height: 250,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  link: { 
    color: '#007BFF', 
    textDecorationLine: 'underline' 
  },
  map: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  option: {
    fontSize: 16,
    color: '#555',
  },
  selected: {
    fontSize: 16,
    color: '#7A9F59',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default AddressForm;
