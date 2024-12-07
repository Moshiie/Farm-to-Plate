import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';

// Import the local image
import basketIcon from '../images/cart.png'; // Adjust the path based on your project structure

const CartScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Image source={basketIcon} style={styles.basketIcon} />
        <Text style={styles.outOfStockText}>Out of stock?</Text>
        <Text style={styles.subText}>You haven’t added anything to your cart!</Text>

        {/* Browse Button */}
        <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.browseButtonText}>Browse</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    padding: 20,
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
  content: {
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
});

export default CartScreen;