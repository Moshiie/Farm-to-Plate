import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';

const ShopDashboardScreen = ({ navigation }) => {
  const [farmerDetails, setFarmerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userAuthData } = useContext(AuthContext);

  const fetchFarmerDetails = async () => {
    try {
      setLoading(true);
      const userId = userAuthData?.uid;
      if (userId) {
        const farmerRef = collection(db, 'users', userId, 'farmer_details');
        const farmerQuery = query(farmerRef, where('farmer_id', '==', userId));
        const farmerSnapshot = await getDocs(farmerQuery);

        if (!farmerSnapshot.empty) {
          const fetchedDetails = farmerSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFarmerDetails(fetchedDetails[0]);
        } else {
          console.log('No farmer details found!');
        }
      }
    } catch (error) {
      console.error('Error fetching farmer details:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFarmerDetails();
  }, [userAuthData]);

  useFocusEffect(
    useCallback(() => {
      fetchFarmerDetails();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.shopName}>{farmerDetails?.store_name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateShopProfile', { farmerDetails } )}>
          <MaterialIcons name="account-circle" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Store Photo */}
      <View style={styles.photoContainer}>
        {farmerDetails?.store_photo ? (
          <Image source={{ uri: farmerDetails.store_photo }} style={styles.storePhoto} />
        ) : (
          <Image source={require('../images/veg.jpg')} style={styles.storePhoto} />
        )}
      </View>

      {/* Store Details */}
      <View style={styles.secondContainer}>

        {/* Feature Buttons */}
        <View style={styles.featureButtonsContainer}>
          <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('ProductList')}>
            <MaterialIcons name="inventory" size={24} color="#FFF" />
            <Text style={styles.featureButtonText}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('OrderList')}>
            <MaterialIcons name="local-shipping" size={24} color="#FFF" />
            <Text style={styles.featureButtonText}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Addresses')}>
            <MaterialIcons name="location-on" size={24} color="#FFF" />
            <Text style={styles.featureButtonText}>Addresses</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Store Description:</Text>
          <Text style={styles.detailValue}>{farmerDetails?.store_description || 'No description provided.'}</Text>

          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{farmerDetails?.phone_number || 'Not available'}</Text>

          <Text style={styles.detailLabel}>Approval Status:</Text>
          <Text style={[styles.detailValue, farmerDetails?.approval_status === 'approved' ? styles.approved : styles.pending]}>
            {farmerDetails?.approval_status?.toUpperCase() || 'Pending'}
          </Text>
        </View>

        {/* Pickup Address */}
        <View style={styles.addressContainer}>
          <Text style={styles.sectionTitle}>Default Pickup Address</Text>
          {farmerDetails?.default_pickup_address ? (
            <>
              <Text style={styles.addressField}>{farmerDetails.default_pickup_address.name}</Text>
              <Text style={styles.addressField}>
                {farmerDetails.default_pickup_address.address_line_1}, {farmerDetails.default_pickup_address.barangay}
              </Text>
              <Text style={styles.addressField}>
                {farmerDetails.default_pickup_address.city}, {farmerDetails.default_pickup_address.zip_code}
              </Text>
              <Text style={styles.addressField}>Phone: {farmerDetails.default_pickup_address.phone_number}</Text>
            </>
          ) : (
            <Text style={styles.addressField}>No default pickup address provided.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8D6C5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4C2D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E4C2D',
    padding: 15,
  },
  shopName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  photoContainer: {
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  storePhoto: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  secondContainer: {
    padding: 15,
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    elevation: 15,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  approved: {
    color: '#4CAF50',
  },
  pending: {
    color: '#F57C00',
  },
  addressContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    elevation: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  addressField: {
    fontSize: 14,
    marginBottom: 5,
  },
  featureButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  featureButton: {
    alignItems: 'center',
    backgroundColor: '#2E4C2D',
    padding: 10,
    borderRadius: 10,
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  featureButtonText: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ShopDashboardScreen;
