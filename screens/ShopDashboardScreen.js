import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { doc, collection, getDocs, query, where } from 'firebase/firestore';
import { AuthContext } from '../providers/AuthProvider';

const ShopDashboardScreen = ({ navigation }) => {
  const [farmerDetails, setFarmerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userAuthData } = useContext(AuthContext); 

  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        setLoading(true);
        const userId = userAuthData?.uid;
        if (userId) {
          const farmerRef = collection(db, 'users', userId, 'farmer_details');
          const farmerQuery = query(farmerRef, where('farmer_id', '==', userId))
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

    fetchFarmerDetails(); 
  }, [userAuthData]);  // Fetch only when the userAuthData changes

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.shopName}>{farmerDetails?.store_name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateShopProfile')}>
            <MaterialIcons name="account-circle" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
      {/* Background Image with "Add Product" Button */}
      <ImageBackground
        source={require('../images/veg.jpg')} // Replace with your image URL
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddProduct')}>
          <Text style={styles.addButtonText}>+ Add product</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Feature Buttons */}
      <View style={styles.featureButtonsContainer}>
        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('ProductList')}>
          <MaterialIcons name="inventory" size={24} color="#2E4C2D" />
          <Text style={styles.featureButtonText}>Products</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('OrderList')} >
          <MaterialIcons name="local-shipping" size={24} color="#2E4C2D" />
          <Text style={styles.featureButtonText}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Addresses')}>
          <MaterialIcons name="location-on" size={24} color="#2E4C2D" />
          <Text style={styles.featureButtonText}>Addresses</Text>
        </TouchableOpacity>
      </View>

      {/* Sales and Earnings Cards */}
      <View style={styles.infoCardsContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Sales</Text>
          <Text style={styles.infoValue}>₱0</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Earnings</Text>
          <Text style={styles.infoValue}>₱0</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F4F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2E4C2D',
  },
  shopName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backgroundImage: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#2E4C2D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featureButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  featureButton: {
    alignItems: 'center',
  },
  featureButtonText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4C2D',
  },
  infoCardsContainer: {
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: '#F4F4F0',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4C2D',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ShopDashboardScreen;
