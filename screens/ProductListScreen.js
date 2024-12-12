import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductListScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section with Background Image */}
      <ImageBackground
        source={require('../images/veg.jpg')} // Replace with the actual background URL
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Product"
            placeholderTextColor="#888"
          />
        </View>

        {/* Shop Header */}
        <View style={styles.shopHeader}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // Replace with the actual logo URL
            style={styles.shopLogo}
          />
          <View style={styles.shopInfo}>
            <TouchableOpacity onPress={() => navigation.navigate('ShopDash')}>
              <Text style={styles.shopName}>Shop Name</Text>
            </TouchableOpacity>
            <Text style={styles.shopRating}>⭐ 4.9</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.tabTextActive}>All Products</Text>
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
      </View>

      {/* Product Count */}
      <View style={styles.productCountContainer}>
        <Text style={styles.productCountText}>100 Products</Text>
      </View>

      {/* Product Grid */}
      <View style={styles.productGrid}>
        {[...Array(4)].map((_, index) => (
          <View style={styles.productCard} key={index}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.productImage} />
            <Text style={styles.productName}>Product Name</Text>
            <Text style={styles.productInfo}>5 pieces left</Text>
            <Text style={styles.productPrice}>₱0.00</Text>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#2E4C2D" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
  backgroundImage: {
    width: '100%',
    height: 200, // Adjust height for a better visual
    justifyContent: 'flex-start', // Align content at the top of the image
    alignItems: 'center', // Center content horizontally
    paddingTop: 40, // Padding to prevent content from touching the top
    paddingBottom: 20, // Padding for spacing
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly transparent background for search bar
    borderRadius: 25, // Rounded corners
    width: '90%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10, // Space between icon and text input
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  shopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 10, // Reduced to avoid overlap
  },
  shopLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  shopInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  shopRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  tabContainer: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2E4C2D',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#2E4C2D',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productCountContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  productCountText: {
    fontSize: 12,
    color: '#333',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#EAF4E7',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productInfo: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4C2D',
    marginBottom: 10,
  },
  moreButton: {
    alignSelf: 'flex-end',
  },
});

export default ProductListScreen;
