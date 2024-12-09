import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductListScreen = ({ navigation }) => { // Access navigation prop
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('AddProdt')} // Navigate to 'AddProdt' screen
      >
        <Ionicons name="arrow-back" size={30} color="#2E4C2D" />
      </TouchableOpacity>

      {/* Logo and Shop Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
        <View style={styles.shopInfo}>
            <TouchableOpacity onPress={() => navigation.navigate('ShopDash')}>
            <Text style={styles.shopName}>Shop Name</Text>
            </TouchableOpacity>
            <Text style={styles.shopRating}>⭐ 4.8</Text>
        </View>
      </View>

      {/* Search Bar */}
      <TextInput style={styles.searchInput} placeholder="Search Product" />

      {/* Category Tabs - Horizontal ScrollView */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>All Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Category 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Category 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Category 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Sold Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Product Cards */}
      <View style={styles.productGrid}>
        {[...Array(4)].map((_, index) => (
          <View style={styles.productCard} key={index}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.productImage} />
            <Text style={styles.productName}>Product Name</Text>
            <Text style={styles.productInfo}>5 pieces left</Text>
            <Text style={styles.productPrice}>₱100.00</Text>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#2E4C2D" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 30,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 15,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  shopInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  shopRating: {
    fontSize: 16,
    color: '#FFD700',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  tabContainer: {
    marginBottom: 20,
    marginLeft: 10,
  },
  tabButton: {
    paddingHorizontal: 10,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4C2D',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productInfo: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4C2D',
    marginBottom: 10,
  },
  moreButton: {
    backgroundColor: '#F0F8F5',
    borderRadius: 20,
    padding: 5,
  },
});

export default ProductListScreen;
