import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 20;

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([
    { id: '1', name: 'Tomato', price: '₱ 20.00', sold: '10 sold', isFavourite: false },
    { id: '2', name: 'Cucumber', price: '₱ 15.00', sold: '5 sold', isFavourite: false },
    { id: '3', name: 'Lettuce', price: '₱ 25.00', sold: '8 sold', isFavourite: false },
  ]);

  const shops = [
    { id: '1', name: 'Fresh Farm', location: 'Rosario St.' },
    { id: '2', name: 'Veggie Delight', location: 'Corrales Ave.' },
    { id: '3', name: 'Fruit Basket', location: 'Carmen Market' },
    { id: '4', name: 'Green Shop', location: 'Limketkai Center' },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavourite = (product) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === product.id ? { ...item, isFavourite: !item.isFavourite } : item
      )
    );
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <TouchableOpacity
        style={styles.favouriteIcon}
        onPress={() => toggleFavourite(item)}
      >
        <Ionicons
          name={item.isFavourite ? 'heart' : 'heart-outline'}
          size={24}
          color={item.isFavourite ? '#E63946' : 'black'}
        />
      </TouchableOpacity>
      <View style={styles.imagePlaceholder}>
        <Ionicons name="image-outline" size={50} color="#555" />
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productSold}>{item.sold}</Text>
    </View>
  );

  const renderShop = ({ item }) => (
    <View style={styles.shopCard}>
      <Ionicons name="storefront-outline" size={40} color="#555" style={styles.shopIcon} />
      <View style={styles.shopDetails}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.shopLocation}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#7A9F59" />
      <LinearGradient colors={['#7A9F59', '#fff']} style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="#fff" />
            <View>
              <Text style={styles.locationText}>Rosario Cres</Text>
              <Text style={styles.locationSubText}>Cagayan de Oro Misamis Oriental</Text>
            </View>
          </View>
          <View style={styles.topIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
              <Ionicons name="heart-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="cart-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search for products or shops..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Content Scrollable View */}
        <View contentContainerStyle={styles.contentContainer}>
          {/* Recommended Products */}
          <Text style={styles.sectionTitle}>Recommended Products</Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.productList}
          />

          {/* Recommended Shops */}
          <Text style={styles.sectionTitle}>Recommended Shops</Text>
          <FlatList
            data={shops}
            renderItem={renderShop}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.shopList}
          />
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home" size={28} color="#7A9F59" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-outline" size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#7A9F59',
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30,
    paddingBottom: 10,
    backgroundColor: '#7A9F59',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  locationSubText: {
    color: '#ddd',
    fontSize: 12,
    marginLeft: 5,
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
  },
  productList: {
    paddingHorizontal: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    width: cardWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  favouriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  productSold: {
    fontSize: 10,
    color: '#888',
  },
  shopList: {
    paddingHorizontal: 15,
  },
  shopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: 250,
  },
  shopIcon: {
    marginRight: 15,
  },
  shopDetails: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  shopLocation: {
    fontSize: 14,
    color: '#888',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    width: '100%',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
  },
});
