import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth / 2) - 20; // Adjust for margin/padding

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: '1', name: 'Tomato', price: '₱ 20.00', sold: '10 sold' },
    { id: '2', name: 'Cucumber', price: '₱ 15.00', sold: '5 sold' },
    { id: '3', name: 'Lettuce', price: '₱ 25.00', sold: '8 sold' },
    { id: '4', name: 'Carrot', price: '₱ 18.00', sold: '12 sold' },
    { id: '5', name: 'Potato', price: '₱ 10.00', sold: '20 sold' },
    { id: '6', name: 'Onion', price: '₱ 30.00', sold: '7 sold' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.imagePlaceholder}>
        <Ionicons name="image-outline" size={50} color="#000" />
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productSold}>{item.sold}</Text>
      <TouchableOpacity style={styles.moreOptions}>
        <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.logoText}>Farm To Plate</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </View>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for products..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <TouchableOpacity>
          <Text style={styles.categoryText}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectedCategoryContainer}>
          <Text style={[styles.categoryText, styles.selectedCategoryText]}>for you</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.categoryText}>categories</Text>
        </TouchableOpacity>
      </View>

      {/* Product list */}
      <Text style={styles.recommendedTitle}>Recommended Products</Text>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />

      {/* Bottom navigation buttons */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chatbubble-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7A9F59',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#7A9F59',
  },
  logoText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
  },
  searchBar: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
    backgroundColor: '#fff',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    paddingVertical: 5,
  },
  categoryText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '400', 
  },
  selectedCategoryContainer: {
    backgroundColor: '#1C3814',
    borderRadius: 20, 
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold', 
  },
  recommendedTitle: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 20,
    marginVertical: 10,
  },
  productList: {
    justifyContent: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    width: cardWidth,
  },
  imagePlaceholder: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#888',
  },
  productSold: {
    color: '#888',
  },
  moreOptions: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    alignItems: 'center',
  },
});
