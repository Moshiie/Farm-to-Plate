import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../firebaseConfig'; // Import Firestore from your config file
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../providers/AuthProvider'; // Assumed import for user context (add this if you manage auth)

const BuyerShopDashboardScreen = ({ navigation, route }) => {
  const [farmerProducts, setFarmerProducts] = useState([]);
  const [storeInfo, setStoreInfo] = useState(route.params?.farmerDetails);
  const [loading, setLoading] = useState(true);
  const { userAuthData } = useContext(AuthContext); // Get user info from the AuthContext

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const farmerId = storeInfo?.farmer_id;
        if (!farmerId) return;

        const productsRef = collection(db, 'products');
        const productsQuery = query(
          productsRef,
          where('farmer_id', '==', farmerId)
        );
        const productsSnapshot = await getDocs(productsQuery);

        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFarmerProducts(productsList);

      } catch (error) {
        console.error('Error fetching data:', error);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeInfo]);

  const handleCreateChatRoom = async () => {
    const buyerId = userAuthData?.uid; // Assume userAuthData contains the logged-in user's UID
    const farmerId = storeInfo?.farmer_id;

    if (!buyerId || !farmerId) return;

    const chatRef = collection(db, 'chat_rooms');
    const chatQuery = query(
      chatRef, 
      where('buyer_id', '==', buyerId),
      where('farmer_id', '==', farmerId)
    );

    const chatSnapshot = await getDocs(chatQuery);
    
    if (chatSnapshot.empty) {
      // If no chat room exists, create one
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        buyer_id: buyerId,
        farmer_id: farmerId,
        createdAt: new Date(),
        status: 'active',
      });

      // Navigate to the newly created chat room
      navigation.navigate('ChatRoom', { chatId: newChatRef.id, name: storeInfo.store_name });
    } else {
      // If chat room exists, navigate to the existing chat
      const existingChat = chatSnapshot.docs[0].data();
      navigation.navigate('ChatRoom', { chatId: chatSnapshot.docs[0].id, name: storeInfo.store_name });
    }
  };

  const renderProduct = (item) => (
    <View style={styles.productCard} key={item.id}>
      <View style={styles.imagePlaceholder}>
        <MaterialIcons name="image" size={50} color="#555" />
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₱ {item.price}</Text>
      <Text style={styles.productSold}>Stock: {item.stock}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {storeInfo && (
        <View style={styles.header}>
          <Text style={styles.shopName}>{storeInfo.store_name}</Text>
          <TouchableOpacity
            onPress={handleCreateChatRoom}
            style={styles.chatIconContainer}
          >
            <MaterialIcons name="chat" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}
      <ImageBackground
        source={require('../images/veg.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      </ImageBackground>

      {/* Products Display */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E4C2D" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : (
        <View style={styles.productListContainer}>
          {farmerProducts.length > 0 ? (
            farmerProducts.map(renderProduct)
          ) : (
            <Text style={styles.noProductsText}>No products available.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F4F0',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#2E4C2D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  
  },
  shopName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    flexShrink: 1
  },
  chatIconContainer: {
    padding: 5, 
  },
  backgroundImage: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productListContainer: {
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  imagePlaceholder: {
    height: 100,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  productSold: {
    fontSize: 12,
    color: '#888',
  },
  noProductsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
});

export default BuyerShopDashboardScreen;
