import React, { useEffect, useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const AddressScreen = ({ navigation }) => {
  
  const { userAuthData } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      const userId = userAuthData.uid;
      const userAddressesRef = collection(db, `users/${userId}/addresses`);
      const querySnapshot = await getDocs(userAddressesRef);

      const fetchedAddresses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAddresses(fetchedAddresses);

    } catch (error) {
      console.error('Error fetching addresses:', error);

    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      const userId = userAuthData.uid;

      // Reset all other addresses to `isdefault: false`
      const updates = addresses.map(address =>
        updateDoc(doc(db, `users/${userId}/addresses`, address.id), {
          isdefault: address.id === addressId,
        })
      );

      await Promise.all(updates);

      fetchAddresses();

    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userAuthData]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2E4C2D" />
      </View>
    );
  }

  return (
    <View contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddressForm')} style={styles.headerButton}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Address Details */}
      <ScrollView style={styles.detailsContainer}>
        {addresses.length > 0 ? (
          addresses.map(address => (
            <View key={address.id} style={styles.detailRow}>
              <Ionicons name="location-outline" size={24} color="#2E4C2D" />
              <View style={styles.detailTextContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.detailText}>{address.name}</Text>
                  <Text style={styles.typeText}>({address.address_type})</Text>
                </View>
                <Text style={styles.subText}>{address.phone_number}</Text>
                <Text style={styles.subText}>
                  {address.address_line_1}, {address.barangay}, {address.city}, {address.zip_code}
                </Text>
                {address.isdefault && <Text style={styles.defaultBadge}>Default</Text>}
              </View>
              <View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('AddressForm', { isEdit: true, addressData: address })}
                >
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                {!address.isdefault && (
                  <TouchableOpacity
                    style={styles.defaultButton}
                    onPress={() => setDefaultAddress(address.id)}
                  >
                    <Text style={styles.defaultText}>Set as Default</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noAddressesText}>No addresses available. Add one!</Text>
        )}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8D6C5', // Light green for the background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E4C2D',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  detailsContainer: {
    padding: 15,
  },
  detailRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    marginBottom: 10,
  },
  detailTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#2E4C2D',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
  editButton: {
    alignItems: 'flex-end',
  },
  editText: {
    color: '#2E4C2D',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AddressScreen;
