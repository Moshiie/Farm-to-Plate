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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth / 2) - 30;

export default function HomeScreen() {
  const navigation = useNavigation();
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
        <Ionicons name="image-outline" size={50} color="#555" />
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productSold}>{item.sold}</Text>
      <TouchableOpacity style={styles.moreOptions}>
        <Ionicons name="ellipsis-horizontal" size={20} color="#777" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#7A9F59', '#fff']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <Text style={styles.logoText}>Farm To Plate</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="person-outline" size={24} color="#fff" />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flexOne}
        >
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.productList}
            ListHeaderComponent={
              <>
                <View style={styles.searchBarContainer}>
                  <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchBar}
                    placeholder="Search for products..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>

                <View style={styles.categoriesContainer}>
                  <TouchableOpacity>
                    <Text style={styles.categoryText}>Sell</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.selectedCategoryContainer}>
                    <Text style={[styles.categoryText, styles.selectedCategoryText]}>For you</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.categoryText}>Categories</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.recommendedTitle}>Recommended Products</Text>
              </>
            }
          />
        </KeyboardAvoidingView>

        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="home-outline" size={28} color="#7A9F59" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Chat')}
          >
            <Ionicons name="chatbubble-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#7A9F59',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 45,
    color: '#333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  selectedCategoryContainer: {
    backgroundColor: '#1C3814',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  recommendedTitle: {
    fontSize: 18,
    color: '#333',
    marginLeft: 20,
    marginVertical: 10,
  },
  productList: {
    justifyContent: 'center',
    paddingBottom: 90,
  },
  productCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    padding: 15,
    width: cardWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
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
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  productSold: {
    fontSize: 12,
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
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navButton: {
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
});

