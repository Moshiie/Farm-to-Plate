import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';

const OrderCartScreen = ({ navigation }) => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    { id: '1', farm: 'Farm 1', productName: 'Product Name', price: 200, quantity: 1 },
    { id: '2', farm: 'Farm 2', productName: 'Product Name', price: 250, quantity: 1 },
    { id: '3', farm: 'Farm 3', productName: 'Product Name', price: 300, quantity: 1 },
  ]);

  // Handle quantity change
  const handleQuantityChange = (id, action) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: action === 'increase' ? item.quantity + 1 : item.quantity - 1,
          };
        }
        return item;
      })
    );
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cart</Text>
        <TouchableOpacity onPress={() => {}} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Cart List */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.cartItemLeft}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your product image URL or local image
                style={styles.cartItemImage}
              />
              <View style={styles.cartItemDetails}>
                <Text style={styles.farmName}>{item.farm}</Text>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productPrice}>₱{item.price}</Text>
              </View>
            </View>

            {/* Quantity Controls */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'decrease')} style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'increase')} style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Checkbox */}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Voucher Input and Total */}
      <View style={styles.voucherContainer}>
        <TextInput
          style={styles.voucherInput}
          placeholder="Select or enter voucher code"
          placeholderTextColor="#888"
        />
        <Text style={styles.total}>Total: ₱{totalPrice}</Text>
      </View>

      {/* Check Out Button */}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Checkout')} // Navigate to Checkout screen
      >
        <Text style={styles.buttonText}>Check Out ({cartItems.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 10,
  },
  editButtonText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    alignItems: 'center',
  },
  cartItemLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  cartItemDetails: {
    justifyContent: 'center',
  },
  farmName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    color: '#333',
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  voucherContainer: {
    marginTop: 20,
  },
  voucherInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderCartScreen;
  