import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  FlatList, 
  Alert 
} from 'react-native';
import { collection, query, where, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { AuthContext } from '../providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';

import basketIcon from '../images/cart.png';

const CartScreen = ({ navigation }) => {
  const { userAuthData } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userId = userAuthData.uid;
    const cartItemsRef = collection(doc(db, "users", userId), "cart_items");

    const unsubscribe = onSnapshot(query(cartItemsRef), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCartItems(items);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteItem = (itemId) => {
    // Show confirmation alert
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to remove this item from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteItemFromCart(itemId),
        },
      ]
    );
  };

  const deleteItemFromCart = async (itemId) => {
    const userId = userAuthData.uid;
    const cartItemRef = doc(db, "users", userId, "cart_items", itemId);
    
    try {
      await deleteDoc(cartItemRef);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      {item.product_image ? (
        <Image source={{ uri: item.product_image }} style={styles.productImage} resizeMode="contain" />
      ) : (
        <Ionicons name="image-outline" size={80} color="#ccc" style={styles.productImage} />
      )}
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>Product: {item.name}</Text>
        <Text style={styles.productPrice}>Price: ₱ {item.price}</Text>
        <Text style={styles.productQuantity}>x{item.quantity}</Text>
        <Text style={styles.productSubtotal}>Subtotal: ₱ {item.subtotal}</Text>  
      </View>
      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color="#D32F2F" />
      </TouchableOpacity>
    </View>
  );

  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Image source={basketIcon} style={styles.basketIcon} />
      <Text style={styles.outOfStockText}>Out of stock?</Text>
      <Text style={styles.subText}>You haven't added anything to your cart!</Text>
      <TouchableOpacity 
        style={styles.browseButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.browseButtonText}>Browse</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
      </View>

      {/* Render FlatList or Empty State */}
      <View style={styles.secondContainer}>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    fontSize: 20,
    color: '#000',
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  secondContainer: {
    paddingHorizontal: 15,
  },
  cartItem: {
    flexDirection: "row",
    marginTop: 20,  // Added margin for spacing
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#E8F5E9",  // Greenish background for cart items
    shadowColor: '#000',  // Shadow for a subtle elevation effect
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#388E3C',  // Darker green for better contrast
  },
  productPrice: {
    fontSize: 14,
    color: "#4caf50",
  },
  productQuantity: {
    fontSize: 14,
    color: "#333",  // Adjusted for contrast
  },
  productSubtotal: {
    fontSize: 16,
    color: "#FF5722", 
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  basketIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  outOfStockText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: '#1C3814',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 10,
    alignSelf: 'center', // Centered vertically with item
  },
});

export default CartScreen;
