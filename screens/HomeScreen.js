import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons for navigation

export default function HomeScreen() {
  const products = [
    { id: '1', name: 'Product Name', price: '₱ 0.00', sold: '# sold/s' },
    { id: '2', name: 'Product Name', price: '₱ 0.00', sold: '# sold/s' },
    { id: '3', name: 'Product Name', price: '₱ 0.00', sold: '# sold/s' },
    { id: '4', name: 'Product Name', price: '₱ 0.00', sold: '# sold/s' },
    // Add more products if needed
  ];

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
          <Ionicons name="search-outline" size={24} color="#fff" />
          <Ionicons name="person-outline" size={24} color="#fff" />
        </View>
      </View>

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
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={30} color="#000" />
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
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    paddingVertical: 5,
  },
  categoryText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '400', // Normal font for non-selected categories
  },
  selectedCategoryContainer: {
    backgroundColor: '#1C3814', // Dark green background for "for you"
    borderRadius: 20, // Rounded edges for the selected category
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold', // Bold font for the selected category
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
    width: '42%',
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
  },
  navButton: {
    alignItems: 'center',
  },
});
